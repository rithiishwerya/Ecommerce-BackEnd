const express = require('express');
const router = express.Router();
const usersController = require('../controller/user.controller');
const Auth = require("../middleware/auth");


router.post('/register', usersController.register);

router.post('/login', usersController.login);

router.post('/sendemail',  usersController.SendMail)

router.put('/verifyemail',  usersController.VerifyOTP)

router.put('/update/:id', Auth.AuthUser, usersController.update_users);

router.get('/profile', Auth.AuthUser, usersController.get_Profile);

//generate token
router.post('/userToken', usersController. post_userToken)

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
