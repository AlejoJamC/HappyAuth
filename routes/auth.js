// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Users = require('../models/users');

passport.use(new BasicStrategy(
    function (email, password, callback) {
        Users.findOne({email : email}, function (err, user) {
            // Check for errors and send a message
            if(err){
                callback(err);
            }

            // No user found with that email
            if(!user){
                return callback(null, false);
            }

            // Make sure the password is correct
            user.verifyPassword(password, function (err, isMatch) {
                // Check for errors and send a message
                if(err){
                    callback(err);
                }

                // Password did not match
                if(!isMatch){
                    return callback(null, false);
                }

                // Success
                return callback(null, user);
            })
        });
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session: false});