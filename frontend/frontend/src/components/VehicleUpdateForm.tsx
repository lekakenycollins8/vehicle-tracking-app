import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, Spin } from 'antd';
import { SaveOutlined, CarOutlined } from '@ant-design/icons';
import axios from 'axios';
import './styles/VehicleUpdateForm.css';

interface VehicleUpdateFormProps {
  vehicleId: string;
  onVehicleUpdated: () => void;
}

const VehicleUpdateForm: React.FC<VehicleUpdateFormProps> = ({ vehicleId, onVehicleUpdated }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/devices/${vehicleId}`);
        form.setFieldsValue(response.data);
      } catch (error) {
        message.error('Failed to fetch vehicle data: ' + (error as any).response?.data?.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [vehicleId, form]);

  const onFinish = async (values: any) => {
    const userId = localStorage.getItem('userId'); // Get userId from local storage
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/devices/${vehicleId}`, {
        ...values,
        userId // Include userId in the update request
      });
      message.success('Vehicle updated successfully!');
      onVehicleUpdated();
    } catch (error) {
      message.error('Failed to update vehicle: ' + (error as any).response?.data?.message || 'Unknown error');
    }
  };

  return (
    <Card
      className="vehicle-update-form-card"
      title={
        <span>
          <CarOutlined /> Update Vehicle
        </span>
      }
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Vehicle Name"
            rules={[{ required: true, message: 'Please input the vehicle name!' }]}
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
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Update Vehicle
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};

export default VehicleUpdateForm;