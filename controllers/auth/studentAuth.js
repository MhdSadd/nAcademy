const mongoose  = require('mongoose')
const bcrypt = require("bcryptjs");
const randomString = require('randomstring')
const Student = require('../../models/user/students').Student

module.exports = {
  studentRegisterPost : (req, res, err) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log(req.body)
    let errors = [];
  
    // CHECKING REQUIRED FIELD
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ msg: "Please fill in all fields" });
    }
  
    // CHECKING PASSWORD MATCH
    if (password !== confirmPassword) {
      errors.push({ msg: "Passwords do not match" });
    }
  
    //CHECKING PASSWORD LENGHT
    if (password.length < 6) {
      errors.push({ msg: "Password must be atleast 6 Characters" });
    }
  
    if (errors.length > 0) {
      let pageTitle = "Register"
      res.render("auth/register", {
        errors,
        name,
        email,
        password,
        confirmPassword,
        pageTitle
      });
    } else {
      //  VALIDATION PASS
      Student.findOne({ email: email }).then((user) => {
        if (user) {
          //  USER EXIST
          errors.push({ msg: "Email is already registered" });
          let pageTitle = "Register"
          res.render("auth/register", {
            errors,
            name,
            email,
            password,
            confirmPassword,
            pageTitle
          });
        } else {
            const studentID = `nAcad-${ randomString.generate({
                length: 6,
                charset: 'numeric'
            })}`
          // CREATING A NEW USER INSTANCE
          const newStudent = new Student({
            name,
            email,
            password,
            courses:[],
            studentID
          });
  
          // HASHING PASSWORD
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newStudent.password, salt, (err, hash) => {
              if (err) throw err;
  
              // SETTING PASSWORD TO HASH
              newStudent.password = hash;
              // SAVING USER
              newStudent
                .save()
                .then((student) => {
                  req.flash(
                    "success_msg",
                    "Registration succesfull"
                  );
                  res.redirect("/");
                })
                .catch((err) => console.log(err));
            })
          );
        }
      });
    }
  }
  
  
}

