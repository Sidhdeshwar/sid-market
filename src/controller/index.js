const loginController = require('./seller/auth/login.controller');
const registerController = require('./seller/auth/register.controller');
const selfController = require('./seller/auth/self.controller');
const usersController = require('./seller/settings/users/users.org.controllers');

module.exports = { loginController, registerController, selfController, usersController };
