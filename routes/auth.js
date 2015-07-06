// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

// Load required models
var Users = require('../models/users');
var Client = require('../models/clients');
var Token = require('../models/tokens');

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

passport.use('client-basic', new BasicStrategy(
    function (email, password, callback) {
        Client.findOne({ id: email}, function (err, client) {
            // Check for errors and send a message
            if(err){
                callback(err);
            }

            //No client found with that id or bad password
            if(!client || client.secret != password){
                return callback(null, false);
            }

            // Success
            return callback(null, client);
        });
    }
));

passport.use(new BearerStrategy(
    function (accessToken, callback) {
        Token.findOne({ value : accessToken }, function (err, token) {
            // Check for errors and send a message
            if(err){
                callback(err);
            }

            // No token found
            if(!toke){
                return callback(null, false);
            }

            user.findOne({ _id : token.idUser }, function (err, user) {
                // Check for errors and send a message
                if(err){
                    callback(err);
                }

                // No user found
                if(!user){
                    return callback(null, false);
                }

                // simple example with no scope
                // TODO: verificar el alcance de la respuesta de la BearerStrategy
                callback(null, user, { scope : '*' });
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false});
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false});
exports.isBearerAuthenticated = passport.authenticate('bearer', { session : false});