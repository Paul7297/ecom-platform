const jwt = require('jsonwebtoken');

const ensureAuth = (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    console.log('🔐 Auth header:', authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false,
            message: "Unauthorized: No token provided" 
        });
    }
    
    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('✅ User authenticated:', req.user);
        next();
    } catch (error) {
        console.error('❌ Token verification failed:', error.message);
        return res.status(403).json({ 
            success: false,
            message: "Forbidden: Invalid or expired token" 
        });
    }
}

module.exports = ensureAuth;