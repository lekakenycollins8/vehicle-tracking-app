const Vehicle = require('../models/Vehicle');
const Position = require('../models/Position');
const traccarService = require('../services/traccarService');
const { Op } = require('sequelize');
const axios = require('axios');


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
        const {
            name,
            uniqueId,
            status,
            disabled,
            lastUpdate,
            positionId,
            groupId,
            phone,
            model,
            contact,
            category,
            attributes
        } = req.body;

        // Validate required fields
        if (!name || !uniqueId || !status || !lastUpdate) {
            return res.status(400).json({
                message: 'Name, uniqueId, status, and lastUpdate are required'
            });
        }

        const vehicle = await Vehicle.create({
            name,
            uniqueId,
            status,
            disabled: disabled || false,
            lastUpdate: new Date(lastUpdate),
            positionId,
            groupId,
            phone,
            model,
            contact,
            category,
            attributes
        });

        const traccarResponse = await axios.post(`${process.env.TRACCAR_API_URL}/devices`, {
            name,
            uniqueId,
            status,
            model,
            contact
        }, {
            headers: {
                'Authorization': `${process.env.TRACCAR_API_TOKEN}`, 
                'Content-Type': 'application/json'
            }
        });

        if (traccarResponse.status === 201) {
            console.log('Device created in Traccar:', traccarResponse.data);
        } else {
            console.error('Failed to create device in Traccar:', traccarResponse.data);
        }

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

exports.deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        await vehicle.destroy();
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};