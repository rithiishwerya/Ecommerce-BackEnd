var express = require ('express')
var router = express.Router()
const productController = require('../controller/product.controller')
const image = require ('../services/imageUpload');
const Auth = require("../middleware/auth");

router.post('/addProducts',Auth.AuthAdmin, productController.post_product);

router.put('/updateProductFields/:id',Auth.AuthAdmin, image.imageUpload.fields([{ name: 'productfeaturedimage', maxCount: 1 }, { name:'producthoverfeaturedimage', maxCount: 1 }]),productController.update_product);

router.put('/updateProductImage/:id',Auth.AuthAdmin, image.imageUpload.array('productImage'),productController.UpdateProductImages);

router.delete('/deleteProduct',Auth.AuthAdmin, productController.delete_product);

//VARIANT
router.post('/addvariant',Auth.AuthAdmin, productController.VariantProduct);

router.put('/updatevariant/:id',Auth.AuthAdmin, productController.Update_variant);
 
router.delete('/deleteVariant/:id',Auth.AuthAdmin, productController.delete_variant);
 
//GET ALL
router.get('/getproduct',Auth.AuthAdmin, productController.products);



module.exports =router;
