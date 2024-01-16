const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const productController = require("../Controllers/productController");

router.use(authController.protect, authController.restrictTo("ADMIN"));

router.post("/", productController.createProduct);
router.patch("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);
router.post("/createMultiple", productController.createMultipleProducts);
module.exports = router;
