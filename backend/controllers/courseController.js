const mongoose = require('mongoose');
const Course = require('../models/Course');

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
