import { colors } from "@/assets"
import { View } from "@/core"
import React, { useEffect, useState } from "react"

type Props = {
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  setValue?: React.Dispatch<React.SetStateAction<any>>
  placeholder?: string
}
export default function AppInput({ props, setValue, placeholder }: Props) {
  const { title, name, id, value } = props

  const [focused, setFocused] = useState(false)

  const onBlur = (value: any) => {
    if (value) {
      setFocused(true)
    } else setFocused(false)
  }

  useEffect(() => {
    onBlur(value)
  }, [value, onBlur])
  return (
    <View
      position={"relative"}
      css={{ minWidth: 180, height: 40, overflow: "hidden", borderRadius: 5, border: "1px solid rgba(0,0,0,.1)", backgroundColor: colors.lightGrey }}>
      {title && (
        <View
          as="label"
          htmlFor={id ? id : name}
          css={{ backgroundColor: "transparent", position: "absolute", top: 3, left: 3, fontSize: 10, color: colors.grey, zIndex: 1 }}>
          {title}
        </View>
      )}
      {placeholder && (
        <View
          as="label"
          htmlFor={id ? id : name}
          css={{
            backgroundColor: "transparent",
            position: "absolute",
            top: "calc(50% + 5px)",
            transform: "translateY(-50%)",
            width: "100%",
            textAlign: "center",
            color: colors.grey,
            zIndex: 1,
          }}
          transition="on"
          style={focused ? { opacity: 0, visibility: "hidden" } : {}}>
          {placeholder}
        </View>
      )}
      <input
        onBlur={onBlur}
        {...props}
        style={{ border: "none", height: "100%", backgroundColor: "transparent", position: "relative", zIndex: 2, padding: "15px 10px 5px" }}
      />
    </View>
  )
}
