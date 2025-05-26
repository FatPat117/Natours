const express = require('express');
const userController = require('../controllers/userControllers');
const AuthController = require('../controllers/authController');

const router = express.Router();

const {
  signUp,
  login,
  protect,
  forgotPassword,
  resetPassword,
  updatePassword,
} = AuthController;

router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);
router.route('/updatePassword').patch(protect, updatePassword);

const { getAllUsers, createUser, getUser, updateUser, deleteUser, updateMe } =
  userController;
router.route('/updateMe').patch(protect, updateMe);
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
