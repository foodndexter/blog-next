import { colors } from "@/assets"
import { activeMenuHandler, useAppDispatch, useTheme } from "@/core"
import { faM, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CSSProperties, styled } from "@stitches/react"
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

  const { themeHandler, isLightMode } = useTheme()
  const onModeIcon = () => themeHandler("theme")
  const onMenuIcon = () => dispatch(activeMenuHandler())
  return (
    <Container style={isLightMode ? {} : { backgroundColor: colors.black, borderColor: "rgba(255, 255, 255, .1)" }}>
      <Wrap>
        <Button>
          <MenuIcon isLightMode={isLightMode} onClick={onMenuIcon} />
        </Button>
        <TitleButton onClick={onTitle}>
          <Title style={!isLightMode ? { color: colors.lightGrey } : {}}>D' WORLD</Title>
        </TitleButton>
        <ModeIcon isLightMode={isLightMode} onClick={onModeIcon} />
      </Wrap>
    </Container>
  )
}
type ButtonProps = { onClick: AppFn; isLightMode: boolean }
export function MenuIcon({ onClick, isLightMode, css }: ButtonProps & { css?: CSSProperties }) {
  return (
    <MenuWrap onClick={onClick} css={{ ...css }}>
      <Span style={{ backgroundColor: isLightMode ? colors.grey : colors.lightGrey }} />
      <Span style={{ backgroundColor: isLightMode ? colors.lightGrey : colors.grey }} />
      <Span style={{ backgroundColor: isLightMode ? colors.grey : colors.lightGrey }} />
      <Span style={{ backgroundColor: isLightMode ? colors.grey : colors.lightGrey }} />
    </MenuWrap>
  )
}

export function ModeIcon({ onClick, isLightMode }: ButtonProps) {
  const Button = styled("button", {
    width: 40,
    height: 40,
    border: "none",
    borderRadius: 5,
    backgroundColor: "transparent",
    color: !isLightMode ? colors.lightGrey : colors.grey,
  })
  return (
    <Button onClick={onClick}>
      <FontAwesomeIcon icon={!isLightMode ? faMoon : faSun} />
    </Button>
  )
}

const Button = styled("button", {
  backgroundColor: "transparent",
  border: "none",
})

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

const MenuWrap = styled("div", {
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
