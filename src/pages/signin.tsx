import { colors } from "@/assets"
import { useTheme } from "@/core"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { faComment } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { styled } from "@stitches/react"
import { signIn } from "next-auth/react"

export default function SigninPage() {
  const buttons = [
    { name: "Google", icon: faGoogle },
    { name: "Kakao", icon: faComment },
  ]

  const onClick = (name: string) => {
    signIn(name === "Google" ? "google" : "kakao", { redirect: true, callbackUrl: "/" })
  }

  const { isLightMode } = useTheme()
  return (
    <Container>
      {buttons.map(({ name, icon }) => (
        <Button style={isLightMode ? {} : { backgroundColor: colors.lightGrey }} key={name} onClick={() => onClick(name)}>
          <FontAwesomeIcon icon={icon} />
          {name}
        </Button>
      ))}
    </Container>
  )
}

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: 60,
  rowGap: 10,
})

const Button = styled("button", {
  backgroundColor: "rgba(0, 0, 0, .05)",
  height: 40,
  padding: 10,
  borderRadius: 5,
  border: "1px solid rgba(0,0,0, .1)",
  width: 160,
  display: "flex",
  justifyContent: "center",
  columnGap: 10,
  alignItems: "center",
})
