const express = require('express');

const controllerIndex = require('../controller/index');

const router = express.Router();

router.route('/').get(controllerIndex.loginController);
module.exports = router;
