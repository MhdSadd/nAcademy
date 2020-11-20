const { Router } = require("express");
const express = require("express");
const router = express.Router();

// destructuring controllers
const { index } = require("../../controllers/default/defaultController")

// home route
router.get("/", index)

module.exports = router;