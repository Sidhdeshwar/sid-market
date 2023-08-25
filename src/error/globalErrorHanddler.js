const colors = require('console-log-colors');
const CreateError = require('../utilities/CreateError');

const devError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
//
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new CreateError(message, err.statusCode);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err?.errmsg?.match(/(["'])(\\?.)*?\1/)[0] || 'Please use another value!????????????!.';
  console.log('handleDuplicateFieldsDB : ==>', err);
  const message = `Duplicate field value : ${value}. Please use another value!!!!!!!!!!!!!.`;
  return new CreateError(message, err.statusCode);
};

const handdleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalied input data. ${errors.join(',,, ')}`; // Combine multiple errors in = 1; & join
  return new CreateError(message, err.statusCode);
};
const globalError = (err, req, res, next) => {
  console.log(colors.bgRed('Global Error : '), err.stack);
  // eslint-disable-next-line no-param-reassign
  err.statusCode = err.statusCode || 500;
  // eslint-disable-next-line no-param-reassign
  err.status = err.status || 'Custom Error-1';

  if (process.env.NODE_ENV === 'developement') {
    let myError = { ...err };

    if (myError.name === 'CastError') {
      console.log(colors.bgRed('A'));
      myError = handleCastErrorDB(myError);
      devError(myError, res);
    } else if (myError.code === 11000) {
      console.log(colors.bgRed('B'));
      myError = handleDuplicateFieldsDB(myError);
      devError(myError, res);
    } else if (myError.name === 'validationError') {
      console.log(colors.bgRed('C'));
      myError = handdleValidationErrorDB(myError);
      devError(myError, res);
    } else {
      console.log(colors.redBright('Z'));
      res.status(myError.statusCode).json({
        status: err.status,
        message: myError,
        err,
      });
    }
  }
};

module.exports = globalError;
