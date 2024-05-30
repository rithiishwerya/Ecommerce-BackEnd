var express = require('express');
var router = express.Router();
const studentManagementController = require('../controller/stuManagement.controller');
const image = require('../services/imageUpload');


router.post('/post/image', image.imageUpload.single('image'), studentManagementController.uploadFile);

router.post('/add',image.imageUpload.single('image'),studentManagementController.studManagement);

router.put('/update/:id',studentManagementController.updatestudent);

router.delete('/delete',studentManagementController.Deletestudent);

router.get('/get',studentManagementController.getstudent);

//PAIZATTOUAT
//router.get('/membership',studentManagementController.getmembership);
router.get('/fetchWebsiteData', studentManagementController.get_WebsiteData);

router.post('/postWebsiteData',image.imageUpload.single('image'),studentManagementController.post_WebsiteData)

module.exports = router;