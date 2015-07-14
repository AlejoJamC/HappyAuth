/**
 * Module dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var routes = require('./routes/routes');
var logger = require('./config/logger');
// TODO: Enviar la configuracion de conexion a base de datos a un archivo de configuracion
var mongoose = require('mongoose');

// Development packages
var ejs = require('ejs');

// Choose the environment of work
var environment = 'devLocal';
logger.info('Chose the work environment: ' + environment);
var config = require('./config/environment.json')[environment];
logger.info('API version: ' + config.version);
mongoose.connect('mongodb://localhost:27017/' + config.nosqlDatabase);
logger.info('Connecting to MongoDB server, database: ' + config.nosqlDataBase);

// Mongoose connection logger
var con = mongoose.connection;
con.once('open', function () {
    logger.info('Connected to MongoDB successfully!');
});

// Create our express application
var app = express();

// Using body-parser in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Set header 'X-Powered-By'
logger.info('API powered by: HappyAuth - @AlejoJamC');
app.use(function (req, res, next) {
    res.set('X-Powered-By', 'HappyAuth - @AlejoJamC');
    next();
});

// Use the passport package in our application
app.use(passport.initialize());

// Development - Set view engine to ejs
app.set('view engine', 'ejs');

// Use express session support since OAuth2orize requires it
app.use(session({
    secret : 'super secret session hey',
    resave : true,
    saveuninitialized : true
}));

// ROUTER
// Create our Express router
var router = express.Router();

// Setup all routes on express router
routes.setupRouter(router);

// Use our environment defined port or value on our config file /config/environment.json
var port = process.env.PORT || config.port;

// Register all our routes with a prefix: /api or /v1
// This poject is created to be hosted in a subdomain dedicated to authentication and authorization
// Example of an URL with the prefix: auth.happyauth.com/v0
app.use(config.version, router);

// Start the server
app.listen(port);
// TODO: evitar o arreglar el mensaje de "express-session deprecated"
logger.info('API running on http://localhost:' + port + config.version + '/');
