const orderController = require ('../controller/order.controller')
const express = require('express')
const router = express.Router()

//ORDER
router.post('/placeOrder',orderController.post_order)



module.exports = router;