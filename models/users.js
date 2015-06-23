var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({

}, { versionKey: false });

module.exports = mongoose.model('Users', usersSchema);