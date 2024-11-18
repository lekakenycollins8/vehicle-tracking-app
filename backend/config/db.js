const { Sequelize } = require('sequelize');
require('dotenv').config();

// Encode special characters in the password

const encodedPassword = encodeURIComponent(process.env.SUPABASE_DB_PASSWORD);

// Connection string

const connectionString = `postgres://${process.env.SUPABASE_DB_USER}:${encodedPassword}@${process.env.SUPABASE_DB_HOST}:${process.env.SUPABASE_DB_PORT}/${process.env.SUPABASE_DB_NAME}`;

// Create a new instance of Sequelize

const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
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

sequelize.sync({force: false, alter:true})
    .then(() => {
        console.log('Models synchronized successfully.');
    })
    .catch((error) => {
        console.error('Unable to synchronize models:', error);
    });

module.exports = sequelize;