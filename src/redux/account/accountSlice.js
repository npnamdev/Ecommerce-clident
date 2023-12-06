import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: {
        email: '',
        phone: '',
        fullName: '',
        role: '',
        avatar: '',
        id: ''
    }
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },

        doGetAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
    },
});


export const { doLoginAction, doGetAccountAction } = accountSlice.actions;
export default accountSlice.reducer;