const express = require("express");
const router = express.Router();

// destructuring authControllers
const { loginGet, loginPost, registerGet, registerPost } = require("../../controllers/auth/authController");

// Login route
router.route("/login")
.get(loginGet)
.post(loginPost);

// Register Route
router.route("/register")
.get(registerGet)
.post(registerPost);

module.exports = router;