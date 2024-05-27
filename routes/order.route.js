const express = require('express');
const router = express.Router();
const { createOrder, orderByUserId , orderByRestaurantId  ,updateOrderStatus, cancelOrder} = require('../controllers/orderController');
const { checkTokenMiddleware } = require('../middlewares/authMiddleware.middleware');

router.post('/create', checkTokenMiddleware, createOrder);
router.get('/history',checkTokenMiddleware , orderByUserId);
router.get('/manage-orders/:restaurantId',checkTokenMiddleware , orderByRestaurantId);
router.post('/order-status/:orderId', updateOrderStatus);
router.get('/cancel/:orderId', cancelOrder);

module.exports = router;