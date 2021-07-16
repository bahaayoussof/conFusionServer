const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var leaderSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    image: {
        type: String,
        requierd: true
    },
    designation: {
        type: String,
        default: ''
    },
    abbr: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        requierd: true
    },
    featured: {
        type: Boolean,
        default: false
    }
});

var Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;