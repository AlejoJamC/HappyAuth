/**
 * Module dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');
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

/**
 * ROUTER
 */
// Create our Express router
var router  = express.Router();

// http://localhost:3000/api
router.get('/', function(req, res) {
    res.json({ message: 'Your API is running!' });
});
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
