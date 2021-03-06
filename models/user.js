var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        require: true
    },
    facebookId: String,
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamp: true
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);