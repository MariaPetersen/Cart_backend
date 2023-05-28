const Cart = require('../models/Cart')
const Product = require('./../models/Product')
const uuid = require('uuid')

/**
 * Expects request to contain:
 * {name: String,
 * price: Number,
 * quantity: Number}
**/

exports.addOneProduct = (req, res, next) => {
    const cartId = req.auth.cartId
    const product = new Product({
        cartId: cartId,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    })
    product.save()
        .then(() => res.status(200).json({ message: "Produit ajouté" }))
        .catch((error) => res.status(400).json({ error }))
}

exports.deleteOneProduct = (req, res, next) => {
    Product.deleteOne({ name: req.body.name, cartId: req.auth.cartId })
        .then(() => res.status(200).json({ message: "Produit supprimé" }))
        .catch((error) => res.status(400).json({ error }))
}

exports.updateProductQuantity = (req, res, next) => {
    Product.findOne({ name: req.body.name, cartId: req.auth.cartId })
        .then((product) => {
            product.quantity = req.body.quantity
            product.save()
                .then(() => res.status(200).json({ message: "Quantity pas mise à jour" }))
                .catch((error) => res.status(400).json({ error }))
        })
        .catch((error) => res.status(401).json({ error }))
}

exports.orderProducts = async (req, res, next) => {
    Product.find({ cartId: req.auth.cartId })
        .then((products) => {
            console.log(req.auth.cartId)
            const orderId = uuid.v1();
            Cart.findById(req.auth.cartId)
                .then((cart) => {
                    const bill = cart.bill
                    res.status(200).json({ products: products, orderId: orderId, bill: bill })
                })

        })
        .catch(error => { res.status(400).json({ error }) })
};