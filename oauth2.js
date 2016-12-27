var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto'); // May offload this to models or db helper function
var models = require('./models');

// Create oauth2 server
var server = oauth2orize.createServer();


// Establish some way to serialize/deserialize client
// client <-> clientId
server.serializeClient(function(client, done) {
    return done(null, 1024);
});

server.deserializeClient(function(id, done) {
    return done(null, {client: "caleb"});
});

/**
 * Register supported grant types
 * password - client, username, password
 * refresh token
 */

server.exchange(oauth2orize.exchange.password( function(client, username, password, scope, done) {
    // Validate client
    // then Validate user
    // then Return token
    done(null, {token:"tokenValue"});
}));

// authorization endpoint is not needed

// User does not need to make a decision

//Token endpoint
exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password', {session: false}]),
    server.token(),
    server.errorHandler()
];