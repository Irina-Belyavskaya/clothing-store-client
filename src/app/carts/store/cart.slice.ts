import {createSlice} from "@reduxjs/toolkit";

// ============== Types ==============
import {UserCartStateType} from "../types/user-cart-state.type";

// ============== Actions ==============
import {addProductToCart, deleteUserCart, getUserCart, updateProductQuantity} from "./cart.actions";

const initialState: UserCartStateType = {
    userCart: null,
    productInCart: null,
    pending: {
        userCart: false,
        productInCart: false
    },
    errors: {
        userCart: null,
        productInCart: null
    }
}

const userCartSlice = createSlice({
    name: 'userCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ============== Get user cart ==============
            .addCase(getUserCart.pending, (state) => {
                state.pending.userCart = true;
                state.errors.userCart = null;
            })
            .addCase(getUserCart.fulfilled, (state, { payload }) => {
                state.pending.userCart = false;
                state.userCart = payload;
            })
            .addCase(getUserCart.rejected, (state, action: any & { payload: any }) => {
                state.pending.userCart = false;
                state.errors.userCart = action.payload;
            })
            // ============== Add product to cart ==============
            .addCase(addProductToCart.pending, (state) => {
                state.pending.userCart = true;
                state.errors.userCart = null;
            })
            .addCase(addProductToCart.fulfilled, (state, { payload }) => {
                state.pending.userCart = false;
                state.productInCart = payload;
            })
            .addCase(addProductToCart.rejected, (state, action: any & { payload: any }) => {
                state.pending.userCart = false;
                state.errors.userCart = action.payload;
            })
            // ============== Update product quantity ==============
            .addCase(updateProductQuantity.pending, (state) => {
                state.pending.userCart = true;
                state.errors.userCart = null;
            })
            .addCase(updateProductQuantity.fulfilled, (state, { payload }) => {
                state.pending.userCart = false;
            })
            .addCase(updateProductQuantity.rejected, (state, action: any & { payload: any }) => {
                state.pending.userCart = false;
                state.errors.userCart = action.payload;
            })
            // ============== Delete user cart ==============
            .addCase(deleteUserCart.pending, (state) => {
                state.pending.userCart = true;
                state.errors.userCart = null;
            })
            .addCase(deleteUserCart.fulfilled, (state, { payload }) => {
                state.pending.userCart = false;
            })
            .addCase(deleteUserCart.rejected, (state, action: any & { payload: any }) => {
                state.pending.userCart = false;
                state.errors.userCart = action.payload;
            })
    }
});

export default userCartSlice.reducer;