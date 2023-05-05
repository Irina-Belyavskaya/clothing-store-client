import { createAsyncThunk } from "@reduxjs/toolkit";

// ============== Repository ==============
import repository from "../../../repository";

// ============== Dto ==============
import { UpdateProductType } from "../types/update-product-type";
import { AddProductToCartDtoType } from "../types/add-product-to-cart-dto.type";

const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

export const getUserCart = createAsyncThunk(
    'user/cart/get',
    async (_, thunkAPI) => {
        try {
            const response = await repository.get('/cart/user', headers);
            return response.data.sort((a: any, b: any) => a.id > b.id ? 1 : -1);
        } catch (e) {
            return thunkAPI.rejectWithValue('Can`t get user cart')
        }
    }
);

export const updateProductQuantity = createAsyncThunk<UpdateProductType, { dto: UpdateProductType }>(
    'user/cart/update',
    async ({ dto }, thunkAPI) => {
        try {
            const response = await repository.put('/cart', dto, headers);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Product limit exceeded')
        }
    }
);

export const deleteUserCart = createAsyncThunk(
    'user/cart/delete',
    async (_, thunkAPI) => {
        try {
            const response = await repository.delete('/cart', headers);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Can`t delete user cart')
        }
    }
);

export const addProductToCart = createAsyncThunk<AddProductToCartDtoType, { dto: AddProductToCartDtoType }>(
    'user/order/create',
    async ({ dto }, thunkAPI) => {
        try {
            const response = await repository.post('/cart/product', dto, headers);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Can`t add product to cart')
        }
    }
);
