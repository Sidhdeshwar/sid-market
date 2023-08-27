const jwt = require('jsonwebtoken');
const catchAsync = require('../../../../utilities/catch.Error');
const CreateError = require('../../../../utilities/CreateError');
const authModels = require('../../../../modules/seller/auth/register-module');
const settingModel = require('../../../../modules/seller/settings/users-module');

const secreateKey = process.env.SECREATE_KEY;

const updateCompany = catchAsync(async (req, res, next) => {

  const data = await authModels.registerModel.findById(req.USER_ID);
  if(!data)
  {
    return next(new CreateError(`User with USER_ID : ${req.USER_ID} Not Found.`,404));
  }
  const company_id = data._org._id;
  const updateCompany =await authModels.orgModel.findByIdAndUpdate(company_id, req.body);
  return res.status(201).json({
    status: 'success',
    updateCompany
  });
});

const addUser = catchAsync( async (req,res,next)=>{
  console.log(req.USER_ID);
  const getOwner = await authModels.registerModel.findById(req.USER_ID);
  const getOrg = await authModels.orgModel.findById(getOwner._org._id);
  const user = {...req.body, _org: getOrg}
  const addUser = await authModels.registerModel.create(user);
  console.log(req.body);

  return res.status(201).json({
    status: 'success',
    addUser
  });
})

module.exports = {updateCompany, addUser};