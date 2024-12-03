import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const VehicleUpdateForm: React.FC<{ vehicleId: string; onVehicleUpdated: () => void }> = ({ vehicleId, onVehicleUpdated }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchVehicle = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/devices/${vehicleId}`);
            form.setFieldsValue(response.data);
        };
        fetchVehicle();
    }, [vehicleId, form]);

    const onFinish = async (values: any) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/devices/${vehicleId}`, values);
            message.success('Vehicle updated successfully!');
            onVehicleUpdated(); // Call the parent function to refresh the vehicle list
        } catch (error) {
            message.error('Failed to update vehicle: ' + error.response.data.message);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Vehicle Name" rules={[{ required: true, message: 'Please input the vehicle name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please input the status!' }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Update Vehicle</Button>
            </Form.Item>
        </Form>
    );
};

export default VehicleUpdateForm;