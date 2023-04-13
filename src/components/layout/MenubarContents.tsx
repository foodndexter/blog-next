import { adminEmails, colors } from "@/assets"
import { useTheme, useUser } from "@/core"
import { faReact } from "@fortawesome/free-brands-svg-icons"
import { faArrowRightToBracket, faChevronDown, faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { styled } from "@stitches/react"
import axios from "axios"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import React from "react"
import { useMutation } from "react-query"

const backgroundColor = "rgba(0,0,0,.03)"
const darkBG = "rgba(255, 255, 255, .03)"

export default function Contents({ menus, onClose }: { menus: Menu[]; onClose: AppFn }) {
  const { isLightMode } = useTheme()
  const { isLoggedIn, user } = useUser()
  const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    rowGap: 5,
    marginTop: 10,
    justifyContent: "space-between",
    height: "calc(100% - 50px)",
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
    justifyContent: "flex-start",
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
    if (!items || items.length <= 0) {
      console.log("no other items to render")
      onClose()
      router.push({
        pathname: `/${path}`,
      })
    }
  }

  const signoutFn = useMutation({
    mutationFn: async (): Promise<Api> => {
      const { data } = await axios.post("api/auth/signout", { email: user.email })
      return data
    },
    onSuccess: (res) => {
      const { success, message, payload } = res
      signOut()
      if (!success) {
        console.log(message)
      } else {
        signOut()
      }
    },
  })

  const onAuth = () => {
    onClose()
    if (isLoggedIn) {
      signoutFn.mutate()
    }
    !isLoggedIn &&
      router.push({
        pathname: "/signin",
      })
  }

  const onSetting = () => {
    console.log("admin")
    onClose()
    router.push({
      pathname: "/admin",
    })
  }
  return (
    <Container>
      <Wrap>
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
      </Wrap>
      <Wrap>
        {adminEmails.find((item) => item === user?.email) && (
          <Item onClick={onSetting}>
            <IconArea>
              <FontAwesomeIcon icon={faGear} style={{ transform: isLoggedIn ? undefined : "rotate(180deg)" }} />
            </IconArea>
            <Text>Admin Panel</Text>
          </Item>
        )}
        <Item onClick={onAuth}>
          <IconArea>
            <FontAwesomeIcon icon={faArrowRightToBracket} style={{ transform: isLoggedIn ? undefined : "rotate(180deg)" }} />
          </IconArea>
          <Text>{isLoggedIn ? "Sign-out" : "Sign-in"}</Text>
        </Item>
      </Wrap>
    </Container>
  )
}

const Wrap = styled("div", {
  display: "flex",
  flexDirection: "column",
  rowGap: 5,
})
