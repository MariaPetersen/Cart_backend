const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    bill: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('Cart', cartSchema)

