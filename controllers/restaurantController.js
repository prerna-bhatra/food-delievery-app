const { Restaurant } = require('../models/restuarant.model');
const { uploadFileToS3 } = require("../utills/s3Uploader");
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


exports.restaurantDocumentOrImagesUpload = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                })
            }

            console.log({ files, d: files.document });
            const documentType = fields.documentType
            const restaurantId = fields.restaurantId[0];
            if (files.document) {
                const fileLocation = await uploadFileToS3(files.document[0]);
                if (fileLocation) {
                    console.log({ documentType });
                    switch (documentType[0]) {
                        case 'panCardImage':
                            console.log("PAN CARD CASE");
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
    console.log({ updateFields, restuarantId });
    const updateImage = await Restaurant.update(
        updateFields,
        {
            where: {
                id: restuarantId
            }
        }
    );

    console.log({ updateImage });

    return updateImage;

}




