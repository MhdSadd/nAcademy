const express = require("express");
const router = express.Router();
const {addCoursePost, courseGet, delete_course, update_course} = require('../../controllers/courses/coursesController');
const upload = require('../../config/multer');
const {ensureAuthenticated} = require('../../config/configurations')





// Add course
router.route('/add-course')
.post(upload.single('courseImage'), addCoursePost)

// Packages route
router.get('/package', courseGet)

// Delete course
// router.get('/delete-course/:courseId', ensureAuthenticated, delete_course )

// Update course
// router.get('/update-course/:courseId', ensureAuthenticated, update_course )









module.exports =router
