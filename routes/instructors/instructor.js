const express = require("express");
// const { ensureAuthenticated, isLoggedIn } = require("../../config/auth");
const router = express.Router();

// destructuring users controller
const { index, profile, blank_page, update_profileGet, update_profilePut } = require("../../controllers/instructors/instructorsControllers");

/* ====================================> 
Users routing
<======================================*/

// index route
router.get("/", index);

// profile route
router.get("/profile", profile);

// basic-table route
// router.get("/update-profile", update-profile);

// Blank-page route
router.get("/blank-page", blank_page);

// put route
router.route("/update-profile")
.get(update_profileGet)
.post(update_profilePut)

module.exports = router;