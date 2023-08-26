const jwt = require('jsonwebtoken');
const catchAsync = require('../../../utilities/catch.Error');
// const CreateError = require('../../../utilities/CreateError');
const authModels = require('../../../modules/seller/auth/register-module');

const secreateKey = process.env.SECREATE_KEY;

const selfMethod = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secreateKey, async (err, tokenData) => {
    if (err) {
      return next(err);
    }
    const data = await authModels.registerModel.findById(tokenData.id);
    return res.status(201).json({
      status: 'success',
      data,
    });
  });
});

module.exports = selfMethod;
