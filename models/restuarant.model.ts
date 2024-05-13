import { User } from "./user.model";

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
        allowNull: false
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
        allowNull: false
    },
    panNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    panCardName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    panCardImage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bankAccountNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bankAccountType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ifscCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fssaiNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fssaiExpiryDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fssaiImage: {
        type: DataTypes.STRING,
        allowNull: false
    },
});


User.hasMany(Restaurant, { foreignKey: 'userId' });
Restaurant.belongsTo(User, { foreignKey: 'userId' });


module.exports = { Restaurant };
