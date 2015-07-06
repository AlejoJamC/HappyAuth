// Load required packages
var Users = require('../models/users');

// ENDPOINT: /users METHOD: POST
exports.postUsers = function (req, res, next) {
    var user = new Users();

    // Asigned parameters to the model varaible
    user.name = req.body.name;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    // TODO: implementar el resto de los campos
    user.enabled = true;

    // Save the new user record
    user.save(function (err) {
        // Check for errors and send a message
        if(err){
            res.status(500).send('Error: Saving a new user -> ' + err);
        }
        // Once saved new user send a message and all info of the user
        res.json({ message: 'New user added to HappyAuth', data: user});
    });
};

// ENDPOINT: /users METHOD: GET
exports.getUsers = function (req, res) {
    Users.find(function (err, users) {
        // Check for errors and send a message
        if(err){
            res.status(500).send('Error: Listing all users -> ' + err);
        }
        res.json(users);
    });
};

// ENDPOINT: /users/:id METHOD: GET
exports.getUserById = function (req, res) {
    Users.findById(req.params.id, function (err, user) {
        // Check for errors and send a message
        if(err){
            res.status(500).send('Error: showing an user -> ' + err);
        }
        res.json(user);
    });
};