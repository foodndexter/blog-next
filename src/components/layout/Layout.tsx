import React, { PropsWithChildren } from "react"
import Header from "./Header"
import Menubar from "./Menubar"
import Navbar from "./Navbar"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Menubar />
      <Navbar />
      {children}
    </>
  )
}
