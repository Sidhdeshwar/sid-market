const express = require('express');
const controllerIndex = require('../controller/index');

const router = express.Router();

router.route('/login').post(controllerIndex.loginController);
router.route('/register').post(controllerIndex.registerController);
// router.route('/change-password').post();
// router.route('/reset-password').post();
// router.route('/forgot-password').post();
// router.route('/send-verification-email').post();
// router.route('/verify-email').post();
// router.route('/self').get();

module.exports = router;
