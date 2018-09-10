var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    Fullname: { type: String },
    Identify: { type: String, default: '' },
    PhoneNumber: String,
    Address: String,
    Email: String,
    PictureUrl: String,
    DateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);