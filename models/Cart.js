const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    products: [{
        productId: {
            type: ObjectID,
            ref: 'Product',
            required: true
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('Cart', cartSchema)

