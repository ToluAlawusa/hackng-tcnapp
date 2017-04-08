var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    userrouter = require('../biodata/tcnroutes.js');

// use of middlewares
// morgan for logging requests to the console
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// serving public files from here
app.use(express.static(__dirname + '/../public'));

// mount routes
app.use('/users', userrouter);


// express's automatic error handler middleware
app.use(function(err, req, res, next){

	res.status(501).json(err.message);

});


module.exports = app;
