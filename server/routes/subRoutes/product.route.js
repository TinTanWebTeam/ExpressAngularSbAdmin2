const express = require('express');

let productRoute = express.Router();

productRoute.get('/',function (req,res) {
	res.end('ok');
});

module.exports = productRoute;