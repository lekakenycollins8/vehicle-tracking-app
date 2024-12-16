import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Space, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import './styles/DeviceForm.css';

interface DeviceFormProps {
  onDeviceAdded: () => void;
  userId: string;
}

const { Option } = Select;

const DeviceForm: React.FC<DeviceFormProps> = ({ onDeviceAdded, userId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    const requestData = {
        ...values,
        userId,
    };

    console.log('Submitting values:', requestData);
    setLoading(true); // Start loading spinner
    try {
        const token = localStorage.getItem('token'); // Retrieve the token
        await axios.post(`${import.meta.env.VITE_APP_API_URL}/devices`, requestData, {
            headers: { 'Authorization': `Bearer ${token}` } // Include token in headers
        });
        message.success('Device created successfully!');
        form.resetFields();
        onDeviceAdded();
    } catch (error) {
        console.error('Error creating device:', error.response?.data);
        if (error.response?.data?.message.includes('Unique ID is already registered')) {
            message.error('The unique ID is already registered in Traccar. Please use a different ID.');
        } else {
            message.error('Failed to create device: ' + (error.response?.data?.message || 'Unknown error'));
        }
    } finally {
        setLoading(false); // Stop loading spinner
    }
  };

  return (
    <Card
      className="device-form-card"
      title={
        <Space>
          <PlusOutlined />
          <span>Add New Device</span>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Device Name */}
        <Form.Item
          name="name"
          label="Device Name"
          rules={[{ required: true, message: 'Please input the device name!' }]}
        >
          <Input placeholder="Enter the device name" />
        </Form.Item>

        {/* Unique ID */}
        <Form.Item
          name="uniqueId"
          label="Unique ID"
          rules={[{ required: true, message: 'Please input the unique ID!' }]}
        >
          <Input placeholder="Enter the unique ID" />
        </Form.Item>

        {/* Status */}
        <Form.Item
          name="status"
          label="Status"
          initialValue="active" // Default to 'active'
          rules={[{ required: true, message: 'Please select the status!' }]}
        >
          <Select placeholder="Select status">
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>

        {/* Category */}
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: false, message: 'Please input the category (optional).' }]}
        >
          <Input placeholder="Enter the category (e.g., Vehicle)" />
        </Form.Item>

        {/* Attributes */}
        <Form.Item
          name="attributes"
          label="Attributes (JSON)"
          rules={[
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                try {
                  JSON.parse(value);
                  return Promise.resolve();
                } catch {
                  return Promise.reject('Invalid JSON format.');
                }
              },
            },
          ]}
        >
          <Input.TextArea placeholder="Enter additional attributes as JSON (optional)" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Device'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DeviceForm;