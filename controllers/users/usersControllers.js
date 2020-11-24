module.exports = {
    index: (req, res) => {
        const pagetitle = "User";
        res.render("users/index", {pagetitle});
    },
    profile: (req, res) => {
        const pagetitle = "Profile";
        res.render("users/profile", {pagetitle});
    },
    basic_table: (req, res) => {
        const pagetitle = "Basic Table";
        res.render("users/basic-table", {pagetitle});
    }, 
    maps: (req, res) => {
        const pagetitle = "Map";
        res.render("users/map", {pagetitle});
    },
    icons: (req, res) => {
        const pagetitle = "Icons";
        res.render("users/icons", {pagetitle});
    },
    blank_page: (req, res) => {
        const pagetitle = "Blank Page";
        res.render("users/blank-page", {pagetitle});
    }
}