module.exports = {
    index: (req, res) => {
        const pagetitle = "Home";
        res.render("defaultViews/index", {pagetitle});
    },
    about: (req, res) => {
        const pagetitle = "About";
        res.render("defaultViews/about", {pagetitle});
    },
    contact: (req, res) => {
        const pagetitle = "Contact";
        res.render("defaultViews/contact", {pagetitle});
    },
    course: (req, res) => {
        const pagetitle = "Courses";
        res.render("defaultViews/course", {pagetitle});
    },
    consulting: (req, res) => {
        const pagetitle = "Consulting";
        res.render("defaultViews/consulting", {pagetitle});
    },
    corporate: (req, res) => {
        const pagetitle = "Corporate";
        res.render("defaultViews/corporate", {pagetitle})
    },
    cart: (req, res) => {
        const pagetitle = "Cart";
        res.render("defaultViews/cart", {pagetitle});
    },
    business: (req, res) => {
        const pagetitle = "Business";
        res.render("defaultViews/business", {pagetitle});
    },
    banking: (req, res) => {
        const pagetitle = "Banking";
        res.render("defaultViews/banking", {pagetitle});
    },
    course_details: (req, res) => {
        const pagetitle = "Course Details";
        res.render("defaultViews/course-details", {pagetitle});
    },
    course_video: (req, res) => {
        const pagetitle = "Course Video";
        res.render("defaultViews/course-video", {pagetitle});
    },
    education: (req, res) => {
        const pagetitle = "Education";
        res.render("defaultViews/education", {pagetitle});
    },
    instructor_details: (req , res) => {
        const pagetitle = "Instructor Details";
        res.render("defaultViews/instructor-details", {pagetitle});
    },
    marketing: (req, res) => {
        const pagetitle = "Marketting";
        res.render("defaultViews/marketing", {pagetitle})
    },
    music: (req, res) => {
        const pagetitle = "Music";
        res.render("defaultViews/music", {pagetitle})
    },
    package: (req, res) => {
        const pagetitle = "Package";
        res.render("defaultViews/package", {pagetitle})
    },
    photography: (req, res) => {
        const pagetitle = "Photography";
        res.render("defaultViews/photography", {pagetitle})
    },
    purchase: (req, res) => {
        const pagetitle = "Purchase";
        res.render("defaultViews/purchase", {pagetitle})
    },
    web_development: (req, res) => {
        const pagetitle = "Web Development";
        res.render("defaultViews/web-development", {pagetitle})
    }
}