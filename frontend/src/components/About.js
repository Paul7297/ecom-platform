import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8} className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-4">About Us</h1>
          <p className="lead text-muted">
            We're on a mission to provide quality education to everyone, everywhere.
          </p>
        </Col>
      </Row>
      
      <Row className="mb-5">
        <Col lg={6} className="mb-4">
          <h3>Our Story</h3>
          <p className="text-muted">
            Founded in 2024, EduPlatform started with a simple idea: make quality education accessible to everyone. 
            We believe that learning should be engaging, practical, and available to all who have the desire to grow.
          </p>
          <p className="text-muted">
            Today, we've helped over 10,000 students worldwide achieve their learning goals through our comprehensive 
            courses taught by industry experts.
          </p>
        </Col>
        <Col lg={6}>
          <h3>Our Mission</h3>
          <p className="text-muted">
            To empower individuals with the skills and knowledge they need to succeed in their careers and personal 
            lives. We're committed to providing high-quality, practical education that transforms lives.
          </p>
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col md={4} className="mb-4">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <div className="display-1 text-primary">10K+</div>
              <Card.Title>Students</Card.Title>
              <Card.Text className="text-muted">Happy learners worldwide</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <div className="display-1 text-primary">50+</div>
              <Card.Title>Courses</Card.Title>
              <Card.Text className="text-muted">Expert-led courses</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <div className="display-1 text-primary">20+</div>
              <Card.Title>Instructors</Card.Title>
              <Card.Text className="text-muted">Industry professionals</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;