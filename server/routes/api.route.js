const express = require('express');
const roleRoute = require('./subRoutes/role.route');
const userRoute = require('./subRoutes/user.route');
const categoryRoute = require('./subRoutes/category.route');
const productRoute = require('./subRoutes/product.route');

let apiRoute = express.Router();

apiRoute.use('/role',roleRoute);
apiRoute.use('/user',userRoute);
apiRoute.use('/category',categoryRoute);
apiRoute.use('/product',productRoute);

module.exports = apiRoute;