import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ show, onHide, type, onSwitch }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateSignup = () => {
        if (name.length < 2) {
            toast.error('Name must be at least 2 characters');
            return false;
        }
        if (!email.includes('@') || !email.includes('.')) {
            toast.error('Please enter a valid email address');
            return false;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Welcome back! 🎉');
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                onHide();
                
                // Check if there's a redirect URL saved
                const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
                if (redirectUrl) {
                    sessionStorage.removeItem('redirectAfterLogin');
                    navigate(redirectUrl);
                } else {
                    navigate('/dashboard');
                }
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (error) {
            toast.error('Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateSignup()) return;
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Account created successfully! 🎉');
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                onHide();
                
                // Check if there's a redirect URL saved
                const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
                if (redirectUrl) {
                    sessionStorage.removeItem('redirectAfterLogin');
                    navigate(redirectUrl);
                } else {
                    navigate('/dashboard');
                }
            } else {
                toast.error(data.message || 'Signup failed');
            }
        } catch (error) {
            toast.error('Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
            dialogClassName="auth-modal"
        >
            <Modal.Header className="border-0 pb-0 position-relative">
                <button
                    onClick={onHide}
                    style={{
                        position: 'absolute',
                        right: '15px',
                        top: '15px',
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: '#999',
                        transition: 'color 0.3s',
                        zIndex: 10
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#333'}
                    onMouseLeave={(e) => e.target.style.color = '#999'}
                >
                    ✕
                </button>
            </Modal.Header>

            <Modal.Body className="pt-0 px-4 pb-4">
                <div className="text-center mb-4">
                    <h2 className="fw-bold">
                        {type === 'login' ? 'Log in or create account' : 'Create your account'}
                    </h2>
                    <p className="text-muted">
                        {type === 'login' 
                            ? 'Learn on your own time from top universities and businesses.'
                            : 'Join our global community of learners'
                        }
                    </p>
                </div>

                {type === 'login' ? (
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Email</Form.Label>
                            <div className="position-relative">
                                <FaEnvelope className="position-absolute" style={{ top: '12px', left: '12px', color: '#aaa' }} />
                                <Form.Control
                                    type="email"
                                    placeholder="name@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{ paddingLeft: '35px' }}
                                    className="py-2"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Password</Form.Label>
                            <div className="position-relative">
                                <FaLock className="position-absolute" style={{ top: '12px', left: '12px', color: '#aaa' }} />
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{ paddingLeft: '35px' }}
                                    className="py-2"
                                />
                                <Button
                                    variant="link"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '8px', top: '8px', color: '#aaa', textDecoration: 'none' }}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </div>
                        </Form.Group>

                        <Button type="submit" disabled={loading} className="w-100 py-2 mb-4" variant="primary">
                            {loading ? 'Logging in...' : 'Continue'}
                        </Button>
                    </Form>
                ) : (
                    <Form onSubmit={handleSignup}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Full Name</Form.Label>
                            <div className="position-relative">
                                <FaUser className="position-absolute" style={{ top: '12px', left: '12px', color: '#aaa' }} />
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    style={{ paddingLeft: '35px' }}
                                    className="py-2"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Email</Form.Label>
                            <div className="position-relative">
                                <FaEnvelope className="position-absolute" style={{ top: '12px', left: '12px', color: '#aaa' }} />
                                <Form.Control
                                    type="email"
                                    placeholder="name@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{ paddingLeft: '35px' }}
                                    className="py-2"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Password</Form.Label>
                            <div className="position-relative">
                                <FaLock className="position-absolute" style={{ top: '12px', left: '12px', color: '#aaa' }} />
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a password (min 6 characters)"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{ paddingLeft: '35px' }}
                                    className="py-2"
                                />
                                <Button
                                    variant="link"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '8px', top: '8px', color: '#aaa', textDecoration: 'none' }}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold">Confirm Password</Form.Label>
                            <div className="position-relative">
                                <FaLock className="position-absolute" style={{ top: '12px', left: '12px', color: '#aaa' }} />
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    style={{ paddingLeft: '35px' }}
                                    className="py-2"
                                />
                            </div>
                        </Form.Group>

                        <Button type="submit" disabled={loading} className="w-100 py-2 mb-4" variant="primary">
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </Form>
                )}

                <div className="text-center my-3">
                    <span className="text-muted">or</span>
                </div>

                <Button variant="outline-secondary" className="w-100 py-2 mb-2 d-flex align-items-center justify-content-center gap-2">
                    <FaGoogle /> Continue with Google
                </Button>
                <Button variant="outline-secondary" className="w-100 py-2 mb-2 d-flex align-items-center justify-content-center gap-2">
                    <FaFacebook /> Continue with Facebook
                </Button>
                <Button variant="outline-secondary" className="w-100 py-2 mb-4 d-flex align-items-center justify-content-center gap-2">
                    <FaApple /> Continue with Apple
                </Button>

                <hr className="my-3" />

                <div className="text-center">
                    <p className="text-muted small">
                        {type === 'login' ? (
                            <>Don't have an account?{' '}
                            <button onClick={() => onSwitch('signup')} className="text-primary fw-bold text-decoration-none" style={{ background: 'none', border: 'none' }}>
                                Sign up now
                            </button></>
                        ) : (
                            <>Already have an account?{' '}
                            <button onClick={() => onSwitch('login')} className="text-primary fw-bold text-decoration-none" style={{ background: 'none', border: 'none' }}>
                                Log in here
                            </button></>
                        )}
                    </p>
                    <p className="text-muted small mt-2">
                        By continuing, you agree to our Terms of Use and Privacy Notice.
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AuthModal;