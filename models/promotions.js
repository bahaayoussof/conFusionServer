const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var promoSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    }
    ,
    image: {
        type: String,
        requierd: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
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

var Promotions = mongoose.model('Promotion', promoSchema);

module.exports = Promotions;