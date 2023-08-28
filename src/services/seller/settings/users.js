const authModels = require('../../../modules/seller/auth/register-module');

const getAllUsersDB = async () => {
  const allUsers = await authModels.registerModel.find(); //not works async / await
  return allUsers;
};

const addUserDB = async (req) => {
  const getOwner = await authModels.registerModel.findById(req.USER_ID);
  // eslint-disable-next-line no-underscore-dangle
  const getOrg = await authModels.orgModel.findById(getOwner._org._id);
  const user = { ...req.body, _org: getOrg };
  const addUser = await authModels.registerModel.create(user);
  return addUser;
};

module.exports = { getAllUsersDB, addUserDB };
