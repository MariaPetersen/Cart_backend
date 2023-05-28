const jwt = require('jsonwebtoken');

const KEY = process.env.RANDOM_KEY

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'KEJHKJlkfjsdklfjskldklsq78749080jkfsdlkjfsè389809')
        const cartId = decodedToken.cartId
        req.auth = {
            cartId: cartId
        }
        next()
    } catch (error) {
        res.status(401).json({ error })
    }
}