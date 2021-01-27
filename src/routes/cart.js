const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const auth = require('../middlewares/routes/auth');


//Show products cart//
router.get('/', auth, cartController.showCart);

//Add to cart//
router.post('/addToCart', auth, cartController.addToCart);

//Delete product in cart//
router.delete('/deleteCartItem', auth, cartController.deleteCartItem);

//Purchase cart//
router.post('/purchase', auth, cartController.purchase);

//Cart history//
router.get('/cartsHistory', auth, cartController.cartsHistory);

//Purchase Details details//
// router.get('/purchaseDetails/:id', auth, cartController.purchaseDetails);

module.exports = router;