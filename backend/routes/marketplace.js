const express = require('express');
const Marketplace = require('../models/Marketplace');
const router = express.Router();

// Get all marketplace products
router.get('/', async (req, res) => {
  try {
    const products = await Marketplace.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a marketplace product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Marketplace.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new marketplace product
router.post('/', async (req, res) => {
  const product = new Marketplace(req.body);
  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a marketplace product by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Marketplace.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a marketplace product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Marketplace.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
