const jwt = require('jsonwebtoken');
const authModels = require('../modules/seller/auth/register-module');
const catchAsync = require('../utilities/catch.Error');

const secreateKey = process.env.SECREATE_KEY;

const sellerMiddleware = catchAsync(async (req, res, next) => {
  
  if(!req.headers.authorization)
  {
    return next();
  }
  const token = req.headers.authorization.split(' ')[1];
  console.log(token + "  :UUUUUUUUUU")
  jwt.verify(token, secreateKey, async (err, tokenData) => {
    if (err) {
      return next(err);
    }
    req.USER_ID = await tokenData.id
    console.log("OOOOOOOO", req.USER_ID)
      next();
  });
 
});
module.exports = sellerMiddleware;
