const mongoose = require('mongoose');
const databaseConfig = require('../configs/database.config');

let options = {
	user: databaseConfig.user,
	pass: databaseConfig.pass,
	auth: {
		authdb: 'express_angular'
	}
};

mongoose.connect('mongodb://localhost:27017/' + databaseConfig.database, options);

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', function() {
	console.log('mongoose connected');
});

mongoose.connection.on('errors', function(errors) {
	console.log('mongoose connect error with : ' + errors);
});

mongoose.connection.on('disconnected', function() {
	console.log('mongoose disconnected');
});

process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});