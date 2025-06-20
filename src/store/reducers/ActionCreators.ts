import axios from "axios";
import type { AppDispatch } from "../store";
import {itemSlice} from './ItemSlice'
import { typeSlice } from "./typeSlice";
import { brandSlice } from "./brandSlice";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {$host} from '../../http/index.js'
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
export const login = async (email:string,password:string)  => {
        const {data} = await $host.post('api/user/login',{email,password})
        localStorage.setItem('token',data.token)
        return data
}
export const check = async() => {
    
}