const express = require('express');
const router = express.Router();
const { createOrder, orderByUserId , orderByRestaurantId  ,updateOrderStatus} = require('../controllers/orderController');
const { checkTokenMiddleware } = require('../middlewares/authMiddleware.middleware');

router.post('/create', checkTokenMiddleware, createOrder);
router.get('/history',checkTokenMiddleware , orderByUserId);
router.get('/manage-orders/:restaurantId',checkTokenMiddleware , orderByRestaurantId);
router.post('/order-status/:orderId', updateOrderStatus);

module.exports = router;