const {User} = require('./user.model.js'); // Assuming you have a User model

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/index.js');
const Restaurant = sequelize.define('Restaurant', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completeAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    googleAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    ownerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ownerContact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    restaurantImages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    establishmentType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    outletDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ownerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // assuming owner email should be unique
    },
    cuisines: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    openDays: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    menuImages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    panNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    panCardName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    panCardAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    panCardImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bankAccountNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bankAccountType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ifscCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fssaiNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fssaiExpiryDate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fssaiImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
});


User.hasMany(Restaurant, { foreignKey: 'userId' });
Restaurant.belongsTo(User, { foreignKey: 'userId' });


module.exports = { Restaurant };
