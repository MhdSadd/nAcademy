const express = require("express");
const { ensureAuthenticated } = require("../../config/auth");
const router = express.Router();

// destructuring controller 
const { index, profile, basic_table, maps, icons, blank_page, all_instructors, allCourseGet, delete_instructor, approve_instructor } = require("../../controllers/admin/adminController");

/*=======================================> 
Admin routing
<=========================================*/

// index route
router.get("/", ensureAuthenticated, index);

// profile route
router.get("/profile", ensureAuthenticated, profile);

//All instructor route
router.get("/all-instructors",ensureAuthenticated, all_instructors);
router.get("/deleteInstructor/:instructorId", ensureAuthenticated, delete_instructor)
router.get("/approveInstructor/:instructorId",ensureAuthenticated, approve_instructor)

// basic-table route
router.get("/basic-table", basic_table);

// maps route 
router.get("/maps", maps);

// icons route
router.get("/icons", ensureAuthenticated, icons);

// Blank-page route
router.get("/all-courses",ensureAuthenticated, allCourseGet);

// Blank-page route
router.get("/blank-page", blank_page);

module.exports = router;