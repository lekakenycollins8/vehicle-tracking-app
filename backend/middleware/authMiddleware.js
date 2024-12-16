const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ 
            status: 'error',
            message: 'Authentication required'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check token expiration
        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({
                status: 'error',
                message: 'Token has expired'
            });
        }

        // Add user data to request
        req.user = {
            id: decoded.id,
            role: decoded.role,
            email: decoded.email
        };
        
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid authentication token'
        });
    }
};

module.exports = authMiddleware;