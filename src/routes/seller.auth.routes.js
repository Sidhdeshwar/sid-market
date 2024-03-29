const express = require('express');
const controllerIndex = require('../controller');
const authMiddleware = require('../middlewares/seller');

const router = express.Router();

router.route('/login').post(controllerIndex.authController.loginFun);
router.route('/register').post(controllerIndex.authController.registerFun);
router.use(authMiddleware);
router.route('/self').post(controllerIndex.authController.selfFun);
// router.route('/change-password').post();
// router.route('/reset-password').post();
// router.route('/forgot-password').post();
// router.route('/send-verification-email').post();
// router.route('/verify-email').post();
// router.route('/self').get();

module.exports = router;
