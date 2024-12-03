import React, { useEffect, useState } from 'react';
import { Card, message } from 'antd';
import axios from 'axios';

const VehicleDetails: React.FC<{ vehicleId: string }> = ({ vehicleId }) => {
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/devices/${vehicleId}`);
                setVehicle(response.data);
            } catch (error) {
                message.error('Failed to fetch vehicle details: ' + error.response.data.message);
            }
        };
        fetchVehicle();
    }, [vehicleId]);

    if (!vehicle) return <div>Loading...</div>;

    return (
        <Card title={vehicle.name}>
            <p>Unique ID: {vehicle.uniqueId}</p>
            <p>Status: {vehicle.status}</p>
            <p>Last Updated: {new Date(vehicle.lastUpdate).toLocaleString()}</p>
        </Card>
    );
};

export default VehicleDetails;