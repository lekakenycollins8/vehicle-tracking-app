const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

//Vehicle Routes
router.get('/devices', vehicleController.getAllVehicles);
router.get('/positions/:deviceId', vehicleController.getVehiclePositions);
router.get('/events/:deviceId', vehicleController.getVehicleEvents);

// Vehicle management
router.post('/vehicles', vehicleController.createVehicle);
router.get('/vehicles/:id', vehicleController.getVehicleById);
router.put('/vehicles/:id', vehicleController.updateVehicle);

// Position history
router.get('/vehicles/:id/history', vehicleController.getVehicleHistory);

module.exports = router;