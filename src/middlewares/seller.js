const jwt = require('jsonwebtoken');
const catchAsync = require('../utilities/catch.Error');
const authModel = require('../modules/auth.modal');

const secreateKey = process.env.SECREATE_KEY;

const getUserData = async (id) => {
  const user = await authModel.registerModel.findById(id);
  return user;
};

const getCompanyData = async (id) => {
  const company = await authModel.orgModel.findById(id);
  return company;
};

const sellerMiddleware = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secreateKey, async (err, tokenData) => {
    if (err) {
      return next(err);
    }
    const userData = await getUserData(tokenData.id);
    // eslint-disable-next-line no-underscore-dangle
    const companyData = await getCompanyData(userData._org._id);
    req.USER_DATA = userData;
    req.COMPANY_DATA = companyData;
    return next();
  });
});
module.exports = sellerMiddleware;
