// Load required package
var Client  = require('../models/clients');

// ENDPOINT: /clients METHOD: POST
exports.postClients = function (req, res) {
    // Create a new instance of the Client model
    var client = new Client();

    // Set the client properties that came from the POST data
    client.name = req.body.name;
    client.id = req.body.id;
    client.secret = req.body.secret;
    client.idUser = req.user._id;

    // Save the client and check for errors
    client.save(function (err) {
        if(err){
            res.status(500).send('Error: Saving a new client -> ' + err);
        }
        // Success
        res.json({ message : 'Client added to happyAuth', data: client});
    });
};

// ENDPOINT: /clients METHOD: GET
exports.getClients = function (req, res) {
    // Use the Client model to find all clients
    Client.find({idUser: req.user._id}, function (err, clients) {
        if(err){
            res.status(500).send('Error: Listing all clients -> ' + err);
        }
        // Success
        res.json(clients);
    });
};

// TODO: terminar los verbos GET (by id), PUT, PATCH, DELETE
// ENDPOINT: /client/:id METHOD: GET