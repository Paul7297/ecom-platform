import React, { useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useCourseContext } from '../context/CourseContext';
import CourseList from '../components/courses/CourseList';

const Courses = () => {
  const { courses, loading, error, fetchCourses } = useCourseContext();

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div>
      <div className="bg-primary text-white py-5">
        <Container className="text-center">
          <h1 className="display-4 fw-bold mb-3">Our Courses</h1>
          <p className="lead">
            Choose from our wide range of professional courses designed to help you succeed
          </p>
        </Container>
      </div>
      {error && (
        <Container className="pt-3">
          <Alert variant="danger">{error}</Alert>
        </Container>
      )}
      <CourseList courses={courses} loading={loading} />
    </div>
  );
};

export default Courses;