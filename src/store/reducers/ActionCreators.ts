import axios from "axios";
import type { AppDispatch } from "../store";
import {itemSlice} from './ItemSlice'
import { typeSlice } from "./typeSlice";
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