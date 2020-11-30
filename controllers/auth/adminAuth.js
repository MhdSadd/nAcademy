// this is going to be the admins passport
const passport = require("passport");


module.exports = {
    loginGet: (req, res) => {
        const pageTitle = "Login";
        res.render("auth/login", {pageTitle});
    },
    loginPost: (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/admin/profile",
        failureRedirect: "/auth/login",
        failureFlash: true,
    })(req, res, next);
    },
    
    
    // LOGOUT HANDLE
    logout: (req, res) => {
        req.logOut();
        req.flash({message:"You are logged out"});
        res.redirect("/auth/login");
    },
}