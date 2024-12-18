// controllers/placesController.js

const menuItems = require('./menuItemController');

const data2=require('../models/data')
const comments=require('../models/comments')
const ratings=require('../models/ratings')

exports.getIndex = async (req, res) => {
  const lat = req.query.lat;
  const lng = req.query.lng;
  const zoom = req.query.zoom;
  const markerId = req.query.marker;

  // Redirect `/` to `/map` with default coordinates if not provided
  if (!lat || !lng || !zoom) {
    return res.redirect('/map?lat=47.5&lng=19.1&zoom=11');
  }

  try {
    const allPlaces = await data2.find(); // Fetch all places
    const allComments = await comments.find();
    const allRatings = await ratings.find();
    const selectedMarker = markerId
    ? allPlaces.find((place) => place.id.toString() === markerId)
    : null;

    res.render('index', {
      apiKey: `${process.env.API_KEY}`,
      places: allPlaces,
      comments: allComments,
      menuItems,
      ratings: allRatings,
      initialCenter: { lat: parseFloat(lat), lng: parseFloat(lng) },
      zoomAmount: zoom,
      selectedMarkerId: markerId || null, // Send selected marker ID to the frontend
      selectedMarkerData: selectedMarker || null, // Send the selected marker's data
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Server error');
  }
};



