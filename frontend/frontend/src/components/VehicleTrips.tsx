import React, { useState } from 'react';
import { Table, message, DatePicker, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';

const VehicleTrips: React.FC<{ deviceId: number }> = ({ deviceId }) => {
    const [trips, setTrips] = useState([]);
    const [fromDate, setFromDate] = useState<moment.Moment | null>(null);
    const [toDate, setToDate] = useState<moment.Moment | null>(null);

    const fetchTrips = async () => {
        if (!fromDate || !toDate) {
            message.error('Please select both start and end dates.');
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/trips`, {
                params: {
                    deviceId: deviceId,
                    from: fromDate.toISOString(),
                    to: toDate.toISOString(),
                },
            });
            setTrips(response.data);
        } catch (error) {
            message.error('Failed to fetch trips: ' + error.response.data.message);
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
            title: 'Start Time',
            dataIndex: 'startTime',
            render: (text: string) => new Date(text).toLocaleString(),
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            render: (text: string) => new Date(text).toLocaleString(),
        },
        {
            title: 'Distance',
            dataIndex: 'distance',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
        },
        {
            title: 'Max Speed',
            dataIndex: 'maxSpeed',
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
            <Button type="primary" onClick={fetchTrips}>Fetch Trips</Button>
            <Table columns={columns} dataSource={trips} rowKey="deviceId" />
        </div>
    );
};

export default VehicleTrips;