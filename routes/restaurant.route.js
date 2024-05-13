const express = require('express');
const router = express.Router();
const { registerRestaurant } = require('../controllers/restaurantController');
const { checkTokenMiddleware } = require('../middlewares/authMiddleware.middleware');

//create 
router.post('/register', checkTokenMiddleware, registerRestaurant);

// router.post('/login', login);

module.exports = router;