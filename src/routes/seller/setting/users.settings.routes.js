const express = require('express');
const controllerIndex = require('../../../controller/index');

const router = express.Router();

router.route('/').post(controllerIndex.usersController.addUser)
router.route('/org').patch(controllerIndex.usersController.updateCompany);

module.exports = router;
