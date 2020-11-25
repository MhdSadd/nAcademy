const express = require("express");
const router = express.Router();

// destructuring authControllers
const { loginGet, loginPost, registerGet, registerPost, logout } = require("../../controllers/auth/authController");

// Login route
router.route("/login")
.get(loginGet)
.post(loginPost);

// Register Route
router.route("/register")
.get(registerGet)
.post(registerPost);

// logout route
router.get("/logout", logout);

module.exports = router;