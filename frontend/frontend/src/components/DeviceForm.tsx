import React from 'react';
import { Form, Input, Button, Card, message, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import './styles/DeviceForm.css';

interface DeviceFormProps {
  onDeviceAdded: () => void;
}

const DeviceForm: React.FC<DeviceFormProps> = ({ onDeviceAdded }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/devices`, values);
      message.success('Device created successfully!');
      form.resetFields();
      onDeviceAdded();
    } catch (error) {
      message.error('Failed to create device: ' + (error as any).response?.data?.message || 'Unknown error');
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
        <Form.Item
          name="name"
          label="Device Name"
          rules={[{ required: true, message: 'Please input the device name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="uniqueId"
          label="Unique ID"
          rules={[{ required: true, message: 'Please input the unique ID!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please input the status!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Create Device
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DeviceForm;
