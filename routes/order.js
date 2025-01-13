const orderController = require ('../controller/order.controller')
const express = require('express')
const router = express.Router()
const Auth = require("../middleware/auth");

//ORDER
router.post('/placeOrder', Auth.AuthUser, orderController.checkout)

router.get('/listOrder', Auth.AuthUser, orderController.get_order)



module.exports = router;