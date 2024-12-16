const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validationMiddleware');
const { authLimiter } = require('../middleware/rateLimitMiddleware');

// Authentication routes with rate limiting and validation
router.post('/register', 
    authLimiter,
    validateRegistration, 
    authController.register
);

router.post('/login', 
    authLimiter,
    validateLogin, 
    authController.login
);

router.post('/refresh-token', 
    authController.refreshToken
);

router.post('/logout', 
    authController.logout
);

module.exports = router;
