var express = require('express');
var router = express.Router();
const categoryController = require('../controller/category.controller');
const image = require('../services/imageUpload');


//CATEGORY
router.post('/add',image.imageUpload.single('image'),categoryController.post_category);

router.get('/list',categoryController.get_category);

router.put('/update/:id',image.imageUpload.single('image'),categoryController.update_category);


//SUB CATEGORY
router.post('/addsub',image.imageUpload.single('image'),categoryController.post_subcategory);

router.get('/listsub',categoryController.get_subcategory);

router.put('/update/:id',image.imageUpload.single('image'),categoryController.update_subcategory);


//CHILD CATEGORY
router.post('/addchild',image.imageUpload.single('image'),categoryController.post_childcategory);

router.get('/listchild',categoryController.get_childcategory);

router.put('/update/:id',image.imageUpload.single('image'),categoryController.update_childcategory);

//CATEGORY FLOW
router.get('/categoryFlow',categoryController.category_flow);

module.exports = router;