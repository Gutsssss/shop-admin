import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IShopItem } from "../../models/IShopItem";

interface ItemsState {
  items: IShopItem[];
  isLoading: boolean;
  error: string | unknown;
}

const initialState: ItemsState = {
  items: [],
  isLoading: false,
  error: "",
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    itemsFetching(state) {
      state.isLoading = true;
    },
    itemsFetchingSuccess(state, actions) {
      state.isLoading = false;
      state.error = '';
      state.items = actions.payload
    },
    itemsFetchingError(state, actions:PayloadAction<string | unknown>) {
      state.isLoading = false;
      state.error = actions.payload
    },
  },
});

export const itemReducer = itemSlice.reducer;
