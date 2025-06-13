import { useDispatch, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";

export const UseAppDispatch = () => useDispatch<AppDispatch>()
export const UseAppSelector:TypedUseSelectorHook<RootState> = useSelector