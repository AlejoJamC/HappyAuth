// Load required packages
var mongoose = require('mongoose');
// TODO: encriptar el secret
// Define our client schema
var ClientSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },
    id: {
        type: String,
        required : true
    },
    secret : {
        type : String,
        required : true
    },
    idUser : {
        type : String,
        required : true
    }
},{ versionKey: false });

// Export the Mongoose model
module.exports = mongoose.model('Clients', ClientSchema);