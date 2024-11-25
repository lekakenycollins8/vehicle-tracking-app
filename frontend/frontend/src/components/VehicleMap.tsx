import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Vehicle, Position } from '../types/vehicle';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface VehicleMapProps {
  selectedVehicle: Vehicle | null;
}

const VehicleMap: React.FC<VehicleMapProps> = ({ selectedVehicle }) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const defaultPosition: [number, number] = [0, 0];

  useEffect(() => {
    if (selectedVehicle) {
      fetchVehiclePositions();
    }
  }, [selectedVehicle]);

  const fetchVehiclePositions = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/positions/${selectedVehicle?.traccarDeviceId}`
      );
      const data = await response.json();
      setPositions(data);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  const currentPosition = selectedVehicle?.lastPosition 
    ? [selectedVehicle.lastPosition.latitude, selectedVehicle.lastPosition.longitude]
    : defaultPosition;

  return (
    <MapContainer
      center={currentPosition as [number, number]}
      zoom={13}
      style={{ height: '500px', width: '100%' }}
    >
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