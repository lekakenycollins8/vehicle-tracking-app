const { Sequelize } = require('sequelize');
require('dotenv').config();

// Encode special characters in the password
const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);

// Connection string
const connectionString = `mysql://${process.env.DB_USER}:${encodedPassword}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Create a new instance of Sequelize
const sequelize = new Sequelize(connectionString, {
    dialect: 'mysql', // Set dialect to MySQL
    logging: false,   // Disable logging; set to true for debug
});

// Database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

sequelize
    .sync({ force: true, alter: true })
    .then(() => {
        console.log('Database synchronized successfully.');
        // Add your application logic here (e.g., starting the server)
    })
    .catch((error) => {
        console.error('Error synchronizing database:', error);
    });


module.exports = sequelize;