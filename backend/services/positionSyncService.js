const Vehicle = require('../models/Vehicle');
const Position = require('../models/Position');
const TraccarService = require('./traccarService');

class PositionSyncService {
    constructor() {
        this.traccarService = new TraccarService();
    }

    async syncVehiclePositions() {
        try {
            const vehicles = await Vehicle.findAll({
                where: { status: 'active' }
            });

            for (const vehicle of vehicles) {
                const positions = await this.traccarService.getPositions(vehicle.traccarDeviceId);
                if (positions && positions.length > 0) {
                    const latestPosition = positions[positions.length - 1];
                    
                    // Update vehicle's last position
                    await vehicle.update({
                        lastPosition: latestPosition
                    });

                    // Store position history
                    await Position.create({
                        vehicleId: vehicle.id,
                        latitude: latestPosition.latitude,
                        longitude: latestPosition.longitude,
                        speed: latestPosition.speed,
                        timestamp: latestPosition.deviceTime,
                        attributes: latestPosition.attributes
                    });
                }
            }
        } catch (error) {
            console.error('Position sync failed:', error);
        }
    }
}

module.exports = new PositionSyncService();