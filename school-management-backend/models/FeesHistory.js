const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  studentid: { type: String, required: true },  // Reference to the student
  feeType: { type: String, required: true },   // E.g., Tuition, Exam
  amount: { type: Number, required: true },    // Amount in currency
  paymentDate: { type: Date, required: true }, // Payment date
  remarks: { type: String }                    // Optional remarks
}, { timestamps: true });

module.exports = mongoose.model('Fee', feeSchema);
