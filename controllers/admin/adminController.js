const mongoose = require("mongoose");
const {Admin} = require("../../models/adminsModel");
const {Instructor} = require("../../models/instructorsModel");
const {AddCourse} = require("../../models/createCourse");

module.exports = {
    index: async (req, res) => {
        await Admin.findOne({}).then(async (admin) => {
            const pagetitle = "Admin";
            res.render("admin/index", {pagetitle});
        })
    },
    profile: async (req, res) => {
        await Admin.findOne({})
        .then(async(admin) => {
            const pagetitle = "Profile";
            res.render("admin/profile", {pagetitle});
        })
    },
    all_instructors: (req, res) => {
        const instructors = Instructor.find({})
        instructors.exec((err, instructors)=>{
            if(err) throw err
            else{
                console.log(instructors)
            }
            let pagetitle = "Instructors";
            res.render("admin/all-instructor", {pagetitle ,instructors});
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
        const courses = AddCourse.find({})
        courses.exec((err, courses)=>{
            if(err) throw err
            else{
                console.log(courses)
            }
            let pagetitle = 'All course'
            res.render('admin/all-course', {pagetitle, courses})
        })
    }
}