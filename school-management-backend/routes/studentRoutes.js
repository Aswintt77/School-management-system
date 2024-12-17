const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const Student = require('../models/Student');  
const router = express.Router();

// Create Student (Admin only)
router.post('/', protect, async (req, res) => {
  const { studentid, name, Class, gender, address } = req.body;

  try {
    const newStudent = await Student.create({ studentid, name, Class, gender, address });
    res.status(201).json(newStudent);  // Returning the newly created student
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get All Students
router.get('/', protect, async (req, res) => {
  try {
    const studentList = await Student.find();
    res.status(200).json(studentList);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get Single Student by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update Student (Admin only)
router.put('/:id', protect, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Student (Admin only)
router.delete('/:id', protect,  async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
