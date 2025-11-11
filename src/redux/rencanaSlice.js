import { createSlice } from "@reduxjs/toolkit";

const savedState = JSON.parse(localStorage.getItem("rencanaState")) || {
    packages: [],
};
savedState.packages = savedState.packages.map(pkg => ({
    ...pkg,
    date: pkg.date ? new Date(pkg.date) : null,
}));

const rencanaSlice = createSlice({
    name: "rencana",
    initialState: savedState,
    reducers: {
        addPackage: (state, action) => {
        state.packages.push(action.payload);
        },
        deletePackage: (state, action) => {
        state.packages = state.packages.filter(
            (pkg) => pkg.id !== action.payload
        );
        },
        resetRencana: (state) => {
        state.packages = [];
        },
    },
});


export const { addPackage, deletePackage, resetRencana } = rencanaSlice.actions;
export default rencanaSlice.reducer;
