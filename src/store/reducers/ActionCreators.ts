import axios from "axios";
import type { AppDispatch } from "../store";
import {itemSlice} from './ItemSlice'
import { typeSlice } from "./typeSlice";
import { brandSlice } from "./brandSlice";
import { jwtDecode } from "jwt-decode";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {$host,$authHost} from '../../http/index.js'
import { userSlice } from "./userSlice.js";
console.log(import.meta.env.VITE_APP_API_URL)
export const fetchItems = () => async (dispatch:AppDispatch) =>{
    try {
        dispatch(itemSlice.actions.itemsFetching())
        const response = await $host.get('http://localhost:5000/api/shopitem')
        dispatch(itemSlice.actions.itemsFetchingSuccess(response.data.rows))
    }
    catch(err) {
        dispatch(itemSlice.actions.itemsFetchingError(err))
    }
}
export const fetchTypes = () => async (dispatch:AppDispatch) =>{
    try {
        dispatch(typeSlice.actions.typeFetching())
        const response = await axios.get('http://localhost:5000/api/type')
        dispatch(typeSlice.actions.typeFetchingSuccess(response.data))
    }
    catch(err) {
        dispatch(typeSlice.actions.typeFetchingError(err))
    }
}
export const fetchBrands = () => async (dispatch:AppDispatch) =>{
    try {
        dispatch(brandSlice.actions.brandFetching())
        const response = await axios.get('http://localhost:5000/api/brand')
        dispatch(brandSlice.actions.brandFetchingSuccess(response.data))
    }
    catch(err) {
        dispatch(brandSlice.actions.brandFetchingError(err))
    }
}
export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userFetching());
    const { data } = await $host.post('api/user/login', { email, password });
    
    const decodedUser = jwtDecode(data.token);
    localStorage.setItem('token', data.token);
    
    dispatch(userSlice.actions.userFetchingSuccess(decodedUser));
    return decodedUser;
  } catch (err:any) {
    const errorMessage = err.response?.data?.message || 'Login failed';
    dispatch(userSlice.actions.userFetchingError(errorMessage));
    throw errorMessage;
  }
};
export const check = async() => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token',data.token)
        const decodedUser = jwtDecode(data.token)
        return decodedUser
    }
    catch(err:any) {
    const errorMessage = err.response?.data?.message || 'Checks failed';
    dispatch(userSlice.actions.userFetchingError(errorMessage));
    throw errorMessage;
    }

}

