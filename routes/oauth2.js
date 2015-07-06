// Load required packages
var oauth2orize = require('oauth2orize');
var User = require('../models/users');
var Client = require('../models/clients');
var Token = require('../models/tokens');
var Code = require('../models/codes');

// Create OAuth 2.0 server
var server = oauth2orize.createServer();

// Register serialization and deserialization functions
// TODO: agregar la descripcion de estos metodos

// Register serialization functions
server.serializeClient(function (client, callback) {
    return callback(null, client._id);
});

// Register deserialization functions
server.deserializeClient(function (id, callback) {
    Client.findOne({ _id : id}, function (err, client) {
        if(err){
            return callback(err);
        }
        return callback(null, client);
    });
});

// Register authorization code grant type
server.grant(oauth2orize.grant.code(function (client, redirectUri, user, ares, callback) {
    // Create a new authorizatin code
    var code = new Code({
        value : uid(16),
        idClient : client._id,
        redirectUri : redirectUri,
        idUser : user._id
    });

    // Save the auth code and check for errors
    code.save(function (err) {
        if(err){
            return callback(err);
        }

        callback(null, code.value);
    });
}));

// Exchange authorization codes for access tokens
server.exchange(oauth2orize.exchange.code(function (client, code, redirectUri, callback) {
    Code.findOne({ value : code }, function (err, authCode) {
        if(err){
            return callback(err);
        }
        if(authCode === undefined){
            return callback(null, false);
        }
        if(client._id.toString() !== authCode.idClient){
            return callback(null, false);
        }
        if(redirectUri !== authCode.redirectUri){
            return callback(null, false);
        }

        // Delete auth code now that it has been used
        authCode.remove(function (err) {
            if(err){
                return callback(err);
            }

            // Create a new access token
            var token = new Token({
                value : uid(256),
                idClient : authCode.idClient,
                idUser : authCode.idUser
            });

            // Save the access token and check for errors
            token.save(function (err) {
                if(err){
                    return callback(err);
                }

                callback(null, token);
            });
        });

    });
}));

// User authorization endpoint
// ENDPOINT: /oauth2/authorize METHOD: GET
exports.authorization = [
    server.authorization(function (idClient, redirectUri, callback) {
        Client.findOne({ id : idClient }, function (err, client) {
            if(err){
                return callback(err);
            }

            return callback(null, client, redirectUri);
        });
    }),
    function (req, res) {
        res.render('dialog', {
            transactionID : req.oauth2.transactionID,
            user : req.user,
            client : req.oauth2.client
        })
    }
];

// User decision endpoint
// ENDPOINT: /oauth2/authorize METHOD: POST
exports.decision = [
    server.decision()
];

// Application client token exchange endpoint
// ENDPOINT: /oauth2/token METHOD: GET
exports.token = [
    server.token(),
    server.errorHandler()
];

/**
 * Return a unique identifier with given `len`.
 *
 *      utils.uid(10);
 *      // => "FDa5435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */
function uid (len){
    var buf = []
        , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        , charlen = chars.length;

    for(var i = 0; i < len; ++i){
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
};


/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};