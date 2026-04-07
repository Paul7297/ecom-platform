import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    color: 'white'
  };

  return (
    <div style={heroStyle}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
            {/* Welcome Badge */}
            <div className="mb-4">
              <span style={{
                display: 'inline-block',
                padding: '8px 20px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50px',
                fontSize: '0.9rem'
              }}>
                🚀 Welcome to EduPlatform
              </span>
            </div>

            {/* Main Heading */}
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '800',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              Learn <span style={{
                background: 'linear-gradient(135deg, #FFD89B, #C7E9FB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Anything</span>,<br />
              Anytime, <span style={{
                background: 'linear-gradient(135deg, #FFD89B, #C7E9FB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Anywhere</span>
            </h1>

            {/* Description */}
            <p style={{
              fontSize: 'clamp(1rem, 3vw, 1.1rem)',
              lineHeight: '1.6',
              marginBottom: '2rem',
              opacity: '0.95'
            }}>
              Join <strong>10,000+</strong> students mastering new skills with our expert-led courses.
              Get certified and advance your career.
            </p>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '2.5rem',
              justifyContent: 'center',
              // justifyContent: 'flex-start'
            }} className="justify-content-center justify-content-lg-start">
              <Button 
                as={Link} 
                to="/courses" 
                style={{
                  background: 'white',
                  border: 'none',
                  color: '#667eea',
                  fontWeight: '600',
                  padding: '12px 32px',
                  borderRadius: '50px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Browse Courses →
              </Button>
              
              <Button 
                as={Link} 
                to="/about" 
                variant="outline-light"
                style={{
                  background: 'transparent',
                  border: '2px solid white',
                  color: 'white',
                  fontWeight: '600',
                  padding: '12px 32px',
                  borderRadius: '50px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#667eea';
                  e.target.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
              // justifyContent: 'flex-start'
            }} className="justify-content-center justify-content-lg-start">
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800' }}>10K+</div>
                <div style={{ fontSize: '0.85rem', opacity: '0.9' }}>Active Students</div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800' }}>50+</div>
                <div style={{ fontSize: '0.85rem', opacity: '0.9' }}>Expert Courses</div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800' }}>98%</div>
                <div style={{ fontSize: '0.85rem', opacity: '0.9' }}>Success Rate</div>
              </div>
            </div>
          </Col>

          <Col lg={6} className="text-center">
            <div style={{
              position: 'relative',
              animation: 'float 3s ease-in-out infinite'
            }}>
              <img 
                src="https://cdn-icons-png.flaticon.com/512/1995/1995572.png"
                alt="Learning illustration"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Add animation styles */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
    </div>
  );
};

export default Hero;