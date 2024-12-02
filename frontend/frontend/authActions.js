import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password });
        dispatch({ type: 'LOGIN', payload: { user: response.data.user, token: response.data.token } });
    } catch (error) {
        console.error('Login failed:', error);
    }
};

export const logout = () => {
    return { type: 'LOGOUT' };
};