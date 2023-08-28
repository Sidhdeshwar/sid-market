const catchAsync = require('../../../../utilities/catch.Error');
const CreateError = require('../../../../utilities/CreateError');
const authModels = require('../../../../modules/seller/auth/register-module');
const settingService = require('../../../../services/seller/settings/users');
const UsersPaginationClass = require('../../../../utilities/Users.Pagination.Class');

const updateCompany = catchAsync(async (req, res, next) => {
  const data = await authModels.registerModel.findById(req.USER_ID);
  if (!data) {
    return next(
      new CreateError(`User with USER_ID : ${req.USER_ID} Not Found.`, 404)
    );
  }
  // eslint-disable-next-line no-underscore-dangle
  const companyId = data._org._id;
  const updateCompanyInfoDB = await authModels.orgModel.findByIdAndUpdate(
    companyId,
    req.body
  );
  return res.status(201).json({
    status: 'success',
    updateCompanyInfoDB,
  });
});

const addUser = catchAsync(async (req, res, next) => {
  const addUserDB = await settingService.addUserDB(req);
  return res.status(201).json({
    status: 'success',
    addUserDB,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  // const users = settingService.getAllUsersDB();
  const usersPagination = new UsersPaginationClass(
    authModels.registerModel,
    req.query
  )
    .filter()
    .sort()
    .fields()
    .exactMatch();
  const { page } = req.query.page;
  const { limit } = req.query.limit;
  const kitiSkip = (page - 1) * limit;
  const usersWithQuery = await usersPagination.allUsers;
  // res.end('END');
  res.status(201).json({
    status: 'success',
    usersWithQuery,
  });
});

module.exports = { updateCompany, addUser, getAllUsers };
