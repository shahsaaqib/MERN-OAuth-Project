const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  term: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  resultsCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Search', searchSchema);
