const express = require('express');
const { getCourses, getCourseById } = require('../controllers/courseController');

const router = express.Router();

router.get('/courses', getCourses);
router.get('/courses/:id', getCourseById);

module.exports = router;
