const localStrategy = require("passport-local").Strategy;
const mongooose = require("mongoose");
const bcrypt = require("bcryptjs");
const {Instructor} = require("../models/instructorsModel");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
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

  // SERIALIZE AND DESERIALIZE  INSTRUCTOR
  passport.serializeUser((instructor, done) => {
    done(null, instructor.id);
  });
  passport.deserializeUser((id, done) => {
    Instructor.findById(id, (err, instructor) => {
      done(err, instructor);
    });
  });
};
