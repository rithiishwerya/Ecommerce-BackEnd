var express = require ('express')
var router = express.Router()
const productController = require('../controller/product.controller')
const image = require ('../services/imageUpload');

router.post('/addProducts',productController.post_product);

router.put('/updateProductFields/:id',image.imageUpload.fields([{ name: 'productfeaturedimage', maxCount: 1 }, { name:'producthoverfeaturedimage', maxCount: 1 }]),productController.update_product);

router.put('/updateProductImage/:id',image.imageUpload.array('productImage'),productController.UpdateProductImages);

//VARIANT
router.post('/addvariant',productController.VariantProduct);

router.put('/updatevariant/:id',productController.Update_variant);

//DELETE
router.delete('/deleteProduct',productController.delete_product);
 
router.delete('/deleteVariant/:id',productController.delete_variant);
 
//GET ALL
router.get('/getproduct',productController.products);



module.exports =router;
