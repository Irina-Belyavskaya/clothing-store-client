import {createAsyncThunk} from "@reduxjs/toolkit";

// ============== Repository ==============
import repository from "../../../repository";

// ============== Types ==============
import {CreateOrderDtoType} from "../types/create-order-dto.type";

const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

export const getUserOrders = createAsyncThunk(
    'orders/getUserOrders',
    async (_, thunkAPI) => {
        try{
            const response = await repository.get('/orders/user', headers);
            return response.data;

        }   catch (e) {
            return  thunkAPI.rejectWithValue('Can`t get orders.')
        }
    }
);

export const createOrder = createAsyncThunk<CreateOrderDtoType, {dto: CreateOrderDtoType}>(
    'orders/createUserOrders',
    async ({dto}, thunkAPI) => {
        try{
            const response = await repository.post('/orders',dto, headers);
            return response.data;
        }   catch (e) {
            return  thunkAPI.rejectWithValue('Can`t make an order.')
        }
    }
);