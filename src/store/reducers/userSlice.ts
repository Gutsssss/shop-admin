import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "@models/IUser";

interface UserState {
  user: IUser | null;
  isLoading: boolean;
  isAuth:boolean;
  error: string | unknown;
}

const initialState: UserState = {
  user:{
    email:'',
    id:undefined,
    role:''
  },
  isLoading: false,
  isAuth:false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userFetching(state) {
      state.isLoading = true;
      state.error = null; // Сбрасываем ошибку при новом запросе
    },
    userFetchingSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.error = null;
      state.isAuth = true;
      state.user = action.payload;
    },
    userFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
    logout(state) {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem('token');
    }
  },
});

export const userReducer = userSlice.reducer;
