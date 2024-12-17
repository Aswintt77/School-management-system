const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentid: { type: String, required: true, unique: true }, // Unique ID for the student
  name: { type: String, required: true }, // Name of the student
  Class: { type: String, required: true }, // Class the student belongs to
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true }, // Gender of the student
  address: { type: String, required: true }, // Address of the student
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
