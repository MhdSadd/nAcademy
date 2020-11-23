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
        // MATCH USER
        Instructor.findOne({ email: email })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "That email is not registered",
              });
            }

            // MATCH PASSWORD
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Password incorrect" });
              }
            });
          })
          .catch((err) => console.log(err));
      }
    )
  );

  // SERIALIZE AND DESERIALIZE USER
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    Instructor.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
