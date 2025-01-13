const express = require("express");
const router = express.Router();
const cartproductController = require("../controller/cartproduct.controller");
const Auth = require("../middleware/auth");

router.get("/getcart", Auth.AuthUser, cartproductController.list_products);

module.exports = router;
