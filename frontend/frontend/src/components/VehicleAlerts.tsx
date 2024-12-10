import React, { useState, useEffect } from 'react';
import { Card, Table, DatePicker, Space, Button, message, Spin } from 'antd';
import { BellOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import './styles/VehicleAlerts.css';

const { RangePicker } = DatePicker;

interface Alert {
  id: string;
  deviceId: string;
  type: string;
  alertTime: string;
  message: string;
}

interface VehicleAlertsProps {
  vehicleId: string;
}

const VehicleAlerts: React.FC<VehicleAlertsProps> = ({ vehicleId }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<[moment.Moment | null, moment.Moment | null]>([null, null]);

  const fetchAlerts = async () => {
    const [startDate, endDate] = dateRange;
    if (!startDate || !endDate) {
      message.error('Please select both start and end dates.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get<Alert[]>(`${process.env.REACT_APP_API_URL}/alerts`, {
        params: {
          vehicleId,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });
      setAlerts(response.data);
    } catch (error) {
      message.error('Failed to fetch alerts: ' + (error as any).response?.data?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      fetchAlerts();
    }
  }, [vehicleId]);

  const columns = [
    {
      title: 'Alert Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Time',
      dataIndex: 'alertTime',
      key: 'alertTime',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
  ];

  return (
    <Card
      className="vehicle-alerts-card"
      title={
        <Space>
          <BellOutlined />
          <span>Vehicle Alerts</span>
        </Space>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Space>
          <RangePicker
            onChange={(dates) => setDateRange(dates as [moment.Moment, moment.Moment])}
            className="date-range-picker"
          />
          <Button type="primary" onClick={fetchAlerts} icon={<SearchOutlined />}>
            Search Alerts
          </Button>
        </Space>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={alerts}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="alerts-table"
          />
        </Spin>
      </Space>
    </Card>
  );
};

export default VehicleAlerts;