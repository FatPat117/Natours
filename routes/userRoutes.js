const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userControllers');
const AuthController = require('../controllers/authController');

const upload = multer({ dest: 'public/img/users' });

const router = express.Router();

// router.param('id', userController.checkID);
router.route('/signup').post(AuthController.signUp);
router.route('/login').post(AuthController.login);
router.route('/logout').get(AuthController.logout);
router.route('/forgotPassword').post(AuthController.forgotPassword);
router.route('/resetPassword/:token').patch(AuthController.resetPassword);

// protect all routes after middleware

router.use(AuthController.protect);

router.route('/updatePassword').patch(AuthController.updatePassword);
router.route('/me').get(userController.getMe, userController.getUser);

router
  .route('/updateMe')
  .patch(upload.single('photo'), userController.updateMe);
router.route('/deleteMe').delete(userController.deleteMe);

// Restrict to admin
router.use(AuthController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
