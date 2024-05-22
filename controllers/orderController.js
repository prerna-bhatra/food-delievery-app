const { Order } = require('../models/order.model');
const { where, Op } = require('sequelize');


exports.createOrder = async (req, res) => {
    console.log({Order});
    try {
        const { userId } = req
        const { restaurantId, foodItems, totalPrice, checkoutAddress,paymentMethod } = req.body;

        console.log({
            foodItems,
            restaurantId,
            totalPrice,
            checkoutAddress
        });

        const newOrder = await Order.create({
            restaurantId,
            userId,
            foodItems,
            totalPrice,
            checkoutAddress,
            paymentMethod
        })
        console.log({ newOrder });
        res.status(200).json({ message: 'Order created successfully', newOrder });
    } catch (error) {
        console.error('Error creating user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// only restuarant owner can do this
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body;
        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        order.orderStatus = status;
        await order.save();

        res.status(200).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.orderByID = async (req, res) => {
    try {
        const { orderId } = req.params
        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order fetched successfully' ,order});
    } catch (error) {
        console.error('Error creating user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.orderByUserId = async (req, res) => {
    try {
        const { userId } = req;
        console.log({userId});
        const orders = await Order.findAll({ where: { userId: userId } });

        if (!orders) {
            throw new Error('No orders found for the given user');
        }

        // return orders;

        res.status(200).json({ message: 'Order fetched successfully' ,orders});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.orderByRestaurantId = async (req, res) => {
    try {
        const { restaurantId } = req.params
        const orders = await Order.findAll({ where: { restaurantId: restaurantId } });

        if (!orders) {
            throw new Error('No orders found for the given user');
        }

        res.status(200).json({ message: 'Orders fetched successfully' ,orders});
    } catch (error) {
        console.error('Error creating user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};