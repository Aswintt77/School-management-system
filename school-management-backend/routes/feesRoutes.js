const express = require('express');
const Fee = require('../models/FeesHistory');  // Ensure this path is correct
const { protect } = require('../middleware/authMiddleware'); 
const router = express.Router();

// Create Fee
router.post('/', protect, async (req, res) => {
  const { studentid, feeType, amount, paymentDate, remarks } = req.body;
  try {
    const newFee = await Fee.create({ studentid, feeType, amount, paymentDate, remarks });
    res.status(201).json(newFee);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get All Fees
router.get('/', protect, async (req, res) => {
  try {
    const fees = await Fee.find();
    res.status(200).json(fees);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update Fee
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedFee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFee) return res.status(404).send('Fee not found');
    res.status(200).json(updatedFee);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete Fee
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedFee = await Fee.findByIdAndDelete(req.params.id);
    if (!deletedFee) return res.status(404).send('Fee not found');
    res.status(200).json({ message: 'Fee deleted successfully' });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
