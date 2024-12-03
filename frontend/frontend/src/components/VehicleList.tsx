import React, { useEffect, useState } from 'react';
import { Table, Space, Tag, message, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Vehicle } from '../types/vehicle';
import axiosInstance from '../axiosInstance';

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
      message.error('Failed to delete vehicle: ' + error.response.data.message);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
        const response = await axiosInstance.get('/devices');
        setVehicles(response.data);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
    } finally {
        setLoading(false);
    }
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
        record.lastPosition ? 
        new Date(record.lastPosition.deviceTime).toLocaleString() : 
        'No data'
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onVehicleSelect(record)}>View on Map</a>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
          <Space size="middle">
              <Button onClick={() => onVehicleSelect(record)}>View</Button>
              <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
          </Space>
      ),
  },
  ];

  return (
    <Table
      columns={columns}
      dataSource={vehicles}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default VehicleList;