import React, { createContext, useState, useContext } from 'react';
import { api } from '../services/api';

const CourseContext = createContext();

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within CourseProvider');
  }
  return context;
};

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load courses');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const enrollCourse = (course) => {
    if (!course) return;
    if (!enrolledCourses.find((c) => String(c.id) === String(course.id))) {
      setEnrolledCourses([...enrolledCourses, course]);
      console.log(`✅ Successfully enrolled in ${course.title}!`);
    } else {
      console.log(`⚠️ Already enrolled in ${course.title}`);
    }
  };

  const unenrollCourse = (courseId) => {
    setEnrolledCourses(enrolledCourses.filter((c) => String(c.id) !== String(courseId)));
    console.log('✅ Successfully unenrolled from the course!');
  };

  const value = {
    courses,
    enrolledCourses,
    loading,
    error,
    fetchCourses,
    enrollCourse,
    unenrollCourse,
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};
