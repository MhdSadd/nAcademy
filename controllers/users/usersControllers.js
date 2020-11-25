module.exports = {
    index: (req, res, next) => {
        const pagetitle = "User";
        const email = req.user.email;
        res.render("users/index", {pagetitle, email});
        next();
    },
    profile: (req, res, next) => {
        const pagetitle = "Profile";
        const name = req.user.name;
        const email = req.user.email;
        res.render("users/profile", {pagetitle, email, name});
        next();
    },
    basic_table: (req, res, next) => {
        const pagetitle = "Basic Table";
        const email = req.email;
        res.render("users/basic-table", {pagetitle, email});
        next();
    }, 
    maps: (req, res, next) => {
        const pagetitle = "Map";
        const email = req.email;
        res.render("users/map", {pagetitle, email});
        next();
    },
    icons: (req, res, next) => {
        const pagetitle = "Icons";
        const email = req.email;
        res.render("users/icons", {pagetitle, email});
        next();
    },
    blank_page: (req, res, next) => {
        const pagetitle = "Blank Page";
        const email = req.email;
        res.render("users/blank-page", {pagetitle, email});
        next();
    }
}