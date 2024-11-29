const Vehicle = require('../models/Vehicle');
const traccarService = require('../services/traccarService');

exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVehiclePositions = async (req, res) => {
    try {
        const { deviceId } = req.params;
        const positions = await traccarService.getPositions(deviceId);
        res.json(positions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVehicleEvents = async (req, res) => {
    try {
        const { deviceId } = req.params;
        const { from, to } = req.query;
        const events = await traccarService.getEvents(deviceId, from, to);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

// Get single vehicle by ID
exports.getVehicleById = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new vehicle
exports.createVehicle = async (req, res) => {
    try {
        const { name, traccarDeviceId } = req.body;
        const vehicle = await Vehicle.create({
            name,
            traccarDeviceId,
            status: 'active'
        });
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update vehicle
exports.updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        await vehicle.update({ name, status });
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};