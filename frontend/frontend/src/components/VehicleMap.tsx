import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { Vehicle, Position } from '../types/vehicle';
import 'leaflet/dist/leaflet.css';

const VehicleMap: React.FC<{ selectedVehicle: Vehicle | null }> = ({ selectedVehicle }) => {
    const [positions, setPositions] = useState<Position[]>([]);
    const defaultPosition: [number, number] = [0, 0];

    useEffect(() => {
        const fetchPositions = async () => {
            if (selectedVehicle) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/positions/${selectedVehicle.traccarDeviceId}`);
                    setPositions(response.data);
                } catch (error) {
                    console.error('Error fetching positions:', error);
                }
            }
        };

        const interval = setInterval(fetchPositions, 30000); // Fetch every 30 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, [selectedVehicle]);

    const currentPosition = selectedVehicle?.lastPosition 
        ? [selectedVehicle.lastPosition.latitude, selectedVehicle.lastPosition.longitude]
        : defaultPosition;

    return (
        <MapContainer center={currentPosition as [number, number]} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {selectedVehicle?.lastPosition && (
                <Marker position={currentPosition as [number, number]}>
                    <Popup>
                        <div>
                            <h3>{selectedVehicle.name}</h3>
                            <p>Speed: {selectedVehicle.lastPosition.speed} km/h</p>
                            <p>Last Updated: {new Date(selectedVehicle.lastPosition.deviceTime).toLocaleString()}</p>
                        </div>
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default VehicleMap;