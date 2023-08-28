const express = require('express');
const controllerIndex = require('../controller');

const router = express.Router();

router.route('/login').post(controllerIndex.loginController);
router.route('/register').post(controllerIndex.registerController);
router.route('/self').post(controllerIndex.selfController);
// router.route('/change-password').post();
// router.route('/reset-password').post();
// router.route('/forgot-password').post();
// router.route('/send-verification-email').post();
// router.route('/verify-email').post();
// router.route('/self').get();

module.exports = router;
