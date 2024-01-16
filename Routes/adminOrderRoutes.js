const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const adminOrderController = require("../Controllers/adminOrderController");
router.use(authController.protect, authController.restrictTo("ADMIN"));

router.get("/", adminOrderController.getAllOrder);
router.get("/confirm/:id", adminOrderController.confirmOrder);
router.get("/ship/:id", adminOrderController.shipOrder);
router.get("/deliver/:id", adminOrderController.deliverOrder);
router.get("/cancel/:id", adminOrderController.cancelOrder);
router.delete("/:id", adminOrderController.deleteOrder);
module.exports = router;
