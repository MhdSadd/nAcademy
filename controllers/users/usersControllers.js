module.exports = {
    index: (req, res) => {
        const pagetitle = "User";
        const email = req.email;
        res.render("users/index", {pagetitle, email});
    },
    profile: (req, res) => {
        const pagetitle = "Profile";
        const email = req.email;
        res.render("users/profile", {pagetitle, email});
    },
    basic_table: (req, res) => {
        const pagetitle = "Basic Table";
        const email = req.email;
        res.render("users/basic-table", {pagetitle, email});
    }, 
    maps: (req, res) => {
        const pagetitle = "Map";
        const email = req.email;
        res.render("users/map", {pagetitle, email});
    },
    icons: (req, res) => {
        const pagetitle = "Icons";
        const email = req.email;
        res.render("users/icons", {pagetitle, email});
    },
    blank_page: (req, res) => {
        const pagetitle = "Blank Page";
        const email = req.email;
        res.render("users/blank-page", {pagetitle, email});
    }
}