const { Router } = require("express");
const express = require("express");
// const { registerGet } = require("../../controllers/auth/instructorController");
const router = express.Router();

// destructuring controllers
const { index, about, contact, course, consulting, corporate, cart, business, banking, course_details, course_video, education,
instructor_details,
marketing,
music,
package,
photography,
purchase,
web_development, 
reigisterGet} = require("../../controllers/default/defaultController")

// home route
router.get("/", index);

// about route
router.get("/about", about);

// contact route
router.get("/contact", contact);

// courses route 
router.get("/course", course);

// courses route
router.get("/consulting", consulting);

// corporate route
router.get("/corporate", corporate);

// cart route
router.get("/cart", cart);

// business route
router.get("/business", business);

// banking route
router.get("/banking", banking);

// course-details route
router.get("/course-details", course_details);

// course-video route 
router.get("/course-video", course_video);

// education route 
router.get("/education", education);

// instructor-details
router.get("/instructor-details", instructor_details);

// marketing routes
router.get("/marketing", marketing);

// music route
router.get("/music", music);

// package routes
// router.get("/package", package);

// photography routes
router.get("/photography", photography);

// purchase routes
router.get("/purchase", purchase);

// web-development route
router.get("/web-development", web_development);

// Register route
router.route('/register')
.get(reigisterGet)

module.exports = router;