const sequelize = require('../config/db');
const User = require('./User');
const Vehicle = require('./Vehicle');
const Position = require('./Position');

// Initialize associations
User.hasMany(Vehicle, {
    foreignKey: 'userId',
    as: 'vehicles',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Vehicle.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Vehicle.hasMany(Position, {
    foreignKey: 'vehicleId',
    as: 'positions',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Position.belongsTo(Vehicle, {
    foreignKey: 'vehicleId',
    as: 'vehicle',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

module.exports = {
    sequelize,
    User,
    Vehicle,
    Position,
};