import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';

const VehicleEvents: React.FC<{ vehicleId: string }> = ({ vehicleId }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/events/${vehicleId}`);
                setEvents(response.data);
            } catch (error) {
                message.error('Failed to fetch vehicle events: ' + error.response.data.message);
            }
        };
        fetchEvents();
    }, [vehicleId]);

    const columns = [
        {
            title: 'Event Type',
            dataIndex: 'eventType',
        },
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            render: (text: string) => new Date(text).toLocaleString(),
        },
        {
            title: 'Details',
            dataIndex: 'details',
        },
    ];

    return <Table columns={columns} dataSource={events} rowKey="id" />;
};

export default VehicleEvents;