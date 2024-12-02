const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authController = require('../controllers/authController');

// auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

//Vehicle Routes
router.get('/devices', vehicleController.getAllVehicles);
router.get('/positions/:deviceId', vehicleController.getVehiclePositions);
router.get('/events/:deviceId', vehicleController.getVehicleEvents);

// Vehicle management
router.post('/devices', vehicleController.createVehicle);
router.get('/devices/:id', vehicleController.getVehicleById);
router.put('/devices/:id', vehicleController.updateVehicle);

// Position history
router.get('/devices/:id/history', vehicleController.getVehicleHistory);

module.exports = router;