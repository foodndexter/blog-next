import { activeMenuHandler, selectMenu, useAppDispatch, useAppSelector, useTheme } from "@/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { styled } from "@stitches/react"
import React from "react"
import { useRouter } from "next/router"
import { colors } from "@/assets"
import { faReact } from "@fortawesome/free-brands-svg-icons"

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
        <Title onClose={onClose} />
        <Contents menus={menus} onClose={onClose} />
      </Wrap>
      <BG onClick={onClose} />
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

const backgroundColor = "rgba(0,0,0,.03)"
const darkBG = "rgba(255, 255, 255, .03)"

function Title({ onClose }: { onClose: AppFn }) {
  const { isLightMode } = useTheme()
  const Container = styled("div", {
    display: "flex",
    width: "100%",
    borderRadius: 5,
    backgroundColor: isLightMode ? backgroundColor : darkBG,
    "&:hover": {
      backgroundColor: isLightMode ? "rgba(0,0,0,.05)" : "rgba(255,255,255,.05)",
    },
    columnGap: 10,
    alignItems: "center",
    color: !isLightMode ? colors.lightGrey : undefined,
  })
  const IconArea = styled("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: isLightMode ? backgroundColor : darkBG,
    fontWeight: 900,
  })
  const TextButton = styled("button", {
    borderRadius: 5,
    border: "none",
    fontSize: 16,
    height: 40,
    width: "calc(100% - 90px)",
    backgroundColor: "transparent",
    color: !isLightMode ? colors.lightGrey : undefined,
  })
  const CloseIcon = styled("button", {
    width: 20,
    height: 20,
    borderRadius: 3,
    backgroundColor: isLightMode ? backgroundColor : darkBG,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    border: "none",
    marginLeft: 5,
    color: !isLightMode ? colors.lightGrey : colors.grey,
  })

  const router = useRouter()

  const onTitle = () => {
    onClose()
    router.push({ pathname: "/" })
  }

  return (
    <Container>
      <IconArea>D</IconArea>
      <TextButton onClick={onTitle}>D's World</TextButton>
      <CloseIcon onClick={onClose}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </CloseIcon>
    </Container>
  )
}

function Contents({ menus, onClose }: { menus: Menu[]; onClose: AppFn }) {
  const { isLightMode } = useTheme()
  const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    rowGap: 5,
    marginTop: 10,
  })

  const Item = styled("button", {
    backgroundColor: isLightMode ? backgroundColor : darkBG,
    borderRadius: 5,
    height: 40,
    border: "none",
    "&:hover": {
      backgroundColor: isLightMode ? "rgba(0,0,0,.05)" : "rgba(255,255,255,.05)",
    },
    display: "flex",
    columnGap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    color: isLightMode ? undefined : colors.lightGrey,
  })
  const IconArea = styled("div", {
    width: 40,
    height: "100%",
    borderRadius: 5,
    backgroundColor: isLightMode ? backgroundColor : darkBG,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 900,
  })
  const MoreIcon = styled("div", {
    width: 20,
    height: 20,
    backgroundColor: isLightMode ? backgroundColor : darkBG,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  })
  const Text = styled("div", {
    width: "calc(100% - 80px)",
    textAlign: "left",
  })

  const router = useRouter()
  const onMenuItem = (item: Menu) => {
    const { name, path, items } = item
    if (!items) {
      console.log("no other items to render")
      onClose()
      router.push({
        pathname: `/${path}`,
      })
    }
  }
  return (
    <Container>
      {menus?.map((item) => (
        <Item key={item.name} onClick={() => onMenuItem(item)} css={!item.items ? { justifyContent: "flex-start" } : {}}>
          <IconArea>{item.name === "React.js" ? <FontAwesomeIcon icon={faReact} /> : "N"}</IconArea>
          <Text css={!item.items ? {} : {}}>{item.name}</Text>
          {item.items && (
            <MoreIcon>
              <FontAwesomeIcon icon={faChevronDown} style={{}} />
            </MoreIcon>
          )}
        </Item>
      ))}
    </Container>
  )
}
