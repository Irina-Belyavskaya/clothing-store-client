import {createSlice} from "@reduxjs/toolkit";

// ============== Actions ==============
import {getCategories, getCategoryById} from "./categories.actions";

// ============== Types ==============
import {CategoryState} from "../types/category-state.type";

const initialState: CategoryState = {
    categories: [],
    category: null,
    pending: {
        categories: false,
        category: false
    },
    errors: {
        categories: null,
        category: null
    }
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ============== Get categories ==============
            .addCase(getCategories.pending, (state) => {
                state.pending.categories = true;
                state.errors.categories = null;
            })
            .addCase(getCategories.fulfilled, (state, { payload }) => {
                state.pending.categories = false;
                state.categories = payload;
            })
            .addCase(getCategories.rejected, (state, action: any & { payload: any }) => {
                state.pending.categories = false;
                state.errors.categories = action.payload;
            })
            // ============== Get category by id ==============
            .addCase(getCategoryById.pending, (state) => {
                state.pending.category = true;
                state.errors.category = null;
            })
            .addCase(getCategoryById.fulfilled, (state, { payload }) => {
                state.pending.category = false;
                state.category = payload;
            })
            .addCase(getCategoryById.rejected, (state, action: any & { payload: any }) => {
                state.pending.category = false;
                state.errors.category = action.payload;
            })
    },
});

export default categoriesSlice.reducer;