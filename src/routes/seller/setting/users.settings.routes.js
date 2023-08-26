const express = require('express');
const controllerIndex = require('../../../controller/index');

const router = express.Router();

router.route('/org').patch(controllerIndex.usersController.updateCompany);

module.exports = router;
