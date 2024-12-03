const traccarService = require('../services/traccarService');

exports.getVehicleAlerts = async (req, res) => {
    const { deviceId, from, to} = req.query;

    if (!deviceId || !from || !to) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
        const alerts = await traccarService.getReportSummary(deviceId, from, to);
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVehicleTrips = async (req, res) => {
    const { deviceId, from, to } = req.query;

    if (!deviceId || !from || !to) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
        const trips = await traccarService.getReportTrips(deviceId, from, to);
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};