var express = require('express');
var router = express.Router();
const roleController = require('../controller/role.controller');
const Auth = require("../middleware/auth");


router.post('/add',Auth.AuthAdmin, roleController.Post_Role);

router.get('/list',Auth.AuthAdmin, roleController.Get_Role);

router.put('/update/:id',Auth.AuthAdmin, roleController.Patch_Role);

router.delete('delete/:id',Auth.AuthAdmin, roleController.Delete_Role);


module.exports = router;