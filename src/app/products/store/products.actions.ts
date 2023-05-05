import { createAsyncThunk } from "@reduxjs/toolkit";

// ============== Repository ==============
import repository from "../../../repository";

// ============== Types ==============
import { ProductDto } from "../types/product-dto.type";

const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

export const getProducts = createAsyncThunk(
    'products/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await repository.get("/products", headers);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Can`t get products.')
        }
    }
);

export const getProductsByCategoryId = createAsyncThunk<ProductDto[], { categoryId: number }>(
    'products/ProductsByCategoryId',
    async ({ categoryId }, thunkAPI) => {
        try {
            const response = await repository.get(`/categories/products/${categoryId}`, headers);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Can`t get products by category id.')
        }
    }
);
