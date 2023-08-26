const jwt = require('jsonwebtoken');
const orgModel = require('../modules/seller/auth/register-module');

const secreateKey = process.env.SECREATE_KEY;

const sellerMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secreateKey, async (err, data) => {
    if (err) {
      return next(err);
    }
  });
  res.end('MMM');
};
module.exports = sellerMiddleware;
