const localStrategy = require("passport-local").Strategy;
const mongooose = require("mongoose");
const bcrypt = require("bcryptjs");
const {Instructor} = require("../models/instructorsModel");
const {Admin} = require("../models/adminsModel");

module.exports = function (passport) {
  passport.use("instructor",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, done) => {
        // MATCH  INSTRUCTOR
        Instructor.findOne({ email: email })
          .then((instructor) => {
            if (!instructor) {
              return done(null, false, {
                message: "That email is not registered",
              });
            }

            // MATCH PASSWORD
            bcrypt.compare(password, instructor.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, instructor);
              } else {
                return done(null, false, { message: "Password incorrect" });
              }
            });
          })
          .catch((err) => console.log(err));
      }
    )
  );

  passport.use("admin", 
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      // match admin

      Admin.findOne({email: email})
      .then((admin) => {
        if(!admin) {
          return done(null, false, {
            message: "This admin does not exist",
          });
        }

        // matching password
        bcrypt.compare(password, admin.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, admin);
          } else {
            return done(null, false, { message: "Password Incorrect" });
          }
        });
      })
      .catch((err) => console.log(err));
    }
  ))

  // SERIALIZE AND DESERIALIZE  INSTRUCTOR
  passport.serializeUser((instructor, done) => {
    done(null, instructor.id);
  });

  passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, admin) => {
      if (err) return done(err);
      if(admin) return done(null, admin);
      Instructor.findById(id, (err, instructor) => {
        done(err, instructor);
      })
    })
  })

  // deserializer
  // passport.deserializeUser((id, done) => {
  //   Instructor.findById(id, (err, instructor) => {
  //     done(err, instructor);
  //   });
  // });
};
