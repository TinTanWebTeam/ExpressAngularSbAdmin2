const express = require('express');

let categoryRoute = express.Router();

categoryRoute.get('/',function (req,res) {
	res.end('ok');
});

module.exports = categoryRoute;