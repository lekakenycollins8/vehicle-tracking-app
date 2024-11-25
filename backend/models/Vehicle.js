const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    traccarDeviceId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    lastPosition: {
        type: DataTypes.JSON, 
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'), 
        defaultValue: 'active',
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
});

module.exports = Vehicle;
