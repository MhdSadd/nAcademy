module.exports = {
  index: (req, res) => {
    const pagetitle = "Home";
    res.render("default/index", { pagetitle });
  },
  about: (req, res) => {
    const pagetitle = "About";
    res.render("default/about", { pagetitle });
  },
  contact: (req, res) => {
    const pagetitle = "Contact";
    res.render("default/contact", { pagetitle });
  },
  course: (req, res) => {
    const pagetitle = "Courses";
    res.render("default/course", { pagetitle });
  },
  course_details: (req, res) => {
    const pagetitle = "Course Details";
    res.render("default/course-details", { pagetitle });
  },
  education: (req, res) => {
    const pagetitle = "Education";
    res.render("default/education", { pagetitle });
  },
  instructor_details: (req, res) => {
    const pagetitle = "Instructor Details";
    res.render("default/instructor-details", { pagetitle });
  },

  web_development: (req, res) => {
    const pagetitle = "Web Development";
    res.render("default/web-development", { pagetitle });
  },
  reigisterGet: (req, res) => {
    let pageTitle = "Register";
    res.render("auth/register", { pageTitle });
  },
};
