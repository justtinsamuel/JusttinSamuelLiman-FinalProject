const express = require("express");
const AuthController = require("../controllers/AuthController");
// const authenticate = require("../middlewares/Authenticate");

const router = express.Router();

// Register user baru
router.post("/register", AuthController.register);

// Login user
router.post("/login", AuthController.login);

// Get user yang sedang login
router.get("/me", AuthController.me);

module.exports = router;
