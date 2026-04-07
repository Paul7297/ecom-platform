const joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(2).required().messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters'
        }),
        email: joi.string().email().required().messages({
            'string.email': 'Please provide a valid email',
            'string.empty': 'Email is required'
        }),
        password: joi.string().min(6).required().messages({
            'string.min': 'Password must be at least 6 characters',
            'string.empty': 'Password is required'
        })
    });
    
    const { error } = schema.validate(req.body);
    if (error) {
        console.log('Validation error:', error.details[0].message);
        return res.status(400).json({ 
            success: false, 
            message: error.details[0].message 
        });
    }
    next();
}

const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required().messages({
            'string.email': 'Please provide a valid email',
            'string.empty': 'Email is required'
        }),
        password: joi.string().required().messages({
            'string.empty': 'Password is required'
        })
    });
    
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            success: false, 
            message: error.details[0].message 
        });
    }
    next();
}

module.exports = { signupValidation, loginValidation };