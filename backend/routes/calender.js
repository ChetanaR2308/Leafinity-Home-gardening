const express = require('express');
const Calender = require('../models/Calender');
const router = express.Router();

// Get all calendar events
router.get('/', async (req, res) => {
  try {
    const events = await Calender.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a calendar event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Calender.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new calendar event
router.post('/', async (req, res) => {
  const event = new Calender(req.body);
  try {
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a calendar event by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Calender.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a calendar event by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Calender.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
