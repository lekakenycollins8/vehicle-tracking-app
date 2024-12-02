import { createStore } from 'redux';

const initialState = {
    user: null,
    token: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload.user, token: action.payload.token };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

const store = createStore(authReducer);

export default store;