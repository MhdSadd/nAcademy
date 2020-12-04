const router = require('express').Router()

// destructuring controllers
const { index, about, contact, course, course_details, education,
instructor_details,
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

// course-details route
router.get("/course-details", course_details);

// education route 
router.get("/education", education);

// instructor-details
router.get("/instructor-details", instructor_details);

// web-development route
router.get("/web-development", web_development);

// Register route
router.route('/register')
.get(reigisterGet)

module.exports = router;