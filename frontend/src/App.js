import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CourseProvider } from './context/CourseContext';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import About from './components/About';
import Contact from './components/Contact';
import Features from './components/Features';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Protected Route component - redirects to home and opens modal
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Save the location they were trying to access
    sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <CourseProvider>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Layout>
          <Routes>
            {/* Public Routes - Anyone can access */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/features" element={<Features />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            
            {/* Protected Routes - Require login */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </CourseProvider>
    </Router>
  );
}

export default App;