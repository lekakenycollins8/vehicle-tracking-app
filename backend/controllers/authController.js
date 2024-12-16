const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Helper function to generate tokens
const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        { id: userId }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
    
    const refreshToken = jwt.sign(
        { id: userId }, 
        process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: '7d' }
    );
    
    return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Email already registered' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ 
            name, 
            email, 
            password: hashedPassword 
        });

        const { accessToken, refreshToken } = generateTokens(user.id);

        // Save refresh token in database
        await user.update({ refreshToken });

        res.status(201).json({ 
            status: 'success',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: 'Registration failed'
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(401).json({ 
                status: 'error',
                message: 'Invalid credentials' 
            });
        }
        
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ 
                status: 'error',
                message: 'Invalid credentials'
            });
        }
        
        const { accessToken, refreshToken } = generateTokens(user.id);
        
        // Save refresh token in database
        await user.update({ refreshToken });

        res.json({ 
            status: 'success',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: 'Login failed'
        });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(401).json({ 
                status: 'error',
                message: 'Refresh token required' 
            });
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        
        // Find user with matching refresh token
        const user = await User.findOne({ 
            where: { 
                id: decoded.id,
                refreshToken 
            }
        });

        if (!user) {
            return res.status(401).json({ 
                status: 'error',
                message: 'Invalid refresh token' 
            });
        }

        // Generate new tokens
        const tokens = generateTokens(user.id);
        
        // Update refresh token in database
        await user.update({ refreshToken: tokens.refreshToken });

        res.json({ 
            status: 'success',
            data: tokens 
        });
    } catch (error) {
        res.status(401).json({ 
            status: 'error',
            message: 'Invalid refresh token'
        });
    }
};

exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        // Find user with refresh token and clear it
        await User.update(
            { refreshToken: null },
            { where: { refreshToken } }
        );

        res.json({ 
            status: 'success',
            message: 'Logged out successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: 'Logout failed'
        });
    }
};