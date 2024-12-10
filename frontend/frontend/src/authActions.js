import axios from 'axios';
import { message } from 'antd';

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/login`, { email, password });
        const { token, user } = response.data;

        // Store the token in local storage
        localStorage.setItem('token', token);

        dispatch({ type: 'LOGIN', payload: { user, token } });
        message.success('Login successful!');
    } catch (error) {
        console.error('Login failed:', error);
        message.error(error.response?.data?.message || 'Login failed'); // Display error message
    }
};

export const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    return { type: 'LOGOUT' };
};