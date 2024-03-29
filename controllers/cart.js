const Cart = require("../models/Cart")
const Product = require("./../models/Product")
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET
/**
 * Expects request to contain:
 * {bill: Number}
**/

exports.createCart = (req, res, next) => {
    const cart = new Cart({
        bill: req.body.bill
    })
    cart.save()
        .then(() => {
            res.status(201).json({
                cartId: cart._id,
                token: jwt.sign(
                    { cartId: cart._id },
                    `${JWT_SECRET}`,
                    { expiresIn: '24h' })
            })
        })
        .catch(error => res.status(400).json({ error }))
}

exports.updateCart = (req, res, next) => {
    Cart.findById(req.auth.cartId)
        .then((cart) => {
            cart.bill = req.body.bill
            cart.save()
                .then(() => res.status(201).json({ message: "Panier mis à jour" }))
                .catch(error => res.status(400).json({ error }))
        })
}