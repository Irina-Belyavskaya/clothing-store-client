import {createSlice} from "@reduxjs/toolkit";

// ============== Types ==============
import {OrderStateType} from "../types/order-state.type";

// ============== Actions ==============
import {createOrder, getUserOrders} from "./orders.actions";

const initialState: OrderStateType = {
    orders: [],
    order: null,
    pending: {
        orders: false,
        order: false,
    },
    errors: {
        orders: null,
        order: null
    }
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ============== Get user orders ==============
            .addCase(getUserOrders.pending, (state) => {
                state.pending.orders = true;
                state.errors.orders = null;
            })
            .addCase(getUserOrders.fulfilled, (state, { payload }) => {
                state.pending.orders = false;
                state.orders = payload;
            })
            .addCase(getUserOrders.rejected, (state, action: any & { payload: any }) => {
                state.pending.orders = false;
                state.errors.orders = action.payload;
            })
            // ============== Get user orders ==============
            .addCase(createOrder.pending, (state) => {
                state.pending.order = true;
                state.errors.order = null;
            })
            .addCase(createOrder.fulfilled, (state, { payload }) => {
                state.pending.order = false;
                state.order = payload;
            })
            .addCase(createOrder.rejected, (state, action: any & { payload: any }) => {
                state.pending.order = false;
                state.errors.order = action.payload;
            })
    },
});

export default orderSlice.reducer;