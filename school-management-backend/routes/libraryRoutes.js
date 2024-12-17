const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const Library = require('../models/LibraryHistory');

const router = express.Router();

// Create Library Record (Admin only)
router.post('/', protect, async (req, res) => {
  const { studentid, bookName, borrowDate, returnDate, status } = req.body;

  try {
    const newRecord = await Library.create({ studentid, bookName, borrowDate, returnDate, status });
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get All Library Records
router.get('/', protect, async (req, res) => {
  try {
    const records = await Library.find();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single Library Record by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const record = await Library.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Library Record (Admin only)
router.put('/:id', protect, async (req, res) => {
  const { id } = req.params;
  const { studentid, bookName, borrowDate, returnDate, status } = req.body;

  try {
    const updatedRecord = await Library.findByIdAndUpdate(
      id,
      { studentid, bookName, borrowDate, returnDate, status },
      { new: true } // Returns the updated document
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json(updatedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Library Record (Admin only)
router.delete('/:id', protect,  async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecord = await Library.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
