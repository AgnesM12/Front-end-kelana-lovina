import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: {
        name: 'Pengguna',
        profilPic: '/profile.svg'
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.user = {
        name: action.payload.name || 'Pengguna',
        profilePic: action.payload.profilePic || '/profile.svg'
        };
    },

    logout: (state) => {
        state.isAuthenticated = false;
        state.user = null
    },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;