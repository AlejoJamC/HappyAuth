var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name : String,
    lastName : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
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

// Execute before each user.save() call
userSchema.pre('save', function (callback) {
    var user = this;

    // Break out if the password hasn't changed
    if(!user.isModified('password')) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(10, function(err, salt) {
        if(err) return callback(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if(err) return callback(err);
            user.password = hash;
            callback();
        });
    });
});

// Verification methods
userSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if(err){
            return callback(err);
        }
        callback(null, isMatch);
    });
};


// Export the mongoose model
module.exports = mongoose.model('Users', userSchema);