import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import CustomButton from '../common/CustomButton';
import AuthModal from '../common/AuthModal';
import { toast } from 'react-toastify';

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('login');
  const navigate = useNavigate();
  const location = useLocation();
  
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Check for redirect after login
  useEffect(() => {
    const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
    if (token && redirectUrl) {
      sessionStorage.removeItem('redirectAfterLogin');
      navigate(redirectUrl);
    }
  }, [token, navigate]);

  const handleAuthClick = (type) => {
    // Save current location for redirect after login
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    setAuthType(type);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="text-primary fw-bold fs-3">
            Skillsverse
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
              <Nav.Link as={Link} to="/features">Features</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
            
            <div className="d-flex gap-2">
              {token ? (
                <>
                  <span className="text-muted">Welcome, {user.name || 'User'}!</span>
                  <CustomButton variant="outline" onClick={handleLogout} size="sm">
                    Logout
                  </CustomButton>
                </>
              ) : (
                <>
                  <CustomButton variant="outline" onClick={() => handleAuthClick('login')} size="sm">
                    Login
                  </CustomButton>
                  <CustomButton variant="primary" onClick={() => handleAuthClick('signup')} size="sm">
                    Sign Up
                  </CustomButton>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AuthModal 
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        type={authType}
        onSwitch={(type) => setAuthType(type)}
      />
    </>
  );
};

export default Header;