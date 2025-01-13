const paymentController = require ('../controller/payment.controller')
const express = require('express')
const router = express.Router()
const Auth = require("../middleware/auth");

//ORDER
router.get('/',  paymentController. start)

router.post('/checkout',  paymentController. session)

router.get('/complete',  paymentController. complete)

router.get('/cancel',  paymentController. cancel)



module.exports = router;