const express = require('express');
const router = express.Router();
const { registerRestaurant, virificationDetailUpdateOrSave, restaurantsByUserId, myRestaurantById , updateRestaurantRegistration } = require('../controllers/restaurantController');
const { checkTokenMiddleware } = require('../middlewares/authMiddleware.middleware');

router.post('/register', checkTokenMiddleware, registerRestaurant);
router.post('/update-registration-details/:restaurantId', checkTokenMiddleware, updateRestaurantRegistration);
router.post('/verification-details/:restaurantId', checkTokenMiddleware, virificationDetailUpdateOrSave);
router.get('/my-restaurant/:restaurantId', checkTokenMiddleware, myRestaurantById);
router.get('/my-restaurants', checkTokenMiddleware, restaurantsByUserId);

module.exports = router;