import React, { useEffect, useState } from 'react';
import { Table, Space, Tag, message, Button, Card, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { CarOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Vehicle } from '../types/vehicle';
import axiosInstance from '../axiosInstance';
import './styles/VehicleList.css';

interface VehicleListProps {
  onVehicleSelect: (vehicle: Vehicle) => void;
  onVehicleDeleted: () => void;
}

const VehicleList: React.FC<VehicleListProps> = ({ onVehicleSelect, onVehicleDeleted }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/devices/${id}`);
      message.success('Vehicle deleted successfully!');
      onVehicleDeleted();
    } catch (error) {
      message.error('Failed to delete vehicle: ' + (error as any).response?.data?.message || 'Unknown error');
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const userId = localStorage.getItem('userId'); // Get userId from local storage
    const token = localStorage.getItem('token'); // Get token from local storage
    console.log('Token before API request:', token); // Log the token for debugging
    try {
      const response = await axiosInstance.get<Vehicle[]>('/devices', {
        headers: { 'Authorization': `Bearer ${token}` }, // Include token in headers
        params: { userId } // Include userId in the request
      });
      console.log('Fetched vehicles:', response.data); // Log the fetched vehicle data
      console.log('Inspecting fetched vehicle data:', response.data); // Inspect the fetched vehicle data
      console.log('Inspecting fetched vehicle data before setting state:', response.data); // Inspect the fetched vehicle data before setting state
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      message.error('Failed to fetch vehicles');
    } finally {
      setLoading(false);
    };
  };

  const columns: ColumnsType<Vehicle> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Last Updated',
      key: 'lastPosition',
      render: (_, record) => (
        record.lastUpdate ? 
        new Date(record.lastUpdate).toLocaleString() : 
        'No data'
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/dashboard/vehicles/${record.id}`}>
            <Button icon={<EyeOutlined />} title="View Details">
              View
            </Button>
          </Link>
          <Link to={`/dashboard/vehicles/${record.id}/map`}>
            <Button icon={<EyeOutlined />} title="View Map">
              Map
            </Button>
          </Link>
          <Link to={`/dashboard/vehicles/${record.id}/events`}>
            <Button icon={<EyeOutlined />} title="View Events">
              Events
            </Button>
          </Link>
          <Link to={`/dashboard/vehicles/${record.id}/update`}>
            <Button icon={<EditOutlined />} title="Update">
              Update
            </Button>
          </Link>
          <Button 
            onClick={() => handleDelete(record.id)} 
            danger 
            icon={<DeleteOutlined />}
            title="Delete"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      className="vehicle-list-card"
      title={
        <Space>
          <CarOutlined />
          <span>Vehicle List</span>
        </Space>
      }
    >
      <Spin spinning={loading}>
        {vehicles.length > 0 ? (
          <Table
            columns={columns}
            dataSource={vehicles}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="vehicle-table"
          />
        ) : (
          <div>No vehicles found.</div> // Message when no vehicles are available
        )}
      </Spin>
    </Card>
  );
};

export default VehicleList;