const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const { seedCoursesIfEmpty } = require('./utils/seedCourses');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const { protect } = require('./middleware/authMiddleware'); // ADD THIS
const User = require('./models/User'); // ADD THIS

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/products', productRoutes);

// User enrollments route (separate from courses)
app.get('/api/users/enrollments', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('enrolledCourses').exec();
    res.json({ enrollments: user.enrolledCourses });
  } catch (err) {
    next(err);
  }
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB();
    await seedCoursesIfEmpty();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`CORS allowed origin: ${CLIENT_URL}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

start();