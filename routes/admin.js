const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const Auth = require("../middleware/auth");


router.post('/register', adminController.register);

router.post('/login', adminController.login);

router.put('/update/:id', Auth.AuthAdmin, adminController.update_Admin);

router.get('/profile', Auth.AuthAdmin,  adminController.get_Profile);

//generate token
router.post('/userToken', adminController. post_userToken)

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
