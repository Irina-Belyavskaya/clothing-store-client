import {createSlice} from "@reduxjs/toolkit";

// ============== Types ==============
import { ProductState } from "../types/product-state.type";

// ============== Actions ==============
import { getProducts, getProductsByCategoryId } from "./products.actions";

const initialState:ProductState = {
  products: [],
  product: null,
  pending: {
    products: false,
    product: false
  },
  errors: {
    products: null,
    product: null
  }
}

const productsSlice = createSlice({
  name: 'prodcuts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ============== Get products ==============
      .addCase(getProducts.pending, (state) => {
          state.pending.products = true;
          state.errors.products = null;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
          state.pending.products = false;
          state.products = payload;
      })
      .addCase(getProducts.rejected, (state, action: any & { payload: any }) => {
          state.pending.products = false;
          state.errors.products = action.payload;
      })
      // ============== Get products by category id ==============
      .addCase(getProductsByCategoryId.pending, (state) => {
        state.pending.products = true;
        state.errors.products = null;
      })
      .addCase(getProductsByCategoryId.fulfilled, (state, { payload }) => {
          state.pending.products = false;
          state.products = payload;
      })
      .addCase(getProductsByCategoryId.rejected, (state, action: any & { payload: any }) => {
          state.pending.products = false;
          state.errors.products = action.payload;
      })
  },
});

export default productsSlice.reducer;