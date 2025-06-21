const express = require('express');
const Exchange = require('../models/Exchange');
const router = express.Router();

// Get all exchange items
router.get('/', async (req, res) => {
  try {
    const items = await Exchange.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get an exchange item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Exchange.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item); // Return the full item, including user info
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new exchange item
router.post('/', async (req, res) => {
  const { title, variety, type, quantity, description, interested, location, user, email, phone } = req.body;

  if (!title || !variety) {
    return res.status(400).json({ message: 'Both "Title" and "Variety" are required.' });
  }

  const item = new Exchange({
    title, variety, type, quantity, description, interested, location, user, email, phone
  });

  try {
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an exchange item by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Exchange.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an exchange item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Exchange.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
