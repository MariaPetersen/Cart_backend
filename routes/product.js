const express = require('express');
const Product = require('../models/Product');
const auth = require('./../middleware/auth')
const router = express.Router();

const productCtrl = require('./../controllers/product');

router.put('/api/product', auth, productCtrl.addOneProduct)
router.put('/api/product/modify', auth, productCtrl.updateProductQuantity)
router.delete('/api/product', auth, productCtrl.deleteOneProduct)

module.exports = router; 