const express = require('express');
const { createStudent, assignOrChangeMentor, getPreviousMentor } = require('../controllers/studentController');
const router = express.Router();

router.post('/', createStudent);
router.put('/:studentId/mentor', assignOrChangeMentor);
router.get('/:studentId/previous-mentor', getPreviousMentor);

module.exports = router;
