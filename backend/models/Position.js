const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Vehicle = require('./Vehicle');

const Position = sequelize.define('Position', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    vehicleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Vehicle,
            key: 'id'
        }
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false
    },
    speed: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },
    attributes: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

module.exports = Position;