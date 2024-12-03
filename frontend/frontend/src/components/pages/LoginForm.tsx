import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../authActions';
import { Form, Input, Button } from 'antd';

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        dispatch(login(email, password));
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