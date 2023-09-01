// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const catchAsync = require('../utilities/catch.Error');
const authModels = require('../modules/auth.modal');
const CreateError = require('../utilities/CreateError');

const secreteKey = process.env.SECREATE_KEY;

const registerFun = catchAsync(async (req, res, next) => {
  const org = { company: req.body.company, email: req.body.email };
  const orgDB = await authModels.orgModel.create(org);
  const userObj = { ...req.body, _org: orgDB };
  const user = await authModels.registerModel.create(userObj);
  //* Create JWT Token
  const { name, email } = req.body;
  jwt.sign(
    { name, email },
    secreteKey,
    { expiresIn: '1000s' },
    (err, token) => {
      if (err) {
        return next(err);
      }
      return res.status(201).json({
        user,
        token,
      });
    }
  );
});

const loginFun = catchAsync(async (req, res, next) => {
  const findUser = await authModels.registerModel
    .findOne(req.body)
    .select('-__v');
  if (!findUser) {
    return next(new CreateError('Incorrect Email or Password', 404));
  }
  jwt.sign(
    // eslint-disable-next-line no-underscore-dangle
    { id: findUser._id, email: findUser.email },
    secreteKey,
    { expiresIn: '5d' },
    (err, token) => {
      if (err) {
        return next(err);
      }
      let expiresIn;
      jwt.verify(token, secreteKey, (err2, Tdata) => {
        if (err2) {
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
    }
  );
  return true;
});

const selfFun = catchAsync(async (req, res, next) => {
  const data = req.USER_DATA;
  if (!data) {
    return next(
      // eslint-disable-next-line no-underscore-dangle
      new CreateError(`User with USER_ID : ${req.USER_DATA._id} Not Found.`, 404),
    );
  }
  return res.status(201).json({
    status: 'success',
    data,
  });
});
module.exports = { registerFun, loginFun, selfFun };
