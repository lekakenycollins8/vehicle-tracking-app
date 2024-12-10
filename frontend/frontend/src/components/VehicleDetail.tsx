import React, { useEffect, useState } from 'react';
import { Card, Skeleton, Typography, Tag, Space } from 'antd';
import { CarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import './styles/VehicleDetails.css';

const { Text } = Typography;

interface Vehicle {
  id: string;
  name: string;
  uniqueId: string;
  status: 'active' | 'inactive';
  lastUpdate: string;
}

const VehicleDetail: React.FC<{ vehicleId: string }> = ({ vehicleId }) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get<Vehicle>(`${process.env.REACT_APP_API_URL}/devices/${vehicleId}`);
        setVehicle(response.data);
      } catch (error) {
        console.error('Failed to fetch vehicle details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [vehicleId]);

  return (
    <Card
      className="vehicle-details-card"
      title={
        <Space>
          <CarOutlined />
          <span>Vehicle Details</span>
        </Space>
      }
    >
      <Skeleton loading={loading} active>
        {vehicle && (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>Name:</Text> {vehicle.name}
            </div>
            <div>
              <Text strong>Unique ID:</Text> {vehicle.uniqueId}
            </div>
            <div>
              <Text strong>Status:</Text>{' '}
              <Tag color={vehicle.status === 'active' ? 'green' : 'red'}>
                {vehicle.status.toUpperCase()}
              </Tag>
            </div>
            <div>
              <Text strong>Last Updated:</Text>{' '}
              <Space>
                <ClockCircleOutlined />
                {new Date(vehicle.lastUpdate).toLocaleString()}
              </Space>
            </div>
          </Space>
        )}
      </Skeleton>
    </Card>
  );
};

export default VehicleDetail;