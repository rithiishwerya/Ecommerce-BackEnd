var express = require('express');
var router = express.Router();
const categoryController = require('../controller/category.controller');
const image = require('../services/imageUpload');
const Auth = require("../middleware/auth");

//CATEGORY
router.post('/add',Auth.AuthAdmin, image.imageUpload.single('image'),categoryController.post_category);

router.get('/list',Auth.AuthAdmin, categoryController.get_category);

router.put('/update/:id',Auth.AuthAdmin, image.imageUpload.single('image'),categoryController.update_category);


//SUB CATEGORY
router.post('/addsub',Auth.AuthAdmin, image.imageUpload.single('image'),categoryController.post_subcategory);

router.get('/listsub',Auth.AuthAdmin, categoryController.get_subcategory);

router.put('/update/:id',Auth.AuthAdmin, image.imageUpload.single('image'),categoryController.update_subcategory);


//CHILD CATEGORY
router.post('/addchild',Auth.AuthAdmin, image.imageUpload.single('image'),categoryController.post_childcategory);

router.get('/listchild',Auth.AuthAdmin, categoryController.get_childcategory);

router.put('/update/:id',Auth.AuthAdmin, image.imageUpload.single('image'),categoryController.update_childcategory);

//CATEGORY FLOW
router.get('/categoryFlow', categoryController.category_flow);

module.exports = router;