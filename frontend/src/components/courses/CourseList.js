import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import CourseCard from './CourseCard';

const CourseList = ({ courses, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading courses...</p>
      </div>
    );
  }

  return (
    <Container className="py-4">
      {/* Search and Filters */}
      <div className="bg-light p-4 rounded mb-4">
        <Row className="g-3">
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder="Search courses by title or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          
          <Col md={3}>
            <Form.Select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </Form.Select>
          </Col>
          
          <Col md={3}>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </Form.Select>
          </Col>
          
          <Col md={1}>
            <Button 
              variant="outline-secondary" 
              onClick={() => {
                setSearchTerm('');
                setSelectedLevel('All');
                setSortBy('popular');
              }}
              className="w-100"
            >
              Reset
            </Button>
          </Col>
        </Row>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-muted">Found {sortedCourses.length} courses</p>
      </div>

      {/* Course Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {sortedCourses.map(course => (
          <Col key={course.id}>
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>

      {/* Empty State */}
      {sortedCourses.length === 0 && (
        <Alert variant="info" className="text-center">
          <Alert.Heading>No courses found</Alert.Heading>
          <p>Try adjusting your search or filter criteria</p>
        </Alert>
      )}
    </Container>
  );
};

export default CourseList;