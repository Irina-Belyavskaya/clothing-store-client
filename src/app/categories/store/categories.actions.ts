import {createAsyncThunk} from "@reduxjs/toolkit";

// ============== Repository ==============
import repository from "../../../repository";

// ============== Dto ==============
import { CategoryDto } from "../types/category-dto.type";

const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

export const getCategories = createAsyncThunk(
    'category/getAll',
    async (_, thunkAPI) => {
        try{
            const response = await repository.get("/categories", headers);
            return response.data;
        }   catch (e) {
            return  thunkAPI.rejectWithValue('Can`t get categories.')
        }
    }
);

export const getCategoryById = createAsyncThunk<CategoryDto, { categoryId: number }>(
    'category/getById',
    async ({categoryId}, thunkAPI) => {
        try{
            const response = await repository.get(`/categories/${categoryId}`, headers);
            return response.data;

        }   catch (e) {
            return  thunkAPI.rejectWithValue('Can`t get category.')
        }
    }
);