const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Import the database connection
const sequelize = require('./config/db');

// Import the routes
const apiRoutes = require('./routes/api');
const positionSyncService = require('./services/positionSyncService');

// CORS configuration
const corsOptions = {
    origin: '*', // or specify your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Rest of your code remains the same...
