const express = require("express");
const router = express.Router();

// destructuring authControllers
const { loginGet, loginPost, registerGet, registerPost, logout, updateGet, updatePut } = require("../../controllers/auth/instructorController");
const {adminLoginGet, adminLoginPost} = require("../../controllers/auth/adminAuth");
const { studentRegisterPost, studentRegisterGet } = require("../../controllers/auth/studentAuth");

// Login route
router.route("/login")
.get(loginGet)
.post(loginPost);

// Register Route
router.route("/register")
.get(registerGet)
.post(registerPost);

// student register
router.route("/student")
.get(studentRegisterGet)
.post(studentRegisterPost);

// update route
router.route("/update")
.get(updateGet)
.put(updatePut)

// admin Login
router.route("/admin")
.get(adminLoginGet)
.post(adminLoginPost);


// logout route
router.get("/logout", logout);

module.exports = router;

// const router = require('express').Router()
// const {studentRegisterPost} = require('../../controllers/auth/studentAuth')
// const {instructorRegisterPost} = require('../../controllers/auth/instructorAuth')
// const {loginGet, loginPost, logout} = require('../../controllers/auth/defaultAuth')

// router.route('/login')
// .get(loginGet)
// .post(loginPost)
// router.get('/logout',logout )
// router.route('/register').post(studentRegisterPost)
// router.route('/instructor-register').post(instructorRegisterPost)








// module.exports = router