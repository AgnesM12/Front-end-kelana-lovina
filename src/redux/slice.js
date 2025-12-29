import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: {
        username: 'Pengguna',
        profilePic: '/profile.svg', 
    },
    };

    const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers: {
            loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = {
                username: action.payload.username || 'Pengguna',
                profilePic: action.payload.profilePic || '/profile.svg', 
            };
            },
          logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
          },
        },
      });

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
