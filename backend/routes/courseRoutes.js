const express = require('express');
const { 
    getCourses, 
    getCourseById, 
    enrollCourse,           // ADD THIS
    checkEnrollment,        // ADD THIS
    getUserEnrollments      // ADD THIS
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware'); // ADD THIS

const router = express.Router();

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourseById);

// Protected routes (require authentication)
router.post('/enroll', protect, enrollCourse);
router.get('/:id/enrolled', protect, checkEnrollment);
router.get('/user/enrollments', protect, getUserEnrollments); // Note: put before /:id to avoid conflicts

module.exports = router;