const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Import the database connection
const sequelize = require('./config/db');

// Import the routes
const apiRoutes = require('./routes/api');

// Middleware
app.use(cors());
app.use(express.json());

// Server connection

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));