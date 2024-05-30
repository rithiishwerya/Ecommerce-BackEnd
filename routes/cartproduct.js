const express = require("express");
const router = express.Router();
const cartproductController = require("../controller/cartproduct.controller");

router.get("/getcart", cartproductController.list_products);

module.exports = router;
