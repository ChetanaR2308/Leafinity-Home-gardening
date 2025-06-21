const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, enum: ['virtual', 'inPerson'], default: 'virtual' }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Consultation', ConsultationSchema);
