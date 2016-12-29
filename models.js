var Sequelize = require('sequelize');
var db = require('./config').db;

// Configure Sequelize
var sequelize = new Sequelize(db.database, db.user, db.password,{
    dialect: 'postgres',
    host: db.host
});

var Users = sequelize.define('user', {
    id: {type: Sequelize.UUID, primaryKey: true},
    username: Sequelize.TEXT,
    password: Sequelize.TEXT
});

var Tokens = sequelize.define('oauth_tokens', {
    id:  {type: Sequelize.UUID, primaryKey: true},
    access_token: Sequelize.TEXT,
    access_token_expires_on: Sequelize.DATE,
    client_id: Sequelize.TEXT,
    refresh_token: Sequelize.TEXT,
    refresh_token_expires_on: Sequelize.DATE,
    user_id: Sequelize.UUID
});

var Clients = sequelize.define('oauth_clients', {
    client_id: {type: Sequelize.TEXT, primaryKey: true},
    client_secret: {type: Sequelize.TEXT, primaryKey: true},
    redirect_url: Sequelize.TEXT
});

module.exports.Users = Users;
module.exports.Tokens = Tokens;
module.exports.Clients = Clients;
