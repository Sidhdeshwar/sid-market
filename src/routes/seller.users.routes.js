const express = require('express');
const { usersController } = require('../controller');
const authMiddleware = require('../middlewares/seller');

const router = express.Router();
router.use(authMiddleware);

router
  .route('/')
  .post(usersController.addUser)
  .get(usersController.getAllUsers);
router.route('/org').patch(usersController.updateCompany);
router
  .route('/:_id')
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);
router.route('/role/:_id').patch(usersController.updateUsersRole);

module.exports = router;
