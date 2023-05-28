const Cart = require('../models/Cart')
const Product = require('./../models/Product')

exports.addOneProduct = (req, res, next) => {
    const product = new Product({
        cartId: req.auth,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    })
    product.save()
        .then(() => res.status(200).json({ message: "Produit ajouté" }))
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

exports.updateProductQuantity = (req, res, next) => {
    let product = req.body

    Cart.updateOne({
        _id: req.auth.cartId,
        products: { name: { $in: req.body.name } }
    })
        .then(
            Product.updateOne({ name: req.body.name },
                { $set: { quantity: req.body.quantity } }
            )
                .then(() => res.status(200).json({ message: "Quantity mise à jour" }))
                .catch((error) => res.status(400).json({ error }))
        )
        .then(() => res.status(200).json({ message: "Quantity pas mise à jour" }))
        .catch((error) => res.status(400).json({ error }))
}