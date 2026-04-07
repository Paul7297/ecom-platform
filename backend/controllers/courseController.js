const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User'); // ADD THIS - need User model

const toClient = (doc) => {
  const o = doc.toObject ? doc.toObject() : doc;
  const { _id, __v, ...rest } = o;
  return {
    ...rest,
    id: _id.toString(),
    modules: (rest.modules || []).map((m, i) => ({
      id: m.id ?? i + 1,
      title: m.title,
      duration: m.duration,
    })),
  };
};

exports.getCourses = async (req, res, next) => {
  try {
    const list = await Course.find().sort({ createdAt: 1 }).exec();
    res.json(list.map((c) => toClient(c)));
  } catch (err) {
    next(err);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const course = await Course.findById(id).exec();
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(toClient(course));
  } catch (err) {
    next(err);
  }
};

// ADD THESE NEW FUNCTIONS:

// @desc    Enroll in a course
// @route   POST /api/courses/enroll
// @access  Private
exports.enrollCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    // Validate courseId
    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    // Check if course exists
    const course = await Course.findById(courseId).exec();
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user already enrolled
    const user = await User.findById(userId).exec();
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Add course to user's enrolled courses
    user.enrolledCourses.push(courseId);
    await user.save();

    // Increment student count in course
    course.students = (course.students || 0) + 1;
    await course.save();

    res.status(200).json({ 
      success: true, 
      message: 'Successfully enrolled in course',
      enrollment: {
        courseId: courseId,
        userId: userId,
        enrolledAt: new Date()
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Check if user is enrolled in a course
// @route   GET /api/courses/:id/enrolled
// @access  Private
exports.checkEnrollment = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const userId = req.user._id;

    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ isEnrolled: false });
    }

    const user = await User.findById(userId).exec();
    const isEnrolled = user.enrolledCourses.includes(courseId);

    res.json({ isEnrolled });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user's enrolled courses
// @route   GET /api/users/enrollments
// @access  Private
exports.getUserEnrollments = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('enrolledCourses').exec();
    
    res.json({ 
      success: true, 
      enrollments: user.enrolledCourses 
    });
  } catch (err) {
    next(err);
  }
};