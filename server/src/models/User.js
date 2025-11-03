const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  provider: String,
  providerId: String,
  displayName: String,
  email: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
