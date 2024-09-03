var express = require('express');
var router = express.Router();
var otpController = require('../controller/otp.controller')

router.post("/getotp",otpController.sendEmail)

module.exports = router;