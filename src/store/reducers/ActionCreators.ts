import { AxiosError } from "axios";
import type { AppDispatch } from "../store";
import {itemsFetching,itemsFetchingSuccess,itemsFetchingError,getOneItem} from './ItemSlice'
import { typeFetching,typeFetchingSuccess,typeFetchingError } from "./typeSlice";
import { brandFetching,brandFetchingSuccess,brandFetchingError } from "./brandSlice";
import { jwtDecode } from "jwt-decode";
import type { UploadFile } from "antd";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {$host,$authHost} from '../../http/index.js'
import { userFetching,userFetchingSuccess,userFetchingError } from "./userSlice.js";
export const fetchItems = () => async (dispatch:AppDispatch) =>{
    try {
        dispatch(itemsFetching())
        const response = await $host.get('api/shopitem')
        dispatch(itemsFetchingSuccess(response.data.rows))
    }
    catch(err) {
        dispatch(itemsFetchingError(err))
    }
}
export const fetchTypes = () => async (dispatch:AppDispatch) =>{
    try {
        dispatch(typeFetching())
        const response = await $host.get('api/type')
        dispatch(typeFetchingSuccess(response.data))
    }
    catch(err) {
        dispatch(typeFetchingError(err))
    }
}
export const fetchBrands = () => async (dispatch:AppDispatch) =>{
    try {
        dispatch(brandFetching())
        const response = await $host.get('api/brand')
        dispatch(brandFetchingSuccess(response.data))
    }
    catch(err) {
        dispatch(brandFetchingError(err))
    }
}
export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userFetching());
    const { data } = await $host.post('api/user/login', { email, password });
    
    const decodedUser = jwtDecode(data.token);
    localStorage.setItem('token', data.token);
    
    dispatch(userFetchingSuccess(decodedUser));
    return decodedUser;
  } catch (err:unknown) {
    let errorMessage = 'Login failed'
    if(err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response?.data?.message 
    }
    dispatch(userFetchingError(errorMessage));
    throw errorMessage;
  }
};
export const check = async() => async (dispatch: AppDispatch) => {
    try {
        dispatch(userFetching())
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token',data.token)
        const decodedUser = jwtDecode(data.token)
        return decodedUser
    }
    catch (err:unknown) {
    let errorMessage = 'Checks failed'
    if(err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response?.data?.message 
    }
    dispatch(userFetchingError(errorMessage));
    throw errorMessage;
  }

}

export const deleteProductFromApi = async(id:number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(itemsFetching())
        const response =  await $authHost.delete(`api/shopitem/${id}`)
        dispatch(getOneItem(response.data))
        return response
    } 
    catch(err) {
        dispatch(itemsFetchingError(err))
    }
}
export const createProductOnApi = async(name:string,price:number | string,brandId:number | string,typeId:number | string,img:UploadFile | '',info:string) => async (dispatch:AppDispatch) => {
    try {
        dispatch(itemsFetching())
        await $authHost.post('api/shopitem',{name,price,brandId,typeId,img,info},{
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
    } catch (error) {
        console.log(error)
    }
}