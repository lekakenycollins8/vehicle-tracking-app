import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/login`, { email, password });
        const { token, user } = response.data;

        // Store the token in local storage
        localStorage.setItem('token', token);

        dispatch({ type: 'LOGIN', payload: { user, token } });
    } catch (error) {
        console.error('Login failed:', error);
    }
};

export const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    return { type: 'LOGOUT' };
};