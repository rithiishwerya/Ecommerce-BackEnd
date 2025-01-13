const express = require("express");
const router = express.Router();
const brandController = require("../controller/brand.controller");
const image = require("../services/imageUpload");
const Auth = require("../middleware/auth");

router.post("/addbrand",Auth.AuthAdmin, image.imageUpload.single("image"), brandController.post_brand);

router.get("/listbrand", Auth.AuthAdmin, brandController.get_brand);

router.put("/updatebrand/:id",Auth.AuthAdmin, image.imageUpload.single("image"),brandController.update_brand);

//VARIANT UNIT

router.post("/addvariant",Auth.AuthAdmin, brandController.post_variantUnit);

router.get("/listvariant",Auth.AuthAdmin, brandController.get_variantUnit);

router.put("/updatevariant/:id",Auth.AuthAdmin, brandController.update_variantUnit);

//UNIT ONLY
router.post("/addunit",Auth.AuthAdmin, brandController.AddUnit);

router.put("/updateunit/:id",Auth.AuthAdmin, brandController.UpdateUnit);

module.exports = router;
