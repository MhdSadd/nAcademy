module.exports = {
    loginGet: (req, res) => {
        const pagetitle = "Login";
        res.render("auth/login", {pagetitle});
    },
    loginPost: (req, res) => {},
    registerGet: (req, res) => {
        const pagetitle = "Register";
        res.render("auth/register", {pagetitle});
    },
    registerPost: (req, res) => {}
}