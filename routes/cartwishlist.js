const express = require ('express');
const router = express.Router();
const cartwishlistController= require('../controller/cartwishlist.controller');
const Auth = require("../middleware/auth");

//CART
router.post('/addToCart', Auth.AuthUser, cartwishlistController.post_cart)

router.get('/getCartItems', Auth.AuthUser, cartwishlistController.get_cart)

router.delete('/deleteCart/:id', Auth.AuthUser, cartwishlistController.delete_cart)

//WISHLIST
router.post('/addToWishlist', Auth.AuthUser, cartwishlistController.post_wishlist)

router.get('/getWishlistItems', Auth.AuthUser, cartwishlistController.get_wishlist)

router.delete('/deleteWishlist/:id', Auth.AuthUser, cartwishlistController.delete_wishlist)

//COMPARE
router.post('/postCompare', Auth.AuthUser, cartwishlistController.post_compare)

router.get('/compareProducts', Auth.AuthUser, cartwishlistController.get_compare)

module.exports = router;