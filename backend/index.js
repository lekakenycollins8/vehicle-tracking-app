const express = require('express');
const app = express();

// Import the database connection
const sequelize = require('./config/db');

// Server connection

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));