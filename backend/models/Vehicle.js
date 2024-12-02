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
    uniqueId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    lastUpdate: {
        type: DataTypes.DATE, 
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'), 
        defaultValue: 'active',
        allowNull: false
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    lastUpdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    positionId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    attributes: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

module.exports = Vehicle;
