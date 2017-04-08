var Sequelize = require('sequelize');

var sequelize = new Sequelize('undefined', 'undefined', 'undefined', {
  dialect: 'sqlite',

  // SQLite only
  storage: __dirname + '/database.sqlite'
});

var db = {};
db.tcnModel = sequelize.import('./tcnmodel.js');
db.conn = sequelize;

module.exports = db; 

	// sequelize
	//   .authenticate()
	//   .then(function(err) {
	//     console.log('Connection has been established successfully.');
	//   })
	//   .catch(function (err) {
	//     console.log('Unable to connect to the database:', err);
	//   });

// Or you can simply use a connection uri
// var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');