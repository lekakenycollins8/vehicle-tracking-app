import React, { useEffect, useState } from 'react';
import { Table, Card, Space, message, Spin } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import axios from 'axios';
import './styles/VehicleHistory.css';

interface HistoryEntry {
  id: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
}

const VehicleHistory: React.FC<{ vehicleId: string }> = ({ vehicleId }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get<HistoryEntry[]>(`${process.env.REACT_APP_API_URL}/devices/${vehicleId}/history`);
        setHistory(response.data);
      } catch (error) {
        message.error('Failed to fetch vehicle history: ' + (error as any).response?.data?.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [vehicleId]);

  const columns = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      key: 'longitude',
    },
    {
      title: 'Speed',
      dataIndex: 'speed',
      key: 'speed',
      render: (speed: number) => `${speed} km/h`,
    },
  ];

  return (
    <Card
      className="vehicle-history-card"
      title={
        <Space>
          <HistoryOutlined />
          <span>Vehicle History</span>
        </Space>
      }
    >
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={history}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="history-table"
        />
      </Spin>
    </Card>
  );
};

export default VehicleHistory;