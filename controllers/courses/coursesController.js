const { Course } = require("../../models/courses/course");
const { Student } = require("../../models/students/student");
const cloudinary = require("../../config/cloudinary");

module.exports = {
  CoursePost: async (req, res, next) => {
    const {
      courseName,
      price,
      duration,
      instructor,
      promo,
      description,
    } = req.body;
    const courseImage = req.file;
    let errors = [];
    // console.log("file::::::::::", req.file);
    // console.log("body::::::::::", req.body);
    if (!courseImage || !courseName || !price || !duration) {
      errors.push({ msg: "All field required" });
    } else {
      await cloudinary.v2.uploader.upload(
        req.file.path,
        async (err, result) => {
          console.log("consoling result:::::::", result);
          const newCourse = await new Course({
            courseName,
            price,
            duration,
            instructor,
            promo,
            description,
            courseImage: await result.secure_url,
          });
          newCourse.save();
          res.redirect("/admin");
        }
      );
    }
  },
  allCourseGet: (req, res) => {
    const courses = Course.find({});
    courses.exec((err, courses) => {
      if (err) throw err;
      else {
        console.log(courses);
      }
      let pagetitle = "Courses";
      res.render("default/package", { pagetitle, courses });
    });
  },
  singleCourseGet: async (req, res) => {
    const id = req.params.courseId;
    // console.log('look::::::::::::::', id)
    await Course.findById(id)
      .then((single) => {
        const pagetitle = "single Course";
        res.render("default/single-package", { pagetitle, single });
      })
      .catch((err) => console.log(err));
  },

  sign_upCourse: async (req, res, next) => {
    let _id = req.params.courseId;
    console.log(_id);
    await Course.findById({ _id })
      .then((course) => {
        let studentID = req.body;
        Student.findOne(studentID).then((student) => {
          student.courses.push(course);
          // console.log(student)
          student.save();
          req.flash({ message: "Course registration successfull" });
          res.redirect("/courses/package");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
