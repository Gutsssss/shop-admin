import axios from "axios";
import type { AppDispatch } from "../store";
import {itemSlice} from './ItemSlice'

export const fetchItems = () => async (dispatch:AppDispatch) =>{
    try {
        dispatch(itemSlice.actions.itemsFetching())
        const response = await axios.get('http://localhost:5000/api/shopitem')
        dispatch(itemSlice.actions.itemsFetchingSuccess(response.data))
    }
    catch(err) {
        dispatch(itemSlice.actions.itemsFetchingError(err))
    }
}