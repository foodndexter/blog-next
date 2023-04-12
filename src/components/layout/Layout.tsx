import { colors } from "@/assets"
import { useTheme } from "@/core"
import { globalCss, styled } from "@stitches/react"
import axios from "axios"
import { useRouter } from "next/router"
import React, { PropsWithChildren } from "react"
import { useQuery } from "react-query"
import Header from "./Header"
import Menubar from "./Menubar"
import Navbar from "./Navbar"

export default function Layout({ children }: PropsWithChildren) {
  const { pathname } = useRouter()
  const { data } = useQuery(["menus"], {
    queryFn: async () => {
      const { data } = await axios.get("api/fetch")
      return data
    },
    refetchOnWindowFocus: false,
  })

  const { isLightMode } = useTheme()

  style()
  return (
    <>
      <Header />
      <Menubar />
      {(pathname !== "/" || !pathname.includes("edit")) && <Navbar />}
      <Main style={{ backgroundColor: isLightMode ? colors.white : colors.black, color: isLightMode ? colors.black : colors.white }}>{children}</Main>
    </>
  )
}

const Main = styled("main", {
  width: "100%",
  height: "calc(100vh - 60px)",
  display: "flex",
  flexDirection: "column",
  paddingTop: 60,
})
const style = globalCss({
  "*": { margin: 0, padding: 0 },
  button: {
    cursor: "pointer",
  },
})
