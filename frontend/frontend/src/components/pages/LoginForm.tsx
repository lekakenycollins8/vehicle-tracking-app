import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../authActions';
import { Form, Input, Button } from 'antd';

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (values: any) => {
        // Prevent default form submission
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Get error details from response
                throw new Error(errorData.message || 'Login failed'); // Use error message from server
            }

            const data = await response.json();
            // Dispatch login action with the received token and user data
            dispatch(login(data.token, data.user));
        } catch (error) {
            console.error('Error during login:', error);
            alert(error.message); // Simple alert for demonstration
        }
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Email" required>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item label="Password" required>
                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Login</Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;