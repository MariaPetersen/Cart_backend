const express = require('express');
const auth = require('./../middleware/auth')
const router = express.Router();

const cartCtrl = require('./../controllers/cart')

router.post('/api/cart', cartCtrl.createCart)
router.put('/api/cart', auth, cartCtrl.updateCart)

module.exports = router; 