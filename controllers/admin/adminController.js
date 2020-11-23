module.exports = {
    index: (req, res) => {
        const pagetitle = "Admin";
        res.render("admin/index", {pagetitle});
    },
    profile: (req, res) => {
        const pagetitle = "Profile";
        res.render("admin/profile", {pagetitle});
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
    }
}