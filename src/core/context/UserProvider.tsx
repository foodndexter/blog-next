import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"

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
  }, [session, status])

  return <data.Provider value={{ isLoggedIn, user }}>{children}</data.Provider>
}

export function useUser() {
  return useContext(data)
}
