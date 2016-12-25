var express = require('express');
var passport = require('passport');
var oauth2 = require('./oauth2');
var bodyParser = require('body-parser');

// Configure express
var app = express.createServer();
app.use(bodyParser.json());

// Configure passport
app.use(passport.initialize());
require('./auth');

// Establish endpoints
app.post('/oauth/token', oauth2.token);

app.post('/login');

// Restricted endpoints
app.get('/restricted', 
    passport.authenticate('bearer', {session: false}),
    function(req, res) {
        // Return information
        res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope });
    }
);

app.listen(1337);