const express = require('express');
const Consultation = require('../models/Consultation');
const router = express.Router();

// Get all consultations
router.get('/', async (req, res) => {
  try {
    const consultations = await Consultation.find();
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a consultation by ID
router.get('/:id', async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) return res.status(404).json({ message: 'Consultation not found' });
    res.json(consultation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new consultation
router.post('/', async (req, res) => {
  const { title, description, date, user } = req.body;

  if (!title || !description || !date || !user || !user.name || !user.email) {
    return res.status(400).json({ message: 'Title, Description, Date, and User (name & email) are required.' });
  }

  const consultation = new Consultation({ title, description, date, user });
  try {
    const savedConsultation = await consultation.save();
    res.status(201).json(savedConsultation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a consultation by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedConsultation = await Consultation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedConsultation) return res.status(404).json({ message: 'Consultation not found' });
    res.json(updatedConsultation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a consultation by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedConsultation = await Consultation.findByIdAndDelete(req.params.id);
    if (!deletedConsultation) return res.status(404).json({ message: 'Consultation not found' });
    res.json({ message: 'Consultation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
