const express = require('express');
const authRoutes = require('./seller.auth.routes');
const usersRoutes = require('./seller.users.routes');
const productsRoute = require('./seller.products.routes');

const app = express();

const routesArray = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: usersRoutes,
  },
  {
    path: '/products',
    route: productsRoute,
  },
];

routesArray.forEach((obj) => {
  app.use(obj.path, obj.route);
});

module.exports = app;
