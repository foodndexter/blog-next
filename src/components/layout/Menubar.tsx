import { activeMenuHandler, selectMenu, useAppDispatch, useAppSelector } from "@/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { styled } from "@stitches/react"
import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { colors } from "@/assets"
import { faReact } from "@fortawesome/free-brands-svg-icons"

export default function Menubar() {
  const { activeMenu, menus } = useAppSelector(selectMenu)
  const dispatch = useAppDispatch()
  const onClose = () => dispatch(activeMenuHandler("off"))
  return (
    <Container css={{}} style={activeMenu ? {} : { visibility: "hidden", opacity: 0 }}>
      <Wrap css={{ transition: "all .2s ease-out" }} style={activeMenu ? {} : { marginLeft: "-100%" }}>
        <Title onClose={onClose} />
        <Contents menus={menus} />
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

function Title({ onClose }: { onClose: AppFn }) {
  const Container = styled("div", {
    display: "flex",
    width: "100%",
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,.03)",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,.05)",
    },
    columnGap: 10,
    alignItems: "center",
  })
  const IconArea = styled("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,.02)",
    fontWeight: 900,
  })
  const TextButton = styled("button", {
    borderRadius: 5,
    border: "none",
    fontSize: 16,
    height: 40,
    width: "calc(100% - 90px)",
    backgroundColor: "transparent",
  })
  const CloseIcon = styled("button", {
    width: 20,
    height: 20,
    borderRadius: 3,
    backgroundColor: "rgba(0,0,0,.02)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    color: colors.grey,
    border: "none",
    marginLeft: 5,
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

function Contents({ menus }: { menus: Menu[] }) {
  const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    rowGap: 5,
    marginTop: 10,
  })

  const Item = styled("button", {
    backgroundColor: "rgba(0,0,0,.02)",
    borderRadius: 5,
    height: 40,
    border: "none",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,.05)",
    },
    display: "flex",
    columnGap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  })
  const IconArea = styled("div", {
    width: 40,
    height: "100%",
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,.02)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 900,
    marginLeft: -5,
  })
  const MoreIcon = styled("div", {
    width: 20,
    height: 20,
    backgroundColor: "rgba(0,0,0,.02)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  })
  const Text = styled("div", {
    width: "calc(100% - 80px)",
    textAlign: "left",
  })
  const onMenuItem = (item: Menu) => {
    console.log(item)
  }
  return (
    <Container>
      {menus?.map((item) => (
        <Item key={item.name} onClick={() => onMenuItem(item)}>
          <IconArea>{item.name === "React.js" ? <FontAwesomeIcon icon={faReact} /> : "N"}</IconArea>
          <Text>{item.name}</Text>
          <MoreIcon>
            <FontAwesomeIcon icon={faChevronDown} style={{}} />
          </MoreIcon>
        </Item>
      ))}
    </Container>
  )
}
