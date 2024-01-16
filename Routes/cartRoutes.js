const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const cartController = require("../Controllers/cartController");

router.use(authController.protect);

router.get("/", cartController.getUserCart);
router.post("/", cartController.addItemToCart);
module.exports = router;
