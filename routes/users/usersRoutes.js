const express = require("express");
const { ensureAuthenticated } = require("../../config/auth");
const router = express.Router();

// destructuring users controller
const { index, profile, basic_table, maps, icons, blank_page } = require("../../controllers/users/usersControllers");

/* ====================================> 
Users routing
<======================================*/

// index route
router.get("/", ensureAuthenticated, index);

// profile route
router.get("/profile", profile);

// basic-table route
router.get("/basic-table", basic_table);

// maps route 
router.get("/maps", maps);

// icons route
router.get("/icons", icons);

// Blank-page route
router.get("/blank-page", blank_page);

module.exports = router;