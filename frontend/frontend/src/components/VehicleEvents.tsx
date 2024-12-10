import React, { useEffect, useState } from 'react';
import { Table, Card, Space, message, Spin } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import axios from 'axios';
import './styles/VehicleEvents.css';

interface Event {
  id: string;
  eventType: string;
  timestamp: string;
  details: string;
}

const VehicleEvents: React.FC<{ vehicleId: string }> = ({ vehicleId }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>(`${process.env.REACT_APP_API_URL}/events/${vehicleId}`);
        setEvents(response.data);
      } catch (error) {
        message.error('Failed to fetch vehicle events: ' + (error as any).response?.data?.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [vehicleId]);

  const columns = [
    {
      title: 'Event Type',
      dataIndex: 'eventType',
      key: 'eventType',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
  ];

  return (
    <Card
      className="vehicle-events-card"
      title={
        <Space>
          <CalendarOutlined />
          <span>Vehicle Events</span>
        </Space>
      }
    >
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={events}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="events-table"
        />
      </Spin>
    </Card>
  );
};

export default VehicleEvents;