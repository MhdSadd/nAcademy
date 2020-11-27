const bcrypt = require("bcryptjs");
const passport = require("passport");
const {Instructor} = require("../../models/instructorsModel");

module.exports = {
    loginGet: (req, res) => {
        const pagetitle = "Login";
        res.render("auth/login", {pagetitle});
    },
    loginPost: (req, res, next) => {
        passport.authenticate("local", {
            successRedirect: "/user",
            failureRedirect: "/auth/login",
            failureFlash: true,
        })(req, res, next);
        // req.flash("success_msg", "You are Logged In");
    },
    registerGet: (req, res) => {
        const pagetitle = "Register";
        res.render("auth/register", {pagetitle});
    },
    registerPost: async (req, res) => {
            const { name, email, phone, password, confirmPassword } = req.body;
        let errors = [];

        // CHECKING REQUIRED FIELD
        if (!name || !email || !phone || !password || !confirmPassword) {
            errors.push({ msg: "Please fill in all fields" });
        }

        // CHECKING PASSWORD MATCH
        if (password !== confirmPassword) {
            errors.push({ msg: "Passwords do not match" });
        }

        //CHECKING PASSWORD LENGHT
        if (password.length < 3) {
            errors.push({ msg: "Password must be atleast 3 Characters" });
        }

        if (errors.length > 0) {
            let pagetitle = "Register";
            res.render("auth/register", {
                errors,
                name,
                email,
                phone,
                password,
                confirmPassword,
                pagetitle
            });
        } else {
            await Instructor.findOne({email: email})
            .then(async(instructor) => {
                if(instructor) {
                    console.log("Sorry User already Exist ");
                    return res.redirect("/auth/register");
                } else {
                    const newInstructor = await new Instructor ({
                        name,
                        email,
                        phone,
                        password
                    })



                    console.log(`New instructor created: ${newInstructor}`);

                    // HASHING PASSWORD
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newInstructor.password, salt, (err, hash) => {
                            if (err) throw err;
                        
                            // SETTING PASSWORD TO HASH
                            newInstructor.password = hash;
                            // SAVING USER
                            newInstructor
                                .save()
                                .then((user) => {
                                    req.flash(
                                        "success_msg",
                                        "Registration succesfull, You can now log in"
                                    );
                                    console.log(`Reg successfull ${user}`);
                                    res.redirect("/auth/login");
                                })
                                .catch((err) => console.log(err));
                        })
                    );

                    // await newInstructor.save();
                    // console.log("Registration was Successfull", newInstructor);
                    // res.redirect("/auth/login");
                }
            })
        }
    },
    logout: (req, res) => {
        req.logOut();
        req.flash("success_msg", "You are logged out");
        res.redirect("/auth/login")
    },
    updateGet: (req, res) => {
        const pagetitle = "Profile";
        res.render("users/profile", {pagetitle});
    },
    updatePut: async (req, res) => {
        if(!req.body) {
            req.flash("error_msg", "Please fill in the form");
        } else {
            await Instructor.findOneAndUpdate(req.body, (err, data) => {
                if(err) {
                    return err;
                } else {
                    req.flash("success_msg", "Status Updated successfully");
                    console.log(`Updated ${data} successfully!`);
                    res.redirect("/user/profile");
                }
            })
        }
    }
}

// LOGOUT HANDLE

// router.get("/logout", (req, res) => {
//     req.logOut();
//     req.flash("success_msg", "You are logged out");
//     res.redirect("/users/login");
//   });