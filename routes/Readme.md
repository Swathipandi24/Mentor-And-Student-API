mentor-student-api
├── models
├── routes
├── .env
├── app.js
└── server.js
Use Postman to Test the APIs:

POST /api/mentors – Create a mentor.
POST /api/students – Create a student.
PUT /api/mentors/:mentorId/students – Assign students to a mentor.
PUT /api/students/:studentId/mentor – Assign or change mentor for a student.
GET /api/mentors/:mentorId/students – Get all students assigned to a mentor.
GET /api/students/:studentId/previous-mentor – Get previously assigned mentor for a student.
