const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const reportsController = require('../controllers/reportsController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Vehicle Routes (protected)
router.use(authMiddleware); // Apply the middleware to protect routes
router.get('/devices', vehicleController.getAllVehicles);
router.get('/positions/:deviceId', vehicleController.getVehiclePositions);
router.get('/events/:deviceId', vehicleController.getVehicleEvents);

// Vehicle management
router.post('/devices', vehicleController.createVehicle);
router.get('/devices/:id', vehicleController.getVehicleById);
router.put('/devices/:id', vehicleController.updateVehicle);

// Position history
router.get('/devices/:id/history', vehicleController.getVehicleHistory);

//vehicle reports
router.get('/alerts', reportsController.getVehicleAlerts);
router.get('/trips', reportsController.getVehicleTrips);

module.exports = router;