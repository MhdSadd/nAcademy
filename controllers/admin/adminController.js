const mongoose = require("mongoose");
const {Admin} = require("../../models/adminsModel");
const {Instructor} = require("../../models/instructorsModel");
const {Course} = require("../../models/createCourse");

module.exports = {
    index: async (req, res) => {
        const pagetitle = "Admin";
        res.render("admin/index", {pagetitle})
    },
    profile: async (req, res) => {
        const pagetitle = "Profile";
        const name = req.user.name;
        const email = req.user.email;
        res.render("admin/profile", {pagetitle, name, email});
    },
    all_instructors: (req, res) => {
        const instructors = Instructor.find({})
        instructors.exec((err, instructors)=>{
            if(err) throw err
            else{
                console.log(instructors);
                let pagetitle = "Instructors";
                res.render("admin/all-instructor", {pagetitle ,instructors});
            }
        })
    },
    delete_instructor: async (req,res)=>{
        const id = req.params.instructorId;
        await Instructor.findByIdAndDelete(id)
            .then(deleteInstructor => {
                console.log(deleteInstructor);
                res.redirect("/admin")
                return
            })
            .catch(err => console.log(err))
    },
    approve_instructor: (req,res)=>{
        let _id = req.params.instructorId
        console.log(_id);
        Instructor.findOne({_id})
            .then(approveInstructor => {
                approveInstructor.instructorApproved = true;
                approveInstructor.save();
                res.redirect("/admin")
            })
            .catch(err => console.log(err))
    },
    basic_table: (req, res) => {
        const pagetitle = "Basic Table";
        res.render("admin/basic-table", {pagetitle});
    }, 
    maps: (req, res) => {
        const pagetitle = "Map";
        res.render("admin/map", {pagetitle});
    },
    icons: (req, res) => {
        const pagetitle = "Icons";
        res.render("admin/icons", {pagetitle});
    },
    blank_page: (req, res) => {
        const pagetitle = "Blank Page";
        res.render("admin/blank-page", {pagetitle});
    },
    allCourseGet: (req, res) => {
        const courses = Course.find({})
        courses.exec((err, courses)=>{
            if(err) throw err
            else{
                console.log(courses)
            }
            let pagetitle = 'All courses'
            res.render('admin/all-course', {pagetitle, courses})
        })
    },

    // update page
    delete_course: async(req, res) => {
        const id = req.params.courseId;
        await Course.findByIdAndDelete(id)
        .then(deleteCourse => {
            res.redirect("/admin/all-courses")
            return
        })
        .catch(err => console.log(err));
    },

    // update page 
    update_courseGet: async(req, res) => {
        const pagetitle = "Update Course";
        const update = req.user.update;
        res.render("admin/update-course", {pagetitle, update});
    },

    // finding course and render
    update_coursePost: async(req, res) => {
        const id = req.params.courseId;
        await Course.findById(id)
        .then(update => {
            // console.log(update);
            const pagetitle = "Update Course";
            res.render("admin/update-course", {pagetitle, update});
        })
    },

    // update course
    updateCourse: async(req, res, next)=>{
        let updates = req.body 
        console.log(req.body)
        let _id = req.params.courseId
        // console.log(_id)
        await Course.findOneAndUpdate({_id}, updates,)
        .then(updatedCourse=>{
            console.log("updated course:::", updatedCourse)
        })
        .catch(err=>{console.log(err)})
    },
}