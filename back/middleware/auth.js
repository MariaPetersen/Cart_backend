const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${JWT_SECRET}`,)
        const cartId = decodedToken.cartId
        req.auth = {
            cartId: cartId
        }
        next()
    } catch (error) {
        res.status(401).json({ error })
    }
}