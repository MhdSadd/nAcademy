const { Router } = require("express");
const express = require("express");
const router = express.Router();

// destructuring controllers
const { index, about, contact, course } = require("../../controllers/default/defaultController")

// home route
router.get("/", index);

// about route
router.get("/about", about);

// contact route
router.get("/contact", contact);

// courses route 
router.get("/course", course);

module.exports = router;