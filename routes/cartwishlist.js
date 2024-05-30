const express = require ('express');
const router = express.Router();
const cartwishlistController= require('../controller/cartwishlist.controller');

//CART
router.post('/addToCart',cartwishlistController.post_cart)

router.get('/getCartItems',cartwishlistController.get_cart)

router.delete('/deleteCart/:id',cartwishlistController.delete_cart)

//WISHLIST
router.post('/addToWishlist',cartwishlistController.post_wishlist)

router.get('/getWishlistItems',cartwishlistController.get_wishlist)

router.delete('/deleteWishlist/:id',cartwishlistController.delete_wishlist)

//COMPARE
router.post('/postCompare',cartwishlistController.post_compare)

router.get('/compareProducts',cartwishlistController.get_compare)

module.exports = router;