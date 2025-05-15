const express = require('express');
const userController = require('../controllers/userControllers');
const AuthController = require('../controllers/authController');

const router = express.Router();

const { signUp } = AuthController;

router.route('/signup').post(signUp);

const { getAllUsers, createUser, getUser, updateUser, deleteUser } =
  userController;

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
