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
}