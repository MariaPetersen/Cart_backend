const Cart = require('../models/Cart')
const Product = require('./../models/Product')

exports.addOneProduct = (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    })
    Cart.updateOne({ _id: req.auth.cartId }, {
        $push: { products: product }
    })
        .then(() => res.status(200).json({ message: "Produit ajouté" }))
        .catch((error) => res.status(400).json({ error }))
}

exports.updateProductQuantity = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id,
        { quantity: req.body.quantity })
        .then(() => res.status(200).json({ message: "Quantity mise à jour" }))
        .catch((error) => res.status(400).json({ error }))
}

exports.deleteOneProduct = (req, res, next) => {
    const filter = ({ _id: req.auth.cartId })
    Cart.updateOne(filter, {
        $pull: { products: { name: req.body.name } }
    })
        .then(() => res.status(200).json({ message: "Produit supprimé" }))
        .catch((error) => res.status(400).json({ error }))
}
