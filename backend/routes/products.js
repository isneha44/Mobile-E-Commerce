const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
});

// Read all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.status(200).send(products);
});

// Update a product
router.put('/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(product);
});

// Delete a product
router.delete('/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Product deleted' });
});

module.exports = router;
