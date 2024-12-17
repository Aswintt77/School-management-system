const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  studentid: { type: String, required: true },
  bookName: { type: String, required: true },
  borrowDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  status: { type: String, required: true, enum: ['borrowed', 'returned'] },
}, { timestamps: true });

module.exports = mongoose.model('Library', librarySchema);
