const express = require("express");
const { ensureAuthenticated, isLoggedIn } = require("../../config/auth");
const router = express.Router();

// destructuring users controller
const { index, profile, maps, icons, blank_page, update_profileGet, update_profilePut } = require("../../controllers/users/usersControllers");

/* ====================================> 
Users routing
<======================================*/

// index route
router.get("/", ensureAuthenticated, index);

// profile route
router.get("/profile", ensureAuthenticated, profile);

// basic-table route
// router.get("/update-profile", update-profile);

// maps route 
router.get("/maps",ensureAuthenticated, maps);

// icons route
router.get("/icons", ensureAuthenticated, icons);

// Blank-page route
router.get("/blank-page", ensureAuthenticated, blank_page);

// put route
router.route("/update-profile", isLoggedIn)
.get(update_profileGet)
.post(update_profilePut)

module.exports = router;