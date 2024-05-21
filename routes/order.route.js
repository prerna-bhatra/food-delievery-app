const express = require('express');
const router = express.Router();
const { createOrder} = require('../controllers/orderController');
const { checkTokenMiddleware } = require('../middlewares/authMiddleware.middleware');

router.post('/create',checkTokenMiddleware,  createOrder);
// router.get('/item/:dishId', dishById);
// router.get('/items/:restaurantId', dishesByRestaurantID);

module.exports = router;