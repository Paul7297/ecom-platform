const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../middleware/authValidation');

console.log('🔥 authRoutes.js is LOADED!');  // ← ADD THIS LINE

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Auth routes working!' });
});

// Login route
router.post('/login', loginValidation, login);

// Signup route
router.post('/signup', signupValidation, signup);

module.exports = router;