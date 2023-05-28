const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    cartId: { type: mongoose.ObjectId, required: true, ref: 'Cart' },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
})

module.exports = mongoose.model('Product', productSchema)
