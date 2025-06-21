const express = require('express');
const Database = require('../models/Database');
const router = express.Router();

// Get all database entries
router.get('/', async (req, res) => {
  try {
    const entries = await Database.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a database entry by ID
router.get('/:id', async (req, res) => {
  try {
    const entry = await Database.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new database entry
router.post('/', async (req, res) => {
  const { name, value, description } = req.body;
  
  if (!name || !value) {
  return res.status(400).json({ message: 'Name and Value are required.' });
  }
  
  const entry = new Database({ name, value, description });
  try {
  const savedEntry = await entry.save();
  res.status(201).json(savedEntry);
  } catch (error) {
  res.status(400).json({ message: error.message });
  }
  });

// Update a database entry by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedEntry = await Database.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEntry) return res.status(404).json({ message: 'Entry not found' });
    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a database entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedEntry = await Database.findByIdAndDelete(req.params.id);
    if (!deletedEntry) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
