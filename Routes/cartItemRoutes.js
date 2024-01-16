const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const cartItemController = require("../Controllers/cartItemController");

router.use(authController.protect);

router.put("/:productId", cartItemController.updateCartItem);
router.delete("/:productId", cartItemController.removeCartItem);
module.exports = router;
