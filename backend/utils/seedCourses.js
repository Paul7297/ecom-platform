const Course = require('../models/Course');

const seedData = [
  {
    title: 'React Mastery: From Zero to Hero',
    description:
      'Learn React.js from scratch and build real-world applications. This comprehensive course covers everything from React basics to advanced patterns and best practices.',
    instructor: 'John Doe',
    price: 49.99,
    originalPrice: 99.99,
    duration: '8 weeks',
    level: 'Intermediate',
    rating: 4.8,
    reviews: 1234,
    students: 5678,
    thumbnail: 'https://via.placeholder.com/400x200',
    popular: true,
    modules: [
      { title: 'Introduction to React', duration: '2 hours' },
      { title: 'Components & Props', duration: '3 hours' },
      { title: 'State Management', duration: '4 hours' },
      { title: 'Hooks Deep Dive', duration: '5 hours' },
    ],
  },
  {
    title: 'JavaScript: The Complete Guide',
    description:
      'Master JavaScript with practical projects and real-world applications. From fundamentals to advanced concepts like closures and async programming.',
    instructor: 'Jane Smith',
    price: 39.99,
    duration: '10 weeks',
    level: 'Beginner',
    rating: 4.9,
    reviews: 2345,
    students: 8901,
    thumbnail: 'https://via.placeholder.com/400x200',
    modules: [
      { title: 'JavaScript Basics', duration: '3 hours' },
      { title: 'Functions & Objects', duration: '4 hours' },
      { title: 'DOM Manipulation', duration: '3 hours' },
    ],
  },
  {
    title: 'Node.js & Express Backend Development',
    description:
      'Build scalable backend applications with Node.js and Express. Learn REST APIs, authentication, database integration, and deployment.',
    instructor: 'Mike Johnson',
    price: 59.99,
    duration: '12 weeks',
    level: 'Advanced',
    rating: 4.7,
    reviews: 876,
    students: 3456,
    thumbnail: 'https://via.placeholder.com/400x200',
    modules: [
      { title: 'Node.js Fundamentals', duration: '4 hours' },
      { title: 'Express Framework', duration: '5 hours' },
      { title: 'MongoDB Integration', duration: '4 hours' },
    ],
  },
  {
    title: 'Python for Data Science',
    description:
      'Learn Python programming and data science essentials. Master NumPy, Pandas, Matplotlib, and machine learning basics.',
    instructor: 'Sarah Williams',
    price: 54.99,
    duration: '10 weeks',
    level: 'Intermediate',
    rating: 4.8,
    reviews: 1543,
    students: 4321,
    thumbnail: 'https://via.placeholder.com/400x200',
    modules: [
      { title: 'Python Basics', duration: '3 hours' },
      { title: 'NumPy & Pandas', duration: '5 hours' },
      { title: 'Data Visualization', duration: '4 hours' },
    ],
  },
];

async function seedCoursesIfEmpty() {
  const count = await Course.countDocuments();
  if (count === 0) {
    await Course.insertMany(seedData);
    console.log('Seeded courses collection');
  }
}

module.exports = { seedCoursesIfEmpty };
