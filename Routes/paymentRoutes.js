const express = require("express");
const router = express.Router();
const paymentController = require("../Controllers/paymentController");
const authController = require("../Controllers/authController");

router.use(authController.protect);
//  checkout payment
router.post("/", paymentController.getCheckoutSession);

module.exports = router;
