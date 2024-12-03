import React, { useState } from 'react';
import { Table, message, DatePicker, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';

const VehicleAlerts: React.FC<{ deviceId: number }> = ({ deviceId }) => {
    const [alerts, setAlerts] = useState([]);
    const [fromDate, setFromDate] = useState<moment.Moment | null>(null);
    const [toDate, setToDate] = useState<moment.Moment | null>(null);

    const fetchAlerts = async () => {
        if (!fromDate || !toDate) {
            message.error('Please select both start and end dates.');
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/alerts`, {
                params: {
                    deviceId: deviceId,
                    from: fromDate.toISOString(),
                    to: toDate.toISOString(),
                },
            });
            setAlerts(response.data);
        } catch (error) {
            message.error('Failed to fetch alerts: ' + error.response.data.message);
        }
    };

    const columns = [
        {
            title: 'Device ID',
            dataIndex: 'deviceId',
        },
        {
            title: 'Device Name',
            dataIndex: 'deviceName',
        },
        {
            title: 'Max Speed',
            dataIndex: 'maxSpeed',
        },
        {
            title: 'Average Speed',
            dataIndex: 'averageSpeed',
        },
        {
            title: 'Distance',
            dataIndex: 'distance',
        },
        {
            title: 'Spent Fuel',
            dataIndex: 'spentFuel',
        },
        {
            title: 'Engine Hours',
            dataIndex: 'engineHours',
        },
    ];

    return (
        <div>
            <DatePicker.RangePicker
                onChange={(dates) => {
                    setFromDate(dates ? dates[0] : null);
                    setToDate(dates ? dates[1] : null);
                }}
            />
            <Button type="primary" onClick={fetchAlerts}>Fetch Alerts</Button>
            <Table columns={columns} dataSource={alerts} rowKey="deviceId" />
        </div>
    );
};

export default VehicleAlerts;