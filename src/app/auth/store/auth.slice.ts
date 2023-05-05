import {createSlice} from "@reduxjs/toolkit";

// ============== Types ==============
import { AuthState } from "../types/auth-state.type";

// ============== Actions ==============
import {logOutUser, registerUser, signInUser} from "./auth.actions";

// ============== Cookies ==============
import Cookies from 'js-cookie';

const initialState: AuthState = {
    token: null,
    pending: {
        token: false
    },
    errors: {
        token: null
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ============== Registration ==============
            .addCase(registerUser.pending, (state) => {
                state.pending.token = true;
                state.errors.token = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.pending.token = false;
                state.token = payload;
                Cookies.set('access_token_client', payload.access_token);
                Cookies.set('expired_at_client', String(payload.expired_at));
            })
            .addCase(registerUser.rejected, (state, action: any & { payload: any }) => {
                state.pending.token = false;
                state.errors.token = action.payload;
            })
            // ============== Sign in ==============
            .addCase(signInUser.pending, (state) => {
                state.pending.token = true;
                state.errors.token = null;
            })
            .addCase(signInUser.fulfilled, (state, { payload }) => {
                state.pending.token = false;
                state.token = payload;
                Cookies.set('access_token_client', payload.access_token);
                Cookies.set('expired_at_client', String(payload.expired_at));
            })
            .addCase(signInUser.rejected, (state, action: any & { payload: any }) => {
                state.pending.token = false;
                state.errors.token = action.payload;
            })
            // ============== Log out ==============
            .addCase(logOutUser.pending, (state) => {
                state.pending.token = true;
                state.errors.token = null;
            })
            .addCase(logOutUser.fulfilled, (state, {payload}) => {
                state.pending.token = false;
                Cookies.remove('access_token_client');
                Cookies.remove('expired_at_client');
                state.token = null;
            })
            .addCase(logOutUser.rejected, (state, action: any & { payload: any }) => {
                state.pending.token = false;
                state.errors.token = action.payload;
            })
    },
});

export default authSlice.reducer;