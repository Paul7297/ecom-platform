const { body, validationResult } = require('express-validator');

const validateSignup = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .trim()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  
  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    
    // LOG VALIDATION RESULTS
    console.log('🔍 Validation Results:');
    console.log('Request body:', req.body);
    
    if (!errors.isEmpty()) {
      console.log('❌ Validation Failed:', errors.array());
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }
    
    console.log('✅ Validation Passed!');
    next();
  }
];

module.exports = { validateSignup };