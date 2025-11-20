import { configureStore } from '@reduxjs/toolkit';
import slice from './slice';
import rencanaSlice from './rencanaSlice';

export const store = configureStore({
    reducer: {
        auth: slice,
        rencana: rencanaSlice,
    },
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("rencanaState", JSON.stringify(state.rencana));
});