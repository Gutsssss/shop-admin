import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {itemReducer} from './reducers/ItemSlice'
import { typeReducer } from "./reducers/typeSlice";
import { brandReducer } from "./reducers/brandSlice";
import { userReducer } from './reducers/userSlice';

const rootReducer = combineReducers({
    itemReducer,
    typeReducer,
    brandReducer,
    userReducer
})

export const setupStore = () => {
    return configureStore({
        reducer:rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']