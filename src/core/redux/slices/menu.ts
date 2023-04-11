import { menus } from "@/assets"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

const initialState: MenuSlice = { activeMenu: false, menus: menus }

const slice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    activeMenuHandler(state, action: PayloadAction<"on" | "off" | undefined>) {
      const Action = action.payload
      if (!Action) {
        state.activeMenu = !state.activeMenu
      } else if (Action === "off") {
        state.activeMenu = false
      } else if (Action === "on") {
        state.activeMenu = true
      }
    },
    menuHandler(state, action: PayloadAction<Menu[] | undefined>) {
      const Menus = action.payload
      if (!Menus) {
        state.menus = initialState.menus
      } else state.menus = Menus
    },
  },
})

export const menu = slice.reducer

export const selectMenu = (state: RootState) => state.menu

export const { activeMenuHandler, menuHandler } = slice.actions
