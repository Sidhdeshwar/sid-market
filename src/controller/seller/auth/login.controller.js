const jwt = require('jsonwebtoken');
const catchAsync = require('../../../utilities/catch.Error');
const authModels = require('../../../modules/seller/auth/register-module');
const CreateError = require('../../../utilities/CreateError');

const secreateKey = process.env.SECREATE_KEY;

const loginFun = catchAsync(async (req, res, next) => {
  const findUser = await authModels.registerModel.findOne(req.body).select('-__v');
  if (!findUser) {
    return next(new CreateError('Incorrect Email or Password', 404));
  }
  jwt.sign(
    // eslint-disable-next-line no-underscore-dangle
    { id: findUser._id, email: findUser.email },
    secreateKey,
    { expiresIn: '1d' },
    (err, token) => {
      if (err) {
        return next(err);
      }
      let expiresIn;
      jwt.verify(token, secreateKey, (err2, Tdata) => {
        if (err) {
          return next(err2);
        }
        expiresIn = new Date(+Tdata.exp * 1000);
        return res.status(201).json({
          findUser,
          token,
          expiresIn,
        });
      });
      return res.status(201).json({
        findUser,
        token,
        expiresIn,
      });
    },
  );
});
module.exports = loginFun;
