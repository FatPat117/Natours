const express = require('express');
const fs = require('fs');
const tourController = require('../controllers/tourControllers');

const router = express.Router();

const { getAllTours, createTour, getTour, updateTour, deleteTour } =
  tourController;

// router.param('id', checkID);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
