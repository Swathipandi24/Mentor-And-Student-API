const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

// Create a student
const createStudent = async (req, res) => {
  const { name, email } = req.body;
  try {
    const student = new Student({ name, email });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign or change mentor for a student
const assignOrChangeMentor = async (req, res) => {
  const { studentId } = req.params;
  const { mentorId } = req.body;
  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    student.mentor = mentorId;
    await student.save();
    res.status(200).json({ message: "Mentor assigned/changed for student", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the previously assigned mentor for a student
const getPreviousMentor = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId).populate('mentor');
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student.mentor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createStudent, assignOrChangeMentor, getPreviousMentor };
