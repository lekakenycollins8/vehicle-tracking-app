import React, { useState } from 'react';
import { Table, message, DatePicker, Button, Card, Space, Spin } from 'antd';
import { CarOutlined, CalendarOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import './styles/VehicleTrips.css';

const { RangePicker } = DatePicker;

interface Trip {
  deviceId: number;
  deviceName: string;
  startTime: string;
  endTime: string;
  distance: number;
  duration: string;
  maxSpeed: number;
}

const VehicleTrips: React.FC<{ deviceId: number }> = ({ deviceId }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<[moment.Moment | null, moment.Moment | null]>([null, null]);

  const fetchTrips = async () => {
    const [fromDate, toDate] = dateRange;
    if (!fromDate || !toDate) {
      message.error('Please select both start and end dates.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get<Trip[]>(`${process.env.REACT_APP_API_URL}/trips`, {
        params: {
          deviceId: deviceId,
          from: fromDate.toISOString(),
          to: toDate.toISOString(),
        },
      });
      setTrips(response.data);
    } catch (error) {
      message.error('Failed to fetch trips: ' + (error as any).response?.data?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Device Name',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      key: 'distance',
      render: (distance: number) => `${distance.toFixed(2)} km`,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Max Speed',
      dataIndex: 'maxSpeed',
      key: 'maxSpeed',
      render: (speed: number) => `${speed} km/h`,
    },
  ];

  return (
    <Card
      className="vehicle-trips-card"
      title={
        <Space>
          <CarOutlined />
          <span>Vehicle Trips</span>
        </Space>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Space>
          <RangePicker
            onChange={(dates) => setDateRange(dates as [moment.Moment, moment.Moment])}
            className="date-range-picker"
          />
          <Button type="primary" onClick={fetchTrips} icon={<CalendarOutlined />}>
            Fetch Trips
          </Button>
        </Space>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={trips}
            rowKey="deviceId"
            pagination={{ pageSize: 10 }}
            className="trips-table"
          />
        </Spin>
      </Space>
    </Card>
  );
};

export default VehicleTrips;