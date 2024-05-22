const express = require('express');
const router = express.Router();
const { createOrder, orderByUserId } = require('../controllers/orderController');
const { checkTokenMiddleware } = require('../middlewares/authMiddleware.middleware');

router.post('/create', checkTokenMiddleware, createOrder);
router.get('/history',checkTokenMiddleware , orderByUserId);
// router.get('/items/:restaurantId', dishesByRestaurantID);

module.exports = router;