const mongoose = require('mongoose');

const ExchangeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  variety: { type: String, required: true },
  type: { type: String },
  quantity: { type: String, required: true },
  description: { type: String, required: true },
  interested: { type: String },
  location: { type: String },
  user: { type: String },
  email: { type: String },
  phone: { type: String },
});

module.exports = mongoose.model('Exchange', ExchangeSchema);
