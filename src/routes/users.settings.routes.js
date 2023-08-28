const express = require('express');
const controllerIndex = require('../controller');

const router = express.Router();

router.route('/').post(controllerIndex.usersController.addUser).get(controllerIndex.usersController.getAllUsers);
router.route('/:_id').patch(controllerIndex.usersController.updateUser).delete(controllerIndex.usersController.deleteUser);
router.route('/role/:_id').patch(controllerIndex.usersController.updateUsersRole);
router.route('/org').patch(controllerIndex.usersController.updateCompany);

module.exports = router;
