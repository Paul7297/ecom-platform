import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto py-5">
      <Container>
        <Row>
          <Col md={3} className="mb-4">
            <h3 className="text-primary mb-3">EduPlatform</h3>
            <p className="text-white-50">Learn anything, anytime, anywhere.</p>
          </Col>
          <Col md={3} className="mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/courses" className="text-white-50 text-decoration-none">Courses</Link></li>
              <li><Link to="/about" className="text-white-50 text-decoration-none">About Us</Link></li>
              <li><Link to="/contact" className="text-white-50 text-decoration-none">Contact</Link></li>
            </ul>
          </Col>
          <Col md={3} className="mb-4">
            <h5 className="mb-3">Support</h5>
            <ul className="list-unstyled">
              <li><Link to="/faq" className="text-white-50 text-decoration-none">FAQ</Link></li>
              <li><Link to="/terms" className="text-white-50 text-decoration-none">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-white-50 text-decoration-none">Privacy Policy</Link></li>
            </ul>
          </Col>
          <Col md={3} className="mb-4">
            <h5 className="mb-3">Contact Info</h5>
            <ul className="list-unstyled text-white-50">
              <li>Email: support@eduplatform.com</li>
              <li>Phone: +1 234 567 890</li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-white-50" />
        <div className="text-center text-white-50">
          <p className="mb-0">&copy; 2026 EduPlatform. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;