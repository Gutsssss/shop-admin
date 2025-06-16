import type { Itype } from './../../models/IType';
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TypeState {
  types: Itype[];
  isLoading: boolean;
  error: string | unknown;
}

const initialState: TypeState = {
  types: [],
  isLoading: false,
  error: "",
};

export const typeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    typeFetching(state) {
      state.isLoading = true;
    },
    typeFetchingSuccess(state, actions) {
      state.isLoading = false;
      state.error = '';
      state.types = actions.payload
    },
    typeFetchingError(state, actions:PayloadAction<string | unknown>) {
      state.isLoading = false;
      state.error = actions.payload
    },
  },
});

export const typeReducer = typeSlice.reducer;
