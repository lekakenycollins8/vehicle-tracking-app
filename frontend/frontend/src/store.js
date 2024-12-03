import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: () => initialState,
    },
});

const store = configureStore({
    reducer: authSlice.reducer,
});

export const { login, logout } = authSlice.actions;
export default store;