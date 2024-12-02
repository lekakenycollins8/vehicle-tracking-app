import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const DeviceForm: React.FC<{ onDeviceAdded: () => void }> = ({ onDeviceAdded }) => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/devices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success('Device created successfully!');
                form.resetFields();
                onDeviceAdded();
            } else {
                message.error('Failed to create device.');
            }
        } catch (error) {
            message.error('Error creating device: ' + error.message);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Device Name" rules={[{ required: true, message: 'Please input the device name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="uniqueId" label="Unique ID" rules={[{ required: true, message: 'Please input the unique ID!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please input the status!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="lastUpdate" label="Last Update" rules={[{ required: true, message: 'Please input the last update date!' }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Create Device</Button>
            </Form.Item>
        </Form>
    );
};

export default DeviceForm;