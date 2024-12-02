const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Import the database connection
const sequelize = require('./config/db');

// Import the routes
const apiRoutes = require('./routes/api');
const positionSyncService = require('./services/positionSyncService');

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Initialize position sync service
const SYNC_INTERVAL = 30000; // 30 seconds
setInterval(() => {
    positionSyncService.syncVehiclePositions();
}, SYNC_INTERVAL);

// Server connection
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});