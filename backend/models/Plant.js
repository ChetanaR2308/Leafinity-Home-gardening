const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
  description: { type: String },
  image: { type: String }
});

module.exports = mongoose.model('Plant', plantSchema);
