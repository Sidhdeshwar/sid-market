const express = require('express');
const controllerIndex = require('../controller/index');

const router = express.Router();

router.route('/').get(controllerIndex.registerController);
module.exports = router;
