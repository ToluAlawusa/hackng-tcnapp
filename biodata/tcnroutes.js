var express = require("express"),
	chai = require('chai'),
	tcnmodel = require('./tcnmodel.js'),
	dbconn = require('./tcndb.js'),
	assert = chai.assert;

	var route = express.Router();

	route.route('/')
	// .get(function(req, res, next) {
	// 	db.find({}, function(err, todos) {
	// 		if(todos.length == 0) { return next(new Error("No tasks found")); }
	// 		if(err){ return next(err); }
	// 		res.status(200).json(todos);
			
	// 	});
	// })
	.post(function(req, res, next) {
		console.log(dbconn);
		dbconn.tcnModel.create(req.body).then(function(user){
			res.status(200).send(user);

		}).catch(function(err){
			console.log(err.message);
		})

	})
	.delete(function(req, res, next) {
		todomodel.remove({}, function(err, todos) {
			if(todos.length == 0) { return next(new Error("No tasks found")); }
			if(err){ return next(err); }
			res.status(200).json(todos);

		});
	})

// Routes that take id as a parameter

route.route('/:id')
	.get(function(req, res, next) {
		todomodel.findOne({_id: req.params.id}, function(err, todos){
			if(!todos) { return next(new Error("No task found by id")); }
			if(err){ return next(err); }
			res.status(200).json(todos);

		});
	})
	.put(function(req, res, next){
		todomodel.findOneAndUpdate({_id: req.params.id}, req.body, function(err, todos){
			if(!todos) { return next(new Error("couldnt update, id not found")); }
			if(err){ return next(err); }
			res.status(200).json(todos);
		});
	})
	.delete(function(req, res, next) {
		todomodel.findOneAndRemove({_id: req.params.id}, req.body, function(err, todos) {
			if(!todos) { return next(new Error("couldnt delete, id not found")); }
			if(err){ return next(err); }
			res.status(200).json(todos);
		});
	})



/*route.get('/', function(req, res, next){
	res.status(200).json({msg: "it worked"});
})*/


module.exports = route;

