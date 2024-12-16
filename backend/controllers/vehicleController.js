const Vehicle = require('../models/Vehicle');
const Position = require('../models/Position');
const TraccarService = require('../services/traccarService');
const traccarService = new TraccarService();
const { Op } = require('sequelize');
const axios = require('axios');

// Helper function to verify vehicle ownership
const verifyVehicleOwnership = async (vehicleId, userId) => {
    const vehicle = await Vehicle.findOne({ 
        where: { 
            id: vehicleId,
            userId: userId 
        }
    });
    if (!vehicle) {
        throw new Error('Vehicle not found or access denied');
    }
    return vehicle;
};

exports.getAllVehicles = async (req, res) => {
    try {
        console.log('User ID:', req.user.id);
        const vehicles = await Vehicle.findAll({ 
            where: { userId: req.user.id },
            attributes: { exclude: ['traccarDeviceId'] } // Don't expose internal IDs
        });
        console.log('Retrieved vehicles:', vehicles);
        res.json({
            status: 'success',
            data: vehicles
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: 'Failed to fetch vehicles'
        });
    }
};

exports.getVehiclePositions = async (req, res) => {
    try {
        const { deviceId } = req.params;
        // Verify ownership before fetching positions
        await verifyVehicleOwnership(deviceId, req.user.id);
        
        const positions = await traccarService.getPositions(deviceId);
        res.json({
            status: 'success',
            data: positions
        });
    } catch (error) {
        const status = error.message.includes('access denied') ? 403 : 500;
        res.status(status).json({ 
            status: 'error',
            message: error.message === 'Vehicle not found or access denied' 
                ? error.message 
                : 'Failed to fetch vehicle positions'
        });
    }
};

exports.getVehicleEvents = async (req, res) => {
    try {
        const { deviceId } = req.params;
        const { from, to } = req.query;
        const events = await traccarService.getEvents(deviceId, from, to);
        res.json({
            status: 'success',
            data: events
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: 'Failed to fetch vehicle events'
        });
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

        res.json({
            status: 'success',
            data: positions
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: 'Failed to fetch vehicle history'
        });
    }
};


exports.createVehicle = async (req, res) => {
    const { name, uniqueId, category, attributes } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!name || !uniqueId || !userId) {
        return res.status(400).json({ 
            status: 'error',
            message: 'Name, uniqueId, and userId are required.'
        });
    }

    let vehicle;

    try {

        // Check if the vehicle already exists
        const existingDevice = await traccarService.getDeviceByUniqueId(uniqueId, userId);

        if (existingDevice) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Vehicle already exists'
            });
        }
        // Create the vehicle with the associated userId and other fields
        const vehicle = await Vehicle.create({
            name,
            uniqueId,
            userId, // Associate the vehicle with the user
            category, // Optional field
            attributes // Optional field, can be JSON
        });

        // Register the device with Traccar API
        const traccarDevice = await traccarService.createDevice({
            name,
            uniqueId,
            status: 'active', // Default status
            attributes
        });

        // Link traccar deviceId to the vehicle

        vehicle.traccarDeviceId = traccarDevice.id;
        await vehicle.save();

        res.status(201).json({
            status: 'success',
            data: vehicle
        });
    } catch (error) {
        console.error('Error creating vehicle:', error);
        console.error('Input data:', { name, uniqueId, category, attributes });
        // Rollback the vehicle creation if it fails
        if (vehicle) {
            await vehicle.destroy();
        }
        res.status(500).json({ 
            status: 'error',
            message: 'Vehicle creation failed'
        });
    }
};

exports.getVehicleById = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await Vehicle.findByPk(id);
        
        if (!vehicle) {
            return res.status(404).json({ 
                status: 'error',
                message: 'Vehicle not found'
            });
        }
        
        res.json({
            status: 'success',
            data: vehicle
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: 'Failed to fetch vehicle'
        });
    }
};

exports.updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        const vehicle = await verifyVehicleOwnership(id, req.user.id);
        
        // Validate status if provided
        if (status && !['active', 'inactive'].includes(status)) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Status must be either active or inactive' 
            });
        }

        await vehicle.update({
            ...(name && { name }),
            ...(status && { status })
        });

        // Update the device with Traccar API
        await traccarService.updateDevice(vehicle.uniqueId, {
            name,
            status
        });

        res.json({
            status: 'success',
            data: vehicle
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: 'Failed to update vehicle'
        });
    }
};

exports.deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await verifyVehicleOwnership(id, req.user.id);
        
        await vehicle.destroy();
        res.status(204).json({
            status: 'success',
            message: 'Vehicle deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            message: 'Failed to delete vehicle'
        });
    }
};