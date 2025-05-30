const express = require('express');
const fs = require('fs');
const tourController = require('../controllers/tourControllers');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRoutes');

//router
const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

// router.param('id', checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan,
  );

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authControllerprotect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour,
  );
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

const { getAllReviews } = reviewController;

// router
//   .route('/:tourId/reviews')
//   .get(getAllReviews)
//   .post(protect, restrictTo('user'), createReview);
// module.exports = router;
