const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const {getProducts, getProduct, updateProduct, createProduct, deleteProduct} = require('../controllers/productController')


//get one product
router.get('/:id', getProduct)
//get all product
router.get("/", getProducts)
//create product
router.post('/', createProduct)
//update product
router.put('/:id', updateProduct)
//delete product
router.delete('/:id', deleteProduct)

module.exports = router;