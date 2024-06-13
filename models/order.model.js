const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/index.js');
const { Restaurant } = require('./restuarant.model.js'); // Assuming you have a User model
const { User } = require('./user.model.js');

const Order = sequelize.define('Order', {
    foodItems: {
        type: DataTypes.JSON,
        allowNull: false
    },
    checkoutAddress: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    orderStatus: {
        type: DataTypes.STRING, // pending , confirmed , out for delivery , cancelled , rejected , delivered
        allowNull: false,
        defaultValue: 'pending'
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

Restaurant.hasMany(Order, { foreignKey: 'restaurantId' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

module.exports = { Order };
