import axios from 'axios';
import { message } from 'antd';

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/login`, { email, password });

        // Log the entire API response for debugging
        console.log('API Response:', response);
        console.log('API Response Data:', response.data);

        console.log('API Response Data:', response.data.data); // Log the nested data
        console.log('Inspecting response.data.data:', JSON.stringify(response.data.data, null, 2)); // Inspect the structure of response.data.data

        const { accessToken, user } = response.data.data; // Accessing accessToken and user from nested data

        // Log the token and user for debugging
        console.log('Token received:', accessToken);
        console.log('User received:', user);
        console.log('Token details:', accessToken);
        console.log('User details:', user);

        // Store the token in local storage
        localStorage.setItem('token', accessToken);
        localStorage.setItem('userId', user.id);

        dispatch({ type: 'LOGIN', payload: { user, accessToken } });
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