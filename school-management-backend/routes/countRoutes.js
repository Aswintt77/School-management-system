const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff')
const Student = require('../models/Student');
const Librarian = require('../models/LibraryHistory');

// Route to get staff count
router.get('/staff', async (req, res) => {
  try {
    const staffCount = await Staff.countDocuments();
    res.json({ count: staffCount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch staff count' });
  }
});

// Route to get student count
router.get('/students', async (req, res) => {
  try {
    const studentCount = await Student.countDocuments();
    res.json({ count: studentCount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch student count' });
  }
});

// Route to get librarian count
router.get('/librarians', async (req, res) => {
  try {
    const librarianCount = await Librarian.countDocuments();
    res.json({ count: librarianCount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch librarian count' });
  }
});

module.exports = router;
