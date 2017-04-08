var express = require("express"),
	chai = require('chai'),
	tcnmodel = require('./tcnmodel.js'),
	dbconn = require('./tcndb.js'),
	assert = chai.assert;

	var route = express.Router();

	route.param('id', function(req, res, next, id) {
		dbconn.tcnModel.findById(id).then(function(user) {
			req.user = user;
			next();
		}, function(err) {
			res.status(500).send({msg: "invalid user"})
		})
	});

	route.route('/')
	.get(function(req, res, next) {
		dbconn.tcnModel.findAll({}).then(function(user){
			res.status(200).send(user);

		}).catch(function(err){
			console.log(err.message);
		})

	})

	.post(function(req, res, next) {
		dbconn.tcnModel.create(req.body).then(function(user){
			res.status(200).send(user);

		}).catch(function(err){
			console.log(err.message);
		})

	})

	

// Routes that take id as a parameter

route.route('/:id')
	.get(function(req, res, next) {
		dbconn.tcnModel.findOne({where: {id: req.params.id
  		}}, req.body).then(function(user){
			res.status(200).send(user);

		}).catch(function(err){
			console.log(err.message);
		})

	})

	.put(function(req, res, next) {
		dbconn.tcnModel.update(req.body, {where: {id: req.params.id
  		}}).then(function(user){
			res.status(200).send(req.user);

		}).catch(function(err){
			console.log(err.message);
		})

	})

	.delete(function(req, res, next) {
		dbconn.tcnModel.destroy({where: {id: req.params.id
  		}}, req.body).then(function(user){
			res.status(200).json(req.user);

		}).catch(function(err){
			console.log(err.message);
		})

	})



/*route.get('/', function(req, res, next){
	res.status(200).json({msg: "it worked"});
})*/


module.exports = route;

