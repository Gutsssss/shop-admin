import type { IBrand } from './../../models/IBrand';
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TypeState {
  brands: IBrand[];
  isLoading: boolean;
  error: string | unknown;
}

const initialState: TypeState = {
  brands: [],
  isLoading: false,
  error: "",
};

export const brandSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    brandFetching(state) {
      state.isLoading = true;
    },
    brandFetchingSuccess(state, actions) {
      state.isLoading = false;
      state.error = '';
      state.brands = actions.payload
    },
    brandFetchingError(state, actions:PayloadAction<string | unknown>) {
      state.isLoading = false;
      state.error = actions.payload
    },
  },
});

export const brandReducer = brandSlice.reducer;
