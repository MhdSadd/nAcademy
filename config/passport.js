const LocalStrategy = require('passport-local').Strategy;
// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//user model
const Instructor = require("../models/instructorsModel");

//passport setting up
module.exports = function(passport){
    passport.use(new LocalStrategy({
        usernameField:'email',
        passReqToCallback: true
    }, async(req,email,password,done) =>{
        await Instructor.findOne({email:email}).then(async instructor => {
            if(!instructor){
                return done(null, false, {message: 'email not registered'});
            }
            await bcrypt.compare(password, instructor.password, function(err, isMatch){
                if(err){
                    return err;
                }
                if(!isMatch){
                    return done(null, false, {message: 'Wrong password'});
                }
                return done(null, user, console.log('You are logged in'));
            })
        }).catch(err =>{console.log(err)});
    } ));
    
    //seiallize user
    passport.serializeUser(function(user, done){
        done(null, user.id)
    });
    
    //deseiallize user
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err,user);
        });
    });
}

