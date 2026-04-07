import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge, ListGroup, Alert, Spinner } from 'react-bootstrap';
import { useCourseContext } from '../context/CourseContext';
import { api } from '../services/api';
import { toast } from 'react-toastify';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, enrollCourse, enrolledCourses } = useCourseContext();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [enrolled, setEnrolled] = useState(false);
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setLoadError('');
      try {
        let found = courses.find((c) => String(c.id) === String(id));
        if (!found && id) {
          found = await api.getCourseById(id);
        }
        if (!cancelled) {
          setCourse(found || null);
          if (token) {
            setEnrolled(Boolean(enrolledCourses.find((c) => String(c.id) === String(id))));
          }
        }
      } catch (e) {
        if (!cancelled) {
          setLoadError(e.message || 'Could not load course');
          setCourse(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id, courses, enrolledCourses, token]);

  const handleEnroll = () => {
    // Check if user is logged in
    if (!token) {
      // Save the course URL for redirect after login
      sessionStorage.setItem('redirectAfterLogin', `/course/${id}`);
      // Show toast message to login
      toast.info('Please login first to enroll in this course');
      return;
    }
    
    // User is logged in, proceed with enrollment
    enrollCourse(course);
    setEnrolled(true);
    toast.success(`Successfully enrolled in ${course.title}!`);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading course details...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">
          <Alert.Heading>Something went wrong</Alert.Heading>
          <p>{loadError}</p>
          <Button onClick={() => navigate('/courses')} variant="primary">
            Browse Courses
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">
          <Alert.Heading>Course not found</Alert.Heading>
          <p>The course you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/courses')} variant="primary">
            Browse Courses
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col lg={8}>
          <h1 className="display-5 fw-bold mb-3">{course.title}</h1>
          <p className="lead text-muted mb-4">{course.description}</p>

          <div className="mb-4">
            <Badge
              bg={
                course.level === 'Beginner'
                  ? 'success'
                  : course.level === 'Intermediate'
                    ? 'warning'
                    : 'danger'
              }
              className="me-2"
            >
              {course.level}
            </Badge>
            <Badge bg="info" className="me-2">
              ⭐ {course.rating} Rating
            </Badge>
            <Badge bg="secondary">{course.students} Students</Badge>
          </div>

          <Card className="mb-4">
            <Card.Header as="h5">Course Curriculum</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {course.modules?.map((module, index) => (
                  <ListGroup.Item key={module.id ?? index} className="d-flex justify-content-between">
                    <span>{module.title}</span>
                    <span className="text-muted">{module.duration}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
            <Card.Img
              variant="top"
              src={course.thumbnail || 'https://via.placeholder.com/400x300'}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
              <div className="mb-3">
                <span className="display-4 fw-bold text-primary">${course.price}</span>
                {course.originalPrice && (
                  <span className="text-muted text-decoration-line-through ms-2">${course.originalPrice}</span>
                )}
              </div>

              <Button
                variant={enrolled ? 'success' : 'primary'}
                size="lg"
                className="w-100 mb-3"
                onClick={handleEnroll}
                disabled={enrolled}
              >
                {enrolled ? '✓ Enrolled' : 'Enroll Now'}
              </Button>

              {!token && (
                <Alert variant="info" className="text-center small py-2">
                  🔐 Please login to enroll in this course
                </Alert>
              )}

              <hr />

              <div className="mb-2">
                <strong>👨‍🏫 Instructor:</strong> {course.instructor}
              </div>
              <div className="mb-2">
                <strong>⏱️ Duration:</strong> {course.duration}
              </div>
              <div className="mb-2">
                <strong>📚 Modules:</strong> {course.modules?.length || 0}
              </div>
              <div>
                <strong>👥 Students enrolled:</strong> {course.students}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetails;