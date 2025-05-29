const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router({ mergeParams });

const { protect, restrictTo } = authController;
const { getAllReviews, createReview } = reviewController;

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);

router.route('/:id').delete(protect, restrictTo('user'), deleteReview);
module.exports = router;
