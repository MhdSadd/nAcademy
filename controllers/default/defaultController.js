module.exports = {
    index: (req, res) => {
        const pagetitle = "Home";
        res.render("defaultViews/index", {pagetitle});
    }
}