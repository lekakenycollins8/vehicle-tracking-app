import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../authActions';
import { Form, Input, Button, Tooltip } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import AuthLayout from './AuthLayout';

const StyledForm = styled(Form)`
  margin-top: 24px;
  .ant-form-item-label {
    font-weight: 600;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 4px;
`;

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
        await dispatch(login(values.email, values.password));
        // Only navigate to the dashboard if the login is successful
        navigate('/dashboard');
    } catch (error) {
        // Set error message for invalid credentials
        form.setFields([
            {
                name: 'password',
                errors: ['Invalid email or password'],
            },
        ]);
        // Optionally log the error for debugging
        console.error('Login failed:', error);
    }
};

  return (
    <AuthLayout title="Login to Your Account">
      <StyledForm form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email address!' },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <StyledButton type="primary" htmlType="submit">
            Login
          </StyledButton>
        </Form.Item>
        <Form.Item>
          <Tooltip title="Don't have an account?">
            <Button type="link" onClick={() => navigate('/register')}>
              Register Now
            </Button>
          </Tooltip>
        </Form.Item>
      </StyledForm>
    </AuthLayout>
  );
};

export default LoginForm;