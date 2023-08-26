const loginController = require('./seller/auth/login.controller');
const registerController = require('./seller/auth/register.controller');
const selfController = require('./seller/auth/self.controller');

module.exports = { loginController, registerController, selfController };
