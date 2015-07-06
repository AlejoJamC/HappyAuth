/**
 * Module dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
// TODO: Enviar la configuracion de conexion a base de datos a un archivo de configuracion
var mongoose = require('mongoose');

// Choose the environment of work
var environment = 'devLocal';
var config = require('./config/environment.json')[environment];
mongoose.connect('mongodb://localhost:27017/' + config.nosqlDatabase);

// Create our express application
var app = express();

// Using body-parser in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

/**
 * ROUTER
 */
// Create our Express router
var router  = express.Router();

// Declare all routes
var userRoutes = require('./routes/users');
var authRoutes = require('./routes/auth');
var clientRoutes = require('./routes/clients');

// -----------------------------------
//Create endpoints handlers for /users
// /users
router.route('/users')
    .post(userRoutes.postUsers)
    .get(authRoutes.isAuthenticated, userRoutes.getUsers);
// /users/:id
router.route('/users/:id')
    .get(authRoutes.isAuthenticated, userRoutes.getUserById);
// -----------------------------------

// -----------------------------------
//Create endpoints handlers for /clients
// /users
router.route('/clients')
    .post(authRoutes.isAuthenticated, clientRoutes.postClients)
    .get(authRoutes.isAuthenticated, clientRoutes.getClients);
// /users/:id
// -----------------------------------
/**
 * ===============================================
 */

// Use our environment defined port or value on our config file /config/environment.json
var port = process.env.PORT || config.port;

// Register all our routes with a prefix: /api or /v1
// This poject is created to be hosted in a subdomain dedicated to authentication and authorization
// Example of an URL with the prefix: auth.happyauth.com/v0
app.use(config.version, router);

// Start the server
app.listen(port);
console.log('API running on http://localhost:' + port + config.version + '/');
