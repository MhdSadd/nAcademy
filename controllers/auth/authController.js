const bcrypt = require("bcryptjs");
const passport = require("passport");
const {Instructor} = require("../../models/instructorsModel");

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
    registerPost: async (req, res) => {
        await Instructor.findOne({email: req.body.email})
        .then(async(instructor) => {
            if(instructor) {
                console.log("Sorry User already Exist ");
                return res.redirect("/auth/register");
            } else {
                const newInstructor = await new Instructor ({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: req.body.password,
                    confirmPassword: req.body.confirmPassword
                })

                console.log(`New instructor created: ${newInstructor}`)

                await newInstructor.save();
                console.log("Registration was Successfull", newInstructor);
                res.redirect("/auth/login");
            }
        })
        // const { name, email, phone, password, confirmPassword } = req.body;
        // let errors = [];
        
        // // Checking field are populated
        // if ( !name || !email || !phone || !password || !confirmPassword ) {
        //     errors.push({message: "All fields are required"})
        // }

        // // password matching 
        // if (password !== confirmPassword) {
        //     errors.push({message: "Passwords do not match"})
        // }

        // // lenght check
        // if (password.lenght < 4) {
        //     errors.push({msg: "Password must be at least 4 char"})
        // }

        // if (errors.length > 0) {
        //     res.render("auth/register", {
        //         errors, 
        //         name,
        //         email,
        //         phone,
        //         password,
        //         confirmPassword
        //     });
        // } else {

        // }
    }
}