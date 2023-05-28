const express = require('express');
const Product = require('../models/Product');
const auth = require('./../middleware/auth')
const router = express.Router();

const productCtrl = require('./../controllers/product');

router.post('/api/products', auth, productCtrl.addOneProduct)
router.delete('/api/products', auth, productCtrl.deleteOneProduct)
router.put('/api/products', auth, productCtrl.updateProductQuantity)
router.post('/api/products/order', auth, productCtrl.orderProducts);

module.exports = router; 