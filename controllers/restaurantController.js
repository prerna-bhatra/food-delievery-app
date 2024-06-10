const { Restaurant } = require('../models/restuarant.model');
const { Menu } = require('../models/menu.model');
const { uploadFile } = require("../utills/gcpUploader");
const { where, Op } = require('sequelize');
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
        const { userId } = req;
        console.log({ userId });
        const restaurants = await Restaurant.findAll({ where: { userId } });
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
        res.status(200).json({ message: 'successfully', restaurant });
    } catch (error) {
        console.error('Error creating user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.restaurantById = async (req, res) => {
    try {
        const { restaurantId } = req.params
        const restaurant = await Restaurant.findByPk(
            restaurantId,
            {
                include: Menu,
                attributes: ['id', 'name', 'completeAddress', 'restaurantImages']
            }
        );
        res.status(200).json({ message: 'Fetched', restaurant });
    } catch (error) {
        console.error('Error creating user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.searchByDishName = async (req, res) => {
    try {
        const { dishName } = req.query;
        console.log({ dishName });
        const restaurants = await Restaurant.findAll({
            include: [{
                model: Menu,
                where: {
                    dishname: dishName
                },
                required: true
            }],
            attributes: ['id', 'name', 'completeAddress', 'restaurantImages']
        });

        res.status(200).json({ message: 'Restaurants fetched successfully', restaurants });
    } catch (error) {
        console.error('Error searching by dishname:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.restaurantOrMenuSearch = async (req, res) => {
    console.log("restaurantOrMenuSearch");
    try {
        console.log({ query: req.query });
        const { searchString } = req.query;
        console.log({ searchString });
        if (!searchString || !searchString.trim().length) {
            res.status(500).json({ error: 'Invalid Request' });
        }

        const menus = await Menu.findAll({
            where: {
                dishname: {
                    [Op.like]: `${searchString}%`
                }
            },
            attributes: ['id', 'dishname', 'price', 'dishImage']
        });

        const restaurants = await Restaurant.findAll({
            where: {
                name: {
                    [Op.like]: `%${searchString}%`
                }
            },
            attributes: ['id', 'name', 'completeAddress']
        });

        res.status(200).json({ message: 'User address created successfully', restaurants, menus });
    } catch (error) {
        console.error('Error creating user address:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.restaurantDocumentOrImagesUpload = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                })
            }
            const documentType = fields.documentType
            const restaurantId = fields.restaurantId[0];
            console.log({d:files.document});
            if (files.document) {
                const fileLocation = await uploadFile(files.document[0]);
                console.log({fileLocation});
                if (fileLocation) {
                    switch (documentType[0]) {
                        case 'panCardImage':
                            saveImage(restaurantId, { panCardImage: fileLocation });
                            return res.status(200).json({ error: ' document added  successfully' });
                            break;
                        case 'fssaiImage':
                            saveImage({ fssaiImage: fileLocation })
                            return res.status(200).json({ error: ' document added  successfully' });
                            break;
                        default:
                            return res.status(400).json({ error: 'Invalid document type' });
                            break;

                    }
                }
            }
        })

    } catch (error) {
        console.error('Error creating Image uploading:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const saveImage = async (restuarantId, updateFields) => {
    const updateImage = await Restaurant.update(
        updateFields,
        {
            where: {
                id: restuarantId
            }
        }
    );
    return updateImage;
}




