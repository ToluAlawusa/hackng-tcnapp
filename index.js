var app = require('./server/server.js'),
	db  = require('./biodata/tcndb.js'),
	PORT = 5000;


// this starts the app
db.conn.sync().then(function() {
	app.listen(PORT, function(){
		console.log('Express Server Started on port '+ PORT +'!');

	});
});