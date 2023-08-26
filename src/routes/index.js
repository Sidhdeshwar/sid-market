const express = require('express');
const authRoutes = require('./seller/auth/seller.auth.routes');
const settingsRouter = require('./seller/setting/users.settings.routes')

const app = express();

const routesArray = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: settingsRouter,
  },
];

routesArray.forEach((obj) => {
  app.use(obj.path, obj.route);
});

module.exports = app;
