const mongoose = require("mongoose");
const { Admin } = require("../../models/admin/admin");
const { Instructor } = require("../../models/instructor/instructor");
const { Course } = require("../../models/courses/course");
const cloudinary = require("../../config/cloudinary");
const bcrypt = require("bcryptjs");


module.exports = {

  // create course/admin
  create_course: async (req, res) => {
    const pagetitle = "Admin";
    const name = req.user.name;
    const email = req.user.email;
    const avatar = req.user.avatar
    const author = req.user.name
    res.render("admin/create-course", { pagetitle, name, email, avatar, author });
  },

  // admin profile get
  profile: async (req, res) => {
    const pagetitle = "Profile";
    const name = req.user.name;
    const email = req.user.email;
    const avatar = req.user.avatar
    res.render("admin/profile", { pagetitle, name, email, avatar });
  },

  // all instructor GET
  all_instructors: (req, res) => {
    const instructors = Instructor.find({});
    instructors.exec((err, instructors) => {
      if (err) throw err;
      else {
        // console.log(instructors);
        let pagetitle = "Instructors";
        const name = req.user.name;
        const email = req.user.email;
        const avatar = req.user.avatar
        res.render("admin/all-instructor", { pagetitle, instructors, name, email, avatar  });
      }
    });
  },

  // delete an instructor
  delete_instructor: async (req, res) => {
    const id = req.params.instructorId;
    await Instructor.findByIdAndDelete(id)
      .then((deleteInstructor) => {
        console.log(deleteInstructor);
        res.redirect("/admin/all-instructors");
        return;
      })
      .catch((err) => console.log(err));
  },

  // approving of instructors
  approve_instructor: (req, res) => {
    let _id = req.params.instructorId;
    console.log(_id);
    Instructor.findOne({ _id })
      .then((approveInstructor) => {
        approveInstructor.instructorApproved = true;
        console.log(approveInstructor);
        approveInstructor.save();
        res.redirect("/admin/all-instructors");
      })
      .catch((err) => console.log(err));
  },

  // approved instructor GET
  approved_instructors: (req, res) => {
    Instructor.find({ instructorApproved: true }).then((approved) => {
      let pagetitle = "Instructors";
      const name = req.user.name;
      const email = req.user.email;
      const avatar = req.user.avatar
      res.render("admin/approved-instructor", { pagetitle, approved, name, email, avatar });
    });
  },

  // all course
  allCourseGet: (req, res) => {
    const courses = Course.find({});
    courses.exec((err, courses) => {
      if (err) throw err;
      else {
        // console.log(courses);
      }
      let pagetitle = "All courses";
      const name = req.user.name;
      const email = req.user.email;
      const avatar = req.user.avatar
      res.render("admin/all-course", { pagetitle, courses, name, email, avatar });
    });
  },

  // update page GET
  update_courseGet: async (req, res) => {
    const pagetitle = "Update Course";
    const update = req.user.update;
    const name = req.user.name;
    const email = req.user.email;
    const avatar = req.user.avatar
    res.render("admin/update-course", { pagetitle, update, name, email, avatar });
  },

   // delete a course
   delete_course: async (req, res) => {
    const id = req.params.courseId;
    await Course.findByIdAndDelete(id)
      .then((deleteCourse) => {
        res.redirect("/admin/all-courses");
        return;
      })
      .catch((err) => console.log(err));
  },

  // finding course and render for editing
  update_coursePost: async (req, res) => {
    const id = req.params.courseId;
    await Course.findById(id).then((update) => {
      // console.log(update);
      const pagetitle = "Update Course";
      const name = req.user.name;
      const email = req.user.email;
      const avatar = req.user.avatar
      res.render("admin/update-course", { pagetitle, update, name, email, avatar });
    });
  },

  // update course
  updateCourse: async (req, res, next) => {
    let updates = req.body;
    let _id = req.params.courseId;
    console.log("consoling body:::::", req.body, req.file);
    console.log(_id);
    await Course.findByIdAndUpdate({ _id }, updates)
      .then((updatedCourse) => {
        // console.log("updated course:::", updatedCourse)
        updatedCourse.save();
        res.redirect("/admin/all-courses");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // profile update
  profile_update: async(req, res, next)=>{
    const id = req.user.id;
    updateProfiles = req.body
    await Admin.findByIdAndUpdate(id,updateProfiles)
    .then(async(updatedAdmin) => {
        if(!updatedAdmin) {
            console.log("Cannot update Instructor Details");
            req.flash("error_msg", "Cannot update");
        } else {
          console.log(updatedAdmin.password)

          // hashing password and uploading avatar to cloudinary
          bcrypt.genSalt(10,(err, salt) => {
            bcrypt.hash(updatedAdmin.password, salt,async(err, hash) => {
              if (err) {
                throw err;
              }
               updatedAdmin.password = hash;
              await cloudinary.v2.uploader.upload(req.file.path, async(err, result)=>{
                console.log(result)
                updatedAdmin.avatar = result.secure_url
              })
              await updatedAdmin.save();
              res.redirect("/admin/profile");
              console.log('Update was successfull:::::', updatedAdmin);
              req.flash("success_msg", "Your update was Successful");
            });
          });
        }
    })
    .catch((err) => {
        console.log("An error occured while updating");
        req.flash("error_msg", "Your Update couldn't be processed");
        res.redirect("/admin/profile");
    })
}
};
