import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8} className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-4">Contact Us</h1>
          <p className="lead text-muted">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </Col>
      </Row>
      
      <Row>
        <Col lg={6} className="mb-4">
          <h3 className="mb-4">Get in Touch</h3>
          <div className="mb-4">
            <h5>📍 Address</h5>
            <p className="text-muted">123 Learning Street, Education City, EC 12345</p>
          </div>
          <div className="mb-4">
            <h5>📧 Email</h5>
            <p className="text-muted">support@eduplatform.com</p>
          </div>
          <div className="mb-4">
            <h5>📞 Phone</h5>
            <p className="text-muted">+1 (555) 123-4567</p>
          </div>
          <div>
            <h5>🕒 Business Hours</h5>
            <p className="text-muted">Monday - Friday: 9:00 AM - 6:00 PM</p>
          </div>
        </Col>
        
        <Col lg={6}>
          {submitted && (
            <Alert variant="success" className="mb-4">
              Thank you for your message! We'll get back to you soon.
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="w-100">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;