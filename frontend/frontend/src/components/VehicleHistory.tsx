import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';

const VehicleHistory: React.FC<{ vehicleId: string }> = ({ vehicleId }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/devices/${vehicleId}/history`);
                setHistory(response.data);
            } catch (error) {
                message.error('Failed to fetch vehicle history: ' + error.response.data.message);
            }
        };
        fetchHistory();
    }, [vehicleId]);

    const columns = [
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            render: (text: string) => new Date(text).toLocaleString(),
        },
        {
            title: 'Latitude',
            dataIndex: 'latitude',
        },
        {
            title: 'Longitude',
            dataIndex: 'longitude',
        },
        {
            title: 'Speed',
            dataIndex: 'speed',
        },
    ];

    return <Table columns={columns} dataSource={history} rowKey="id" />;
};

export default VehicleHistory;