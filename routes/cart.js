const express = require('express');
const router = express.Router();

const cartCtrl = require('./../controllers/cart')

router.post('/api/cart', cartCtrl.createCart)

module.exports = router; 