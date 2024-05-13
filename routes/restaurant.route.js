const express = require('express');
const router = express.Router();
const { registerRestaurant, virificationDetailUpdateOrSave, restaurantsByUserId, myRestaurantById } = require('../controllers/restaurantController');
const { checkTokenMiddleware } = require('../middlewares/authMiddleware.middleware');

//create 
router.post('/register', checkTokenMiddleware, registerRestaurant);
router.post('/verification-details/:restaurantId', checkTokenMiddleware, virificationDetailUpdateOrSave);
router.get('/my-restaurant/:restaurantId', checkTokenMiddleware, myRestaurantById);
router.get('/my-restaurants', checkTokenMiddleware, restaurantsByUserId);


module.exports = router;