import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, Spin } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Vehicle, Position } from '../types/vehicle';
import 'leaflet/dist/leaflet.css';
import './styles/VehicleMap.css';

interface VehicleMapProps {
  selectedVehicle: Vehicle | null;
}

const VehicleMap: React.FC<VehicleMapProps> = ({ selectedVehicle }) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const defaultPosition: [number, number] = [0, 0];

  useEffect(() => {
    const fetchPositions = async () => {
      if (selectedVehicle) {
        try {
          const response = await axios.get<Position[]>(`${process.env.REACT_APP_API_URL}/positions/${selectedVehicle.traccarDeviceId}`);
          setPositions(response.data);
        } catch (error) {
          console.error('Error fetching positions:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPositions();
    const interval = setInterval(fetchPositions, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [selectedVehicle]);

  const currentPosition = selectedVehicle?.lastPosition 
    ? [selectedVehicle.lastPosition.latitude, selectedVehicle.lastPosition.longitude]
    : defaultPosition;

  return (
    <Card
      className="vehicle-map-card"
      title={
        <span>
          <EnvironmentOutlined /> Vehicle Map
        </span>
      }
    >
      <Spin spinning={loading}>
        <MapContainer center={currentPosition as [number, number]} zoom={13} className="map-container">
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
      </Spin>
    </Card>
  );
};

export default VehicleMap;