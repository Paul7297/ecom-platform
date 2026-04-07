const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        console.log('📝 Signup attempt:', { name, email });
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: 'User already exists with this email', 
                success: false 
            });
        }
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new user with hashed password
        const newUser = await User.create({ 
            name, 
            email, 
            password: hashedPassword 
        });
        
        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );
        
        res.status(201).json({ 
            message: 'User created successfully', 
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            token, 
            success: true 
        });
        
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            message: "Internal server error", 
            success: false,
            error: error.message 
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('🔐 Login attempt:', { email });
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid email or password', 
                success: false 
            });
        }
        
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: 'Invalid email or password', 
                success: false 
            });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );
        
        res.status(200).json({ 
            message: 'Login successful', 
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token, 
            success: true 
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
}

module.exports = { signup, login };