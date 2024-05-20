const express = require('express');
const router = express.Router();
const { registerRestaurant, 
    virificationDetailUpdateOrSave,
     restaurantsByUserId, 
     myRestaurantById ,
      updateRestaurantRegistration ,
      restaurantDocumentOrImagesUpload,
      restaurantOrMenuSearch,
      restaurantById,
      searchByDishName
    } = require('../controllers/restaurantController');
const { checkTokenMiddleware } = require('../middlewares/authMiddleware.middleware');

router.post('/register', checkTokenMiddleware, registerRestaurant);
router.post('/update-registration-details/:restaurantId', checkTokenMiddleware, updateRestaurantRegistration);
router.post('/verification-details/:restaurantId', checkTokenMiddleware, virificationDetailUpdateOrSave);
router.get('/my-restaurant/:restaurantId', checkTokenMiddleware, myRestaurantById);
router.get('/search-by-dishname', checkTokenMiddleware, searchByDishName);
router.get('/search/:restaurantId', checkTokenMiddleware, restaurantById);
router.get('/my-restaurants', checkTokenMiddleware, restaurantsByUserId);
router.post('/upload', checkTokenMiddleware , restaurantDocumentOrImagesUpload);
router.get('/search-item', checkTokenMiddleware , restaurantOrMenuSearch);

module.exports = router;