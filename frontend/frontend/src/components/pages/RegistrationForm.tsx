import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const RegisterForm: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, values);
            message.success('Registration successful!');
            form.resetFields();
        } catch (error) {
            message.error('Registration failed: ' + error.response.data.message);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Register</Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;