const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/index.js');
const {Restaurant} = require('./restuarant.model.js'); // Assuming you have a User model

const Menu = sequelize.define('Menu', {
    dishname: {
        type: DataTypes.STRING,
        allowNull: false    },
    dishImage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Restaurant.hasMany(Menu, { foreignKey: 'restaurantId' });
Menu.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

module.exports = { Menu };
