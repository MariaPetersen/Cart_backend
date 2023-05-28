const Cart = require("../models/Cart")
const jwt = require('jsonwebtoken')


exports.createCart = (req, res, next) => {
    const cart = new Cart({
        products: req.body.products
    })
    console.log(cart)
    cart.save()
        .then(() => {
            console.log(cart._id)
            res.status(201).json({
                cartId: cart._id,
                token: jwt.sign(
                    { cartId: cart._id },
                    'KEJHKJlkfjsdklfjskldklsq78749080jkfsdlkjfsè389809',
                    { expiresIn: '24h' })
            })
        })
        .catch(error => res.status(400).json({ error }))
}
