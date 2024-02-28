import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { menuSlice } from "./features/menu/menuSlice";

export const makeStore = () => 
     configureStore({
        reducer: {
            'menu': menuSlice.reducer
        }
    })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useMenu = () => useSelector((state: RootState) => state.menu.menu)