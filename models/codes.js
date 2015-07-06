// Load required packages
var mongoose = require('mongoose');
// TODO: encriptar value que es el codigo de autorizacion
// Define our toke schema
var CodeSchema = new mongoose.Schema({
    value : {
        type : String,
        required : true
    },
    redirectUri : {
        type: String,
        required : true
    },
    idUser : {
        type : String,
        required : true
    },
    idClient : {
        type : String,
        required : true
    }
},{ versionKey: false });

// Exports the Mongoose model
module.exports = mongoose.model('Codes', CodeSchema);