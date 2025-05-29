const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router({ mergeParams });

const { protect, restrictTo } = authController;
const { getAllReviews, createReview, updateReview, setTourUserIds } =
  reviewController;

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .patch(updateReview)
  .delete(protect, restrictTo('user'), deleteReview);
module.exports = router;
