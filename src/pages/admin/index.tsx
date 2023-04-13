import { colors } from "@/assets"
import { AdminMenus, AdminStats } from "@/components"
import { menuHandler, useAppDispatch } from "@/core"
import { styled } from "@stitches/react"
import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

export default function AdminIndexPage(props: Api) {
  const [menus, setMenus] = useState<Menu[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(menuHandler(menus))
  }, [menus, dispatch])
  useEffect(() => {
    const { success, message, payload } = props
    if (!success) {
      console.log(message)
    } else setMenus(payload)
  }, [props])

  const router = useRouter()
  const onMenu = () => {
    router.push({
      query: {
        content: "menus",
      },
    })
  }

  const onStats = () => {
    router.push({
      query: {
        content: "stats",
      },
    })
  }
  return (
    <>
      <Wrap>
        <Button onClick={onMenu} style={router.query.content === "menus" ? { backgroundColor: colors.blue, color: "white" } : {}}>
          메뉴관리
        </Button>
        <Button onClick={onStats} style={router.query.content === "stats" ? { backgroundColor: colors.blue, color: "white" } : {}}>
          통계
        </Button>
      </Wrap>
      {router.query && router.query.content === "menus" ? <AdminMenus menus={menus} /> : <AdminStats />}
    </>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get("http://localhost:3000/api/menus")
  return {
    props: data,
  }
}

const Button = styled("button", {
  padding: 10,
  borderRadius: 5,
  border: "1px solid rgba(0, 0, 0, .1)",
  "&:hover": {
    backgroundColor: colors.grey,
    color: "white",
  },
  transition: "all .2s ease-out",
})
const Wrap = styled("div", {
  display: "flex",
  justifyContent: "center",
  columnGap: 10,
  marginTop: 10,
})
