import { activeMenuHandler, selectMenu, useAppDispatch, useAppSelector, useTheme } from "@/core"
import { styled } from "@stitches/react"
import React from "react"
import { colors } from "@/assets"
import MenubarTitle from "./MenubarTitle"
import Content from "./MenubarContents"

export default function Menubar() {
  const { activeMenu, menus } = useAppSelector(selectMenu)
  const dispatch = useAppDispatch()
  const onClose = () => dispatch(activeMenuHandler("off"))

  const { isLightMode } = useTheme()
  return (
    <Container style={activeMenu ? {} : { visibility: "hidden", opacity: 0 }}>
      <Wrap
        css={{ transition: "all .2s ease-out" }}
        style={activeMenu ? { backgroundColor: !isLightMode ? colors.black : colors.white } : { marginLeft: "-100%" }}>
        <MenubarTitle onClose={onClose} />
        <Content menus={menus} onClose={onClose} />
      </Wrap>
      <BG onClick={onClose} style={{ backgroundColor: isLightMode ? undefined : "rgba(255, 255, 255, .05)" }} />
    </Container>
  )
}

const Container = styled("nav", {
  width: "100%",
  height: "100vh",
  zIndex: 1000,
  position: "fixed",
  top: 0,
  left: 0,
})

const Wrap = styled("div", {
  position: "relative",
  zIndex: 1,
  backgroundColor: "white",
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  boxShadow: "0 3px 6px rgba(0,0,0,.2)",
  height: "calc(100% - 20px)",
  width: "50%",
  minWidth: 180,
  padding: 10,
  maxWidth: 300,
})

const BG = styled("button", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,.1)",
  border: "none",
})
