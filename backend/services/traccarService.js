const axios = require('axios');
require('dotenv').config();

class TraccarService {
    constructor() {
        this.apiURL = process.env.TRACCAR_API_URL;
        this.apiToken = process.env.TRACCAR_API_TOKEN;
        this.client = axios.create({
            baseURL: this.apiURL,
            headers: {
                'Authorization': `Bearer ${this.apiToken}`,
                'Content-Type': 'application/json'
            }
        });
    }
    async getDevices() {
        try {
            const response = await this.client.get('/devices');
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch devices from Traccar API: ${error.message}`);
        }
    }

    async getPositions(deviceId) {
        try {
            const response = await this.client.get(`positions?deviceId=${deviceId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch positions from Traccar API: ${error.message}`);
        }
    }

    async getEvents(deviceId, from, to) {
        try {
            const response = await this.client.get('events', {
                params: {
                    deviceId,
                    from,
                    to
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch events from Traccar API: ${error.message}`);
        }
    }

    async getReportSummary(deviceId, from, to) {
        try {
            const response = await this.client.get('reports/summary', {
                params: {
                    deviceId,
                    from,
                    to
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch report summary from Traccar API: ${error.message}`);
        }
    }

    async getReportTrips(deviceId, from, to) {
        try {
            const response = await this.client.get('reports/trips', {
                params: {
                    deviceId,
                    from,
                    to
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch report trips from Traccar API: ${error.message}`);
        }
    }
}

module.exports = TraccarService;