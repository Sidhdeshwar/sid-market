const catchAsync = require('../utilities/catch.Error');
const CreateError = require('../utilities/CreateError');
const authModels = require('../modules/register-module');
const settingService = require('../services/users');
const UsersPaginationClass = require('../utilities/Users.Pagination.Class');

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
  // const users = await settingService.getAllUsersDB();
  const usersPagination = new UsersPaginationClass(
    authModels.registerModel,
    req.query
  )
    .filter()
    .sort()
    .fields()
    .exactMatch();
  // eslint-disable-next-line prefer-destructuring
  const page = +req.query.page; //* Both are Same
  let { limit } = req.query; //* Both are Same
  limit = +limit;

  const kitiSkip = (page - 1) * limit;
  const usersWithQuery = await usersPagination.allUsers
    .skip(kitiSkip)
    .limit(limit);

  const totalPages = 1;
  const totalResults = await usersPagination.allUsers.length;
  const results = usersWithQuery;

  res.status(201).json({
    status: 'success',
    results,
    page,
    limit,
    totalPages,
    totalResults,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const update = await settingService.updateUserDB(req);
  res.status(201).json({
    status: 'success',
    update,
  });
});

const updateUsersRole = catchAsync(async (req, res, next) => {
  const updateRole = await settingService.updateUsersRoleDB(req);

  res.status(201).json({
    status: 'success',
    updateRole,
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const deleted = await settingService.deleteUserDB(req);

  res.status(201).json({
    status: 'success',
    deleted,
  });
});

module.exports = {
  updateCompany,
  addUser,
  getAllUsers,
  updateUser,
  updateUsersRole,
  deleteUser,
};
