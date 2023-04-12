import { colors } from "@/assets"
import { activeMenuHandler, useAppDispatch, useTheme } from "@/core"
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons"
import { faArrowUpFromBracket, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { styled } from "@stitches/react"
import React from "react"
import { MenuIcon } from "./Header"

export default function Navbar() {
  const { isLightMode } = useTheme()
  const dispatch = useAppDispatch()
  const onMenuIcon = () => dispatch(activeMenuHandler())
  const onMessage = () => console.log("message")
  const onPlus = () => console.log("plus")
  const onHeart = () => console.log("Heart")
  const onShare = () => console.log("share")
  return (
    <Container style={isLightMode ? {} : { borderColor: colors.lightGrey, backgroundColor: colors.black }}>
      <Wrap css={{ gridTemplateColumns: "1fr 1fr", display: "grid" }}>
        <Button onClick={onMenuIcon}>
          <MenuIcon css={{ padding: 10 }} isLightMode={isLightMode} onClick={() => console.log("hello")} />
        </Button>
        <Button onClick={onMessage} style={isLightMode ? {} : { color: colors.lightGrey }}>
          <FontAwesomeIcon icon={faMessage} />
        </Button>
      </Wrap>
      <Button
        onClick={onPlus}
        css={{
          width: 50,
          height: 50,
          borderRadius: 30,
          backgroundColor: isLightMode ? colors.white : colors.black,
          fontSize: 20,
          position: "relative",
          bottom: "50%",
          boxShadow: "0 3px 6px rgb(0,0,0, .2)",
        }}>
        <Wrap
          css={{
            border: "2px solid",
            color: colors.blue,
            width: "80%",
            height: "80%",
            borderRadius: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <FontAwesomeIcon icon={faPlus} />
        </Wrap>
      </Button>
      <Wrap css={{ gridTemplateColumns: "1fr 1fr", display: "grid" }}>
        <Button onClick={onHeart} style={isLightMode ? {} : { color: colors.lightGrey }}>
          <FontAwesomeIcon icon={faHeart} />
        </Button>
        <Button onClick={onShare} css={{ fontSize: 18 }} style={isLightMode ? {} : { color: colors.lightGrey }}>
          <FontAwesomeIcon icon={faArrowUpFromBracket} />
        </Button>
      </Wrap>
    </Container>
  )
}

const border = "1px solid rgba(0, 0, 0, .1)"
const Container = styled("div", {
  position: "fixed",
  zIndex: 1,
  width: "calc(100% - 22px)",
  bottom: 10,
  left: 10,
  display: "flex",
  alignItems: "center",
  color: "black",
  borderRadius: 10,
  backgroundColor: "white",
  boxShadow: "0 3px 6px rgba(0, 0, 0, .2)",
  height: 40,
  border,
  justifyContent: "space-between",
  columnGap: 10,
})

const Wrap = styled("div", {
  display: "flex",
  width: "calc(50% - 35px)",
  justifyContent: "center",
})

const Button = styled("button", {
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "transparent",
  fontSize: 20,
})
