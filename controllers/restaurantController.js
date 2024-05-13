const { Restaurant } = require('../models/restuarant.model');
const { where } = require('sequelize');
const formidable = require("formidable")

exports.registerRestaurant = async (req, res) => {
    try {
        const userId = req.userId
        const {
            name,
            completeAddress,
            googleAddress,
            contactName,
            contactNumber,
            country,
            pincode,
            receiverContact,
            state,
            city,
            latitude,
            longitude,
            ownerName,
            ownerContact,
            restaurantImages,
            startTime,
            endTime,
            establishmentType,
            outletDescription,
            ownerEmail,
            cuisines,
            openDays,
            panCardAddress
        } = req.body;

        const newRestaurant = await Restaurant.create({
            name,
            completeAddress,
            googleAddress,
            contactName,
            contactNumber,
            country,
            pincode,
            receiverContact,
            state,
            city,
            latitude,
            longitude,
            ownerName,
            ownerContact,
            restaurantImages,
            startTime,
            endTime,
            establishmentType,
            outletDescription,
            ownerEmail,
            cuisines,
            openDays,
            userId,
            panCardAddress
        });

        res.status(201).json({ message: 'Restaurant registered successfully', newRestaurant });
    } catch (error) {
        console.error('Error creating user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.updateRestaurantRegistration = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        console.log({ restaurantId });
        const {
            name,
            completeAddress,
            googleAddress,
            contactName,
            contactNumber,
            country,
            pincode,
            receiverContact,
            state,
            city,
            latitude,
            longitude,
            ownerName,
            ownerContact,
            restaurantImages,
            startTime,
            endTime,
            establishmentType,
            outletDescription,
            // ownerEmail,
            panCardAddress,
            cuisines,
            openDays } = req.body;

        const updateRestaurantRegistrationInfo = await Restaurant.update(
            {
                name,
                completeAddress,
                googleAddress,
                contactName,
                contactNumber,
                country,
                pincode,
                receiverContact,
                state,
                city,
                latitude,
                longitude,
                ownerName,
                ownerContact,
                restaurantImages,
                startTime,
                endTime,
                establishmentType,
                outletDescription,
                // ownerEmail,
                panCardAddress,
                cuisines,
                openDays
            },
            {
                where: {
                    id: restaurantId
                }
            }

        );

        res.status(201).json({ message: 'regustration  data  updated successfully', updateRestaurantRegistrationInfo });
    } catch (error) {
        console.error('Error creating user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.virificationDetailUpdateOrSave = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const {
            panCardName,
            panCardAddress,
            panNumber,
            ifscCode,
            fssaiNumber,
            fssaiExpiryDate,
            bankAccountType,
            bankAccountNumber } = req.body;

        const verificationInfo = await Restaurant.update(
            {
                panCardName,
                panNumber,
                ifscCode,
                fssaiNumber,
                fssaiExpiryDate,
                bankAccountType,
                bankAccountNumber,
                panCardAddress
            },
            {
                where: {
                    id: restaurantId
                }
            }

        );

        res.status(201).json({ message: 'verification data  updated successfully' });
    } catch (error) {
        console.error('Error creating user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.restaurantDocument = async (req, res) => {
    try {


        // res.status(201).json({ message: 'User address created successfully', userAddress: newUserAddress });
    } catch (error) {
        console.error('Error creating user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.restaurantsByUserId = async (req, res) => {
    try {
        const { userId } = req.userId
        const restaurants = await Restaurant.findAll({ userId });
        res.status(200).json({ message: 'User address created successfully', restaurants });
    } catch (error) {
        console.error('Error creating user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//  only restaurant user  can access it  ( document detauls etc)
exports.myRestaurantById = async (req, res) => {
    try {
        const { restaurantId } = req.params
        const restaurant = await Restaurant.findByPk(restaurantId);
        res.status(200).json({ message: 'User address created successfully', restaurant });
    } catch (error) {
        console.error('Error creating user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



