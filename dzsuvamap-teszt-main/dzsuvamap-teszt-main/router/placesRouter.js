// router/placesRouter.js
const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');
const commentsController = require('../controllers/commentsController');
const ratingsController = require('../controllers/ratingsController');

router.get('/', placesController.getIndex);
//router.get('/marker/:markerId', placesController.getMarkerDetails);
router.get('/map', placesController.getIndex); // Use the same controller for the /map route




router.post('/add-comment/:markerId', commentsController.addComment);
router.post('/add-rating/:markerId', ratingsController.addRating);

module.exports = router;
