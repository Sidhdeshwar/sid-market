const express = require('express');
const authRoutes = require('./seller.auth.routes');

const app = express();

const routesArray = [
  {
    path: '/auth',
    route: authRoutes,
  },
];

routesArray.forEach((obj) => {
  app.use(obj.path, obj.route);
});

module.exports = app;
