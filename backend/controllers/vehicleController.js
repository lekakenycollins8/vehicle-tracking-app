const Vehicle = require('../models/Vehicle');
const Position = require('../models/Position');
const traccarService = require('../services/traccarService');
const { Op } = require('sequelize');


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

// get vehicle history

exports.getVehicleHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const { from, to } = req.query;

        const whereClause = {
            vehicleId: id
        };

        if (from && to) {
            whereClause.timestamp = {
                [Op.between]: [new Date(from), new Date(to)]
            };
        }

        const positions = await Position.findAll({
            where: whereClause,
            order: [['timestamp', 'DESC']],
            limit: 100 // Limit the number of results
        });

        res.json(positions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createVehicle = async (req, res) => {
    try {
        const { name, traccarDeviceId } = req.body;
        
        // Validate required fields
        if (!name || !traccarDeviceId) {
            return res.status(400).json({ 
                message: 'Name and traccarDeviceId are required' 
            });
        }

        // Check if device exists in Traccar
        const traccarService = new TraccarService();
        try {
            await traccarService.getPositions(traccarDeviceId);
        } catch (error) {
            return res.status(400).json({ 
                message: 'Invalid traccarDeviceId - device not found in Traccar' 
            });
        }

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

exports.updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;
        
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        // Validate status if provided
        if (status && !['active', 'inactive'].includes(status)) {
            return res.status(400).json({ 
                message: 'Status must be either active or inactive' 
            });
        }

        await vehicle.update({
            ...(name && { name }),
            ...(status && { status })
        });

        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};