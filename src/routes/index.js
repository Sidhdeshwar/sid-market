const express = require('express');
const authRoutes = require('./login.routes');
const registerRoutes = require('./register.routes');

const app = express();

const routesArray = [
  {
    path: '/login',
    route: authRoutes,
  },
  {
    path: '/register',
    route: registerRoutes,
  },
];

routesArray.forEach((val) => {
  app.use(val.path, val.route);
});

module.exports = app;
