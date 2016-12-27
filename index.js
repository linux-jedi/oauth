var express = require('express');
var passport = require('passport');
var oauth2 = require('./oauth2');
var bodyParser = require('body-parser');

// Configure express
var app = express();
app.use(bodyParser.json());

// Configure passport
app.use(passport.initialize());
require('./auth');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Establish endpoints
app.post('/oauth/token', oauth2.token);

//app.post('/login');

// Restricted endpoints
app.get('/restricted', 
    passport.authenticate('bearer', {session: false}),
    function(req, res) {
        // Return information
        res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope });
    }
);

app.get("/hello", function(req, res) {
    res.send("Hello World");
});

app.listen(1337);