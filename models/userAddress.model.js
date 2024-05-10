const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/index.js');
const {User} = require('./user.model.js'); // Assuming you have a User model

const UserAddress = sequelize.define('UserAddress', {

    addressType: {
        type: DataTypes.STRING,
        defaultValue: 'Home',
        allowNull: false,
    },
    houseName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    googleAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false
    },
    landMark: {
        type: DataTypes.STRING,
        allowNull: true
    },
    receiverContact: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

User.hasMany(UserAddress, { foreignKey: 'userId' });
UserAddress.belongsTo(User, { foreignKey: 'userId' });


module.exports = { UserAddress };
