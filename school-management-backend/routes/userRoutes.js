const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Staff = require('../models/Staff');
const generateToken = require('../utils/generateToken');

const router = express.Router();

// User Routes

// Register (Admin only)
router.post('/register', protect, adminOnly, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).send('Invalid credentials');
      
    }

    res.status(200).json({ token: generateToken(user), role: user.role ,username:user.username });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Staff CRUD Routes

// Create Staff (Admin only)
router.post('/staff', protect, async (req, res) => {
  const { staffid, name, role, phoneNumber, status,username,password } = req.body;
 console.log(req.body);
 
  try {
    const newStaff = await Staff.create({ staffid, name, role, phoneNumber, status });
    await User.create({username,password,role})
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get All Staff
router.get('/staff', protect, async (req, res) => {
  try {
    const staffList = await Staff.find();
    const filteredStaff =staffList.filter(staff => staff.role != 'admin');

    res.status(200).json(filteredStaff);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get Single Staff by ID
router.get('/staff/:id', protect, async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).send('Staff not found');
    }
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update Staff (Admin only)
router.put('/staff/:id', protect, async (req, res) => {
  const { id } = req.params; // The ID is passed as a parameter (should be _id from MongoDB)

  try {
    const updatedStaff = await Staff.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json(updatedStaff);  // Ensure you're returning the updated staff with _id
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Staff (Backend)
router.delete('/staff/:id', protect, async (req, res) => {
  const { id } = req.params; // The ID is passed as a parameter (should be _id from MongoDB)

  try {
    const deletedStaff = await Staff.findByIdAndDelete(id);

    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});




module.exports = router;
