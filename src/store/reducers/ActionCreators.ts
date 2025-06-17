import axios from "axios";
import type { AppDispatch } from "../store";
import {itemSlice} from './ItemSlice'
import { typeSlice } from "./typeSlice";
import { brandSlice } from "./brandSlice";
console.log(import.meta.env.VITE_APP_API_URL)
export const fetchItems = () => async (dispatch:AppDispatch) =>{
    try {
        dispatch(itemSlice.actions.itemsFetching())
        const response = await axios.get('http://localhost:5000/api/shopitem')
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