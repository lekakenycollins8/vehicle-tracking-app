const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

//Vehicle Routes
router.get('/devices', vehicleController.getAllVehicles);
router.get('/positions/:deviceId', vehicleController.getVehiclePositions);
router.get('/events/:deviceId', vehicleController.getVehicleEvents);

module.exports = router;