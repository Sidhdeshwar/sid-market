/* eslint-disable no-underscore-dangle */
const authModels = require('../modules/auth.modal');

const getAllUsersDB = async () => {
  const allUsers = await authModels.registerModel.find(); //* not works async await
  return allUsers;
};

const addUserDB = async (req) => {
  const getOwner = await authModels.registerModel.findById(req.USER_DATA._id);
  // eslint-disable-next-line no-underscore-dangle
  const getOrg = await authModels.orgModel.findById(getOwner._org._id);
  const user = { ...req.body, _org: getOrg };
  const addUser = await authModels.registerModel.create(user);
  return addUser;
};

const updateUserDB = (req) => {
  const updateUser = authModels.registerModel.findByIdAndUpdate(
    req.params._id,
    req.body
  );
  return updateUser;
};

const updateUsersRoleDB = (req) => {
  const updateRoleUser = authModels.registerModel.findByIdAndUpdate(
    req.params._id,
    { role: req.body.role }
  );
  return updateRoleUser;
};

const deleteUserDB = (req) => {
  const deleteUser = authModels.registerModel.findByIdAndUpdate(
    req.params._id,
    { deleted: true }
  );
  return deleteUser;
};

module.exports = {
  getAllUsersDB,
  addUserDB,
  updateUserDB,
  updateUsersRoleDB,
  deleteUserDB,
};
