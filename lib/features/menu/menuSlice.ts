import { Menu, Product } from "@/src/data/menu";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface menuState {
    menu: Menu
}

const initialState: menuState = {
    menu: {
        products: []
    }
}

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setMenu: (state, action: PayloadAction<Menu>) => {
            state.menu = action.payload
        }
    }
})

export const {setMenu} = menuSlice.actions