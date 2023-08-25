// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const catchAsync = require('../../../utilities/catch.Error');
const authModels = require('../../../modules/seller/auth/register-module');

const secreteKey = 'secreateKey';

const registerFun = catchAsync(async (req, res, next) => {
  const org = { company: req.body.company, email: req.body.email };
  const orgDB = await authModels.orgModel.create(org);
  const userObj = { ...req.body, _org: orgDB };
  const user = await authModels.registerModel.create(userObj);
  //* Create JWT Token
  const { name, email } = req.body;
  jwt.sign({ name, email }, secreteKey, { expiresIn: '1000s' }, (err, token) => {
    if (err) {
      console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
      return next(err);
    }
    res.status(201).json({
      user, token,
    });
  });
});
module.exports = registerFun;
