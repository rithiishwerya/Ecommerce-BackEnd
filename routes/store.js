var express = require('express');
var router = express.Router();
const storesController = require('../controller/stores.controller');
const Auth = require("../middleware/auth");

router.post('/add', storesController.Post_Data);

router.get('/list',Auth.AuthAdmin, storesController.Get_Data);

router.put('/update/:id',Auth.AuthAdmin, storesController.Patch_Data);

router.delete('delete/:id',Auth.AuthAdmin, storesController.Delete_Data);


module.exports = router;