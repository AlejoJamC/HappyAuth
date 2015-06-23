/**
 * Module dependencies
 */
var express = require('express');

// Create our express application
var app = express();

// Use our environment defined port or 7000
var port = process.env.PORT || 7000;

// Create our Express router
var router  = express.Router();


// http://localhost:3000/api
router.get('/', function(req, res) {
    res.json({ message: 'Your API is running!' });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('API on port ' + port);
