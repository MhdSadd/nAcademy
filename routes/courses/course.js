const express = require("express");
const router = express.Router();
const {CoursePost, allCourseGet, singleCourseGet, sign_upCourse} = require('../../controllers/courses/coursesController');
const upload = require('../../config/multer');
const {ensureAuthenticated} = require('../../config/configurations')





// Add course
router.route('/add-course')
.post(upload.single('courseImage'), CoursePost)

// Packages route
router.get('/package', allCourseGet);
router.get("/single-package/:courseId", singleCourseGet);
router.post("/sign-up/:courseId", sign_upCourse);

// Delete course
// router.get('/delete-course/:courseId', ensureAuthenticated, delete_course )

// Update course
// router.get('/update-course/:courseId', ensureAuthenticated, update_course )









module.exports =router
