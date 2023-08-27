const jwt = require('jsonwebtoken');
const catchAsync = require('../../../utilities/catch.Error');
const CreateError = require('../../../utilities/CreateError');
const authModels = require('../../../modules/seller/auth/register-module');

const secreateKey = process.env.SECREATE_KEY;

const selfMethod = catchAsync(async (req, res, next) => {

  const data = await authModels.registerModel.findById(req.USER_ID);
  if(!data)
  {
    return next(new CreateError(`User with USER_ID : ${req.USER_ID} Not Found.`,404));
  }
  return res.status(201).json({
    status: 'success',
    data,
  });
});

module.exports = selfMethod;
