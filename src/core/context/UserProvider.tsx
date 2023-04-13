import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { adminEmails } from "@/assets"
import axios from "axios"
import { useQuery } from "react-query"
import { menuHandler, useAppDispatch } from "../redux"

const initialState: User = {
  isLoggedIn: false,
  user: null,
}

const data = createContext(initialState)

export function UserProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  const { data: session, status } = useSession()
  useEffect(() => {
    console.log(session, status)
    if (session) {
      setIsLoggedIn(status === "authenticated" ? true : false)
      setUser(session.user ? session.user : null)
    }
    if (router.pathname.includes("admin")) {
      const check = adminEmails.find((item) => item === user?.email)
      if (status === "authenticated") {
        setAccess(check ? true : false)
      } else setAccess(false)
    } else setAccess(true)
  }, [session, status, router])

  const [access, setAccess] = useState(false)

  const dispatch = useAppDispatch()

  const { data: menus } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get("api/menus")
      return data
    },
    onSuccess: (res) => {
      const { success, payload } = res
      if (success) {
        console.log("fetched menus", res)
        dispatch(menuHandler(payload))
      }
    },
    refetchOnWindowFocus: true,
    queryKey: "menus",
  })

  useEffect(() => {
    console.log(access)
  }, [access])
  // const time = new Date()
  // const [lastAction, setLastAction] = useState(time)

  // useEffect(() => {
  //   setLastAction(time)
  //   console.log("movement detected")
  // }, [children])

  // useEffect(() => {
  //   console.log(lastAction)
  // }, [lastAction])

  return <data.Provider value={{ isLoggedIn, user }}>{access ? children : <p>Access Denied</p>}</data.Provider>
}

export function useUser() {
  return useContext(data)
}
