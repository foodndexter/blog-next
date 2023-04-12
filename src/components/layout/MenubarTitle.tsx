import React from "react"
import { useTheme } from "@/core"
import { styled } from "@stitches/react"
import { colors } from "@/assets"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

const backgroundColor = "rgba(0,0,0,.03)"
const darkBG = "rgba(255, 255, 255, .03)"

export default function Title({ onClose }: { onClose: AppFn }) {
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
