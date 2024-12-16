const rateLimit = require('express-rate-limit');

// Create different limiters for different routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: {
        status: 'error',
        message: 'Too many login attempts. Please try again later.'
    }
});

const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        status: 'error',
        message: 'Too many requests. Please try again later.'
    }
});

module.exports = {
    authLimiter,
    apiLimiter
};
