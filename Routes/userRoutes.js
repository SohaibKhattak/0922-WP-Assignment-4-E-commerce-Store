const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");

router.post("/auth/signup", authController.signUp);
router.post("/auth/login", authController.login);

// protecting with token 
router.use(authController.protect);

router.get("/profile", userController.getUserProfile);
router.get("/", userController.getAllUsers);

router.get("/auth/logout", authController.logout);
module.exports = router;
