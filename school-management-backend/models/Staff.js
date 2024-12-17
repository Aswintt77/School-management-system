const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const staffSchema = new mongoose.Schema({
    staffid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Staff', staffSchema);