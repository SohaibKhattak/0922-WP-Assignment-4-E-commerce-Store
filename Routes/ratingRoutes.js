const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const ratingController = require("../Controllers/ratingController");

router.use(authController.protect);

router.post("/:productId", ratingController.addRating);
router.get("/:productId", ratingController.getAllRatings);
module.exports = router;