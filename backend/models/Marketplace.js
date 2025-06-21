const mongoose = require('mongoose');

const MarketplaceSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  seller: { type: String, required: true },
  dateListed: { type: Date, default: Date.now },
  status: { type: String, default: 'available' }
});

module.exports = mongoose.model('Marketplace', MarketplaceSchema);
