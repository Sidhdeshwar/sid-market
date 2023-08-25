const catchAsync = require('../../../utilities/catch.Error');

const loginFun = catchAsync(async (req, res, next) => {
  res.end('login');
});
module.exports = loginFun;
