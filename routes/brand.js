const express = require("express");
const router = express.Router();
const brandController = require("../controller/brand.controller");
const image = require("../services/imageUpload");

const auth = require("../middleware/auth");
//BRAND

router.post("/addbrand",
  image.imageUpload.single("image"),
  brandController.post_brand
);

router.get("/listbrand", auth.AuthAdmin, brandController.get_brand);

router.put(
  "/updatebrand/:id",
  image.imageUpload.single("image"),
  brandController.update_brand
);

//VARIANT UNIT

router.post("/addvariant", brandController.post_variantUnit);

router.get("/listvariant", brandController.get_variantUnit);

router.put("/updatevariant/:id", brandController.update_variantUnit);

//UNIT ONLY
router.post("/addunit", brandController.AddUnit);

router.put("/updateunit/:id", brandController.UpdateUnit);

module.exports = router;
