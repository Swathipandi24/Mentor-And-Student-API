const Mentor = require('../models/Mentor');
const Student = require('../models/Student');

// Create a Mentor
const createMentor = async (req, res) => {
  const { name, email } = req.body;
  try {
    const mentor = new Mentor({ name, email });
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign multiple students to a mentor
const assignStudents = async (req, res) => {
  const { mentorId } = req.params;
  const { studentIds } = req.body;
  try {
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    const students = await Student.find({ _id: { $in: studentIds }, mentor: null });
    students.forEach(student => student.mentor = mentorId);
    await Student.updateMany({ _id: { $in: studentIds } }, { mentor: mentorId });

    mentor.students.push(...studentIds);
    await mentor.save();

    res.status(200).json({ message: "Students assigned to mentor", mentor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all students for a particular mentor
const getStudentsByMentor = async (req, res) => {
  const { mentorId } = req.params;
  try {
    const mentor = await Mentor.findById(mentorId).populate('students');
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });
    res.status(200).json(mentor.students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createMentor, assignStudents, getStudentsByMentor };
