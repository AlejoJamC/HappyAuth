var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    name : String,
    lastName : String,
    Password : String,
    salt : String,
    email : String,
    photo : String,
    birthday : Date,
    idCountry : Schema.Types.ObjectId,
    country : String,
    isoCountryCode : String,
    telephones : [{
        idCountryCodePhone : Schema.Types.ObjectId,
        CountryCodePhone : String,
        phone : String
    }],
    addresses : [
        {
            address : String,
            country : String,
            state : String,
            city : String,
            zip : String
        }
    ],
    enabled : Boolean
},{ versionKey: false });

module.exports = mongoose.model('Users', usersSchema);