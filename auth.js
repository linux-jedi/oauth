var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var ClientPasswordStrategy  = require('passport-oauth2-client-password').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var models = require('./models');

/**
 * Used to distribute access tokens to users(clients?)
 */
passport.use(new BasicStrategy(
    function(username, password, done) {
        // First check if username and password are correct using postgres
        // Return client info or user info ?
        // Not sure how to remove all the client messiness from oauth2 for mobile
        return done(null, {auth: "basic"});
    }
));

/**
 * Possibly use client password strategey
 */
passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {
        return done(null, {auth: "client"});
    }
));

/**
 * Verifies that access token isn't bogus
 */
passport.use(new BearerStrategy(
    function(accessToken, done) {
        // Check if accessToken exists in the database and has not expired
        // Then check if it token belongs to a user or a client
        // return priveleges and client/user info
    }
));