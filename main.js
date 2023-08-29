const express = require('express');
const routes = require('./src/routes/index');
const createError = require('./src/utilities/CreateError');
const globalErrorHanddler = require('./src/error/globalErrorHanddler');

const app = express();
app.use(express.json());
// app.use('../images/product', express.static('images'));
app.use('/', routes);
app.all('*', (req, res, next) => {
  // eslint-disable-next-line new-cap
  next(new createError(`Custome URL:=> ${req.originalUrl} is not Found.`, 400));
});

app.use(globalErrorHanddler);

module.exports = app;
