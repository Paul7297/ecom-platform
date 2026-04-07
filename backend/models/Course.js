const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    duration: { type: String, required: true },
    level: { type: String, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    thumbnail: { type: String, default: 'https://via.placeholder.com/400x200' },
    popular: { type: Boolean, default: false },
    modules: [moduleSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
