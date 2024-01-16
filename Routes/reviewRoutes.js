const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const reviewController = require("../Controllers/reviewController");

router.use(authController.protect);

router.post(
  "/:productId",
  authController.restrictTo("CUSTOMER"),
  reviewController.addReview
);  
router.get("/:productId", reviewController.getAllReviews);
module.exports = router;
