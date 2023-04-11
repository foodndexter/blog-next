import { colors } from "@/assets"
import { activeMenuHandler, useAppDispatch, useTheme } from "@/core"
import { faM, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { styled } from "@stitches/react"
import { useRouter } from "next/router"
import React from "react"

export default function Header() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const onTitle = () => {
    dispatch(activeMenuHandler("off"))
    router.push({
      pathname: "/",
    })
  }

  const { themeHandler, theme } = useTheme()
  const onModeIcon = () => themeHandler("theme")
  const onMenuIcon = () => dispatch(activeMenuHandler())
  return (
    <Container style={theme === "dark" ? { backgroundColor: colors.black } : {}}>
      <Wrap>
        <MenuIcon theme={theme} onClick={onMenuIcon} />
        <TitleButton onClick={onTitle}>
          <Title style={theme === "dark" ? { color: colors.lightGrey } : {}}>D's WORLD</Title>
        </TitleButton>
        <ModeIcon theme={theme} onClick={onModeIcon} />
      </Wrap>
    </Container>
  )
}
type ButtonProps = { onClick: AppFn; theme: ThemeMode }
export function MenuIcon({ onClick, theme }: ButtonProps) {
  return (
    <MenuButton onClick={onClick}>
      <Span style={theme === "dark" ? { backgroundColor: colors.lightGrey } : {}} />
      <Span style={theme === "dark" ? { backgroundColor: colors.grey } : { backgroundColor: colors.lightGrey }} />
      <Span style={theme === "dark" ? { backgroundColor: colors.lightGrey } : {}} />
      <Span style={theme === "dark" ? { backgroundColor: colors.lightGrey } : {}} />
    </MenuButton>
  )
}

export function ModeIcon({ onClick, theme }: ButtonProps) {
  const Button = styled("button", {
    width: 40,
    height: 40,
    border: "none",
    borderRadius: 5,
    backgroundColor: "transparent",
    color: theme === "dark" ? colors.lightGrey : colors.grey,
  })
  return (
    <Button onClick={onClick}>
      <FontAwesomeIcon icon={theme === "dark" ? faMoon : faSun} />
    </Button>
  )
}

const Container = styled("header", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  borderBottom: `1px solid rgba(0,0,0,.1)`,
  backgroundColor: "white",
  zIndex: 100,
})

const Wrap = styled("div", {
  position: "relative",
  height: 60,
  maxWidth: 900,
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 10px",
})

const TitleButton = styled("button", {
  border: "none",
  padding: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  backgroundColor: "transparent",
})

const Title = styled("p", {
  fontSize: 25,
  fontWeight: 900,
  padding: 0,
  margin: 0,
})

const MenuButton = styled("button", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: 1,
  rowGap: 1,
  backgroundColor: "transparent",
  padding: 10,
  border: "none",
})

const Span = styled("span", {
  display: "block",
  width: 8,
  height: 8,
  backgroundColor: colors.grey,
  borderRadius: 1,
  transition: "all .2s ease-out",
})
