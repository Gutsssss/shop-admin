import { AxiosError } from "axios";
import type { AppDispatch } from "../store";
import {itemsFetching,itemsFetchingSuccess,itemsFetchingError,getOneItem} from './ItemSlice'
import { typeFetching,typeFetchingSuccess,typeFetchingError,createType} from "./typeSlice";
import { brandFetching,brandFetchingSuccess,brandFetchingError,createBrand } from "./brandSlice";
import { jwtDecode } from "jwt-decode";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {$host,$authHost} from '../../http/index.js'
import { userFetching,userFetchingSuccess,userFetchingError,logout} from "./userSlice.js";
import type { IShopItem } from "@models/IShopItem.js";
export const fetchItems = () => async (dispatch:AppDispatch) =>{
    try {
        dispatch(itemsFetching())
        const response = await $host.get('/shopitem')
        dispatch(itemsFetchingSuccess(response.data.rows))
    }
    catch(err) {
        dispatch(itemsFetchingError(err))
    }
}
export const fetchTypes = () => async (dispatch:AppDispatch) =>{
    try {
        dispatch(typeFetching())
        const response = await $host.get('/type')
        dispatch(typeFetchingSuccess(response.data))
    }
    catch(err) {
        dispatch(typeFetchingError(err))
    }
}
export const fetchBrands = () => async (dispatch:AppDispatch) =>{
    try {
        dispatch(brandFetching())
        const response = await $host.get('/brand')
        dispatch(brandFetchingSuccess(response.data))
    }
    catch(err) {
        dispatch(brandFetchingError(err))
    }
}
export const createBrandOnApi = (name:string) => async (dispatch:AppDispatch) => {
    dispatch(brandFetching())
    try {
       const response =  await $authHost.post('/brand',{name:name})
       dispatch(createBrand(response.data))
       return response.data
    }
    catch(err) {
        dispatch(brandFetchingError(err))
    }
}
export const createTypeOnApi = (name:string) => async (dispatch:AppDispatch) => {
    dispatch(typeFetching())
    try {
       const response =  await $authHost.post('/type',{name:name})
       dispatch(createType(response.data))
       return response.data
    }
    catch(err) {
        dispatch(typeFetchingError(err))
    }
}
export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userFetching());
    const { data } = await $host.post('/user/login', { email, password });
    const decodedUser = jwtDecode(data.token);
    if (!data.token) throw new Error('Token is missing in response');
    localStorage.setItem('token', data.token);
    dispatch(userFetchingSuccess(decodedUser));
    return decodedUser;
  } catch (err:unknown) {
    let errorMessage = 'Login failed'
    if(err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response?.data?.message 
    }
    console.log(err)
    dispatch(userFetchingError(errorMessage));
    throw errorMessage;
  }
};
export const check = () => async (dispatch: AppDispatch) => {
    dispatch(userFetching())
    try {
        const {data} = await $authHost.get('/user/auth')
        localStorage.setItem('token',data.token)
        if (!data.token) throw new Error('Token is missing in response');
        const decodedUser = jwtDecode(data.token)
        dispatch(userFetchingSuccess(decodedUser))
        return decodedUser
    }
    catch (err:unknown) {
    let errorMessage = 'Checks failed'
    if(err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response?.data?.message 
    }
    console.log(err)
    dispatch(userFetchingError(errorMessage));
    throw errorMessage;
  }
}
export const logoutAndRemoveToken = () => async (dispatch:AppDispatch) => {
    try {
        dispatch(logout())
        console.log(localStorage.getItem('token'))
        localStorage.removeItem('token');
    }
    catch(err) {
        console.log(err)
    }
    
}

export const deleteProductFromApi = (id:number | undefined) => async (dispatch: AppDispatch) => {
    try {
        dispatch(itemsFetching())
        const response =  await $authHost.delete(`/shopitem/${id}`)
        dispatch(getOneItem(response.data))
        return response
    } 
    catch(err) {
        dispatch(itemsFetchingError(err))
    }
}
export const editProductFromApi = (product:IShopItem) => async (dispatch:AppDispatch) => {
        dispatch(itemsFetching())
    try {
        await $authHost.post('/shopitem/edit',product,{
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
    } catch (error) {
        console.log(error)
    }
}
export const getOneProductFromApi = (id:number) => async (dispatch:AppDispatch) => {
        
    try {
        dispatch(fetchItems())
        const response = await $host.get(`/shopitem/${id}`)
        dispatch(getOneItem(response.data))
        return response.data
    }
    catch(err) {
        console.log(err)
    }
}

export const createProductOnApi = async(product:IShopItem) => async (dispatch:AppDispatch) => {
    try {
        dispatch(itemsFetching())
        await $authHost.post('/shopitem',product,{
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
    } catch (error) {
        console.log(error)
    }
}
export const searchProducts =
  (searchValue: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(itemsFetching());
      const response = await $host.get(`api/shopitem/search/`,{
        params: { name: searchValue }
      });
      dispatch(itemsFetchingSuccess(response.data));
      return response.data;
    } catch (err) {
      const error = err as Error;
      dispatch(itemsFetchingError(error.message));
      throw error;
    }
  };