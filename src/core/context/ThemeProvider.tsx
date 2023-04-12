import { colors } from "@/assets"
import React, { createContext, PropsWithChildren, useContext, useState } from "react"

const initialState: Theme = {
  isLightMode: true,
  color: colors.black,
  backgroundColor: colors.white,
  point: colors.blue,
  themeHandler: (target: ThemeTarget, value?: any) => {},
}
const data = createContext(initialState)
export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState(initialState)
  const themeHandler = (target: ThemeTarget, value?: any) =>
    setTheme((prev) => (target === "theme" ? { ...prev, isLightMode: !prev.isLightMode } : { ...prev, [target]: value }))
  return <data.Provider value={{ ...theme, themeHandler }}>{children}</data.Provider>
}

export function useTheme() {
  return useContext(data)
}
