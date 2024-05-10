const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/index.js');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userType: {
        type: DataTypes.STRING,
        default:'customer',
        allowNull: false
    }
});

module.exports = { User };
