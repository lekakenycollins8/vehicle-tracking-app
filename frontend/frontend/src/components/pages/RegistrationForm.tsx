import React from 'react';
import { Form, Input, Button, message, Tooltip } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from './AuthLayout';

const StyledForm = styled(Form)`
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

const PasswordStrengthIndicator = styled.div<{ strength: number }>`
  height: 4px;
  margin-top: 4px;
  background: ${({ strength }) =>
    strength === 0 ? '#ff4d4f' : strength === 1 ? '#faad14' : '#52c41a'};
  width: ${({ strength }) => `${(strength + 1) * 33.33}%`};
  transition: all 0.3s ease;
`;

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/register`, values);
      const { token } = response.data;
      localStorage.setItem('token', token);
      message.success('Registration successful!');
      form.resetFields();
      navigate('/');
    } catch (error) {
      message.error('Registration failed: ' + error.response.data.message);
    }
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    return strength;
  };

  return (
    <AuthLayout title="Create Your Account">
      <StyledForm form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email address!' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 8, message: 'Password must be at least 8 characters long!' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter your password"
            onChange={(e) => {
              const strength = checkPasswordStrength(e.target.value);
              form.setFields([
                {
                  name: 'password',
                  errors: [],
                },
              ]);
              return <PasswordStrengthIndicator strength={strength} />;
            }}
          />
        </Form.Item>
        <Form.Item>
          <StyledButton type="primary" htmlType="submit">
            Register
          </StyledButton>
        </Form.Item>
        <Form.Item>
          <Tooltip title="Already have an account?">
            <Button type="link" onClick={() => navigate('/')}>
              Login Instead
            </Button>
          </Tooltip>
        </Form.Item>
      </StyledForm>
    </AuthLayout>
  );
};

export default RegisterForm;