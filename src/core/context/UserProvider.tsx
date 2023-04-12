import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { adminEmails } from "@/assets"

const initialState: User = {
  isLoggedIn: false,
  user: null,
}

const data = createContext(initialState)

export function UserProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)

  const { data: session, status } = useSession()
  useEffect(() => {
    setIsLoggedIn(status === "authenticated" ? true : false)
    setUser(session?.user ? session.user : null)
    console.log(session, status)
  }, [session, status])

  const router = useRouter()
  const [access, setAccess] = useState(false)

  useEffect(() => {
    if (router.pathname.includes("admin")) {
      if (!adminEmails.find((item) => item === user?.email)) {
        setAccess(false)
        console.log("이곳은 방문할 수가 엄씀다")
        router.push({
          pathname: "/",
        })
      } else setAccess(true)
    } else setAccess(true)
  }, [router])

  // const time = new Date()
  // const [lastAction, setLastAction] = useState(time)

  // useEffect(() => {
  //   setLastAction(time)
  //   console.log("movement detected")
  // }, [children])

  // useEffect(() => {
  //   console.log(lastAction)
  // }, [lastAction])

  return <data.Provider value={{ isLoggedIn, user }}>{access ? children : null}</data.Provider>
}

export function useUser() {
  return useContext(data)
}
