import React, { useEffect, useRef, useState } from "react"
import { View, Button } from "@/core"
import { AppInput } from "../utils"

export default function AdminForm({
  onSubmit,
  closeFn,
  state,
  title,
  payload,
}: {
  onSubmit?: AppFn
  closeFn?: AppFn
  state: boolean
  title?: string
  payload?: string
}) {
  const ref = useRef<HTMLInputElement | null>(null)
  const focus = () => ref.current?.focus()

  const [input, setInput] = useState("")
  useEffect(() => {
    state && focus()
  }, [state])

  useEffect(() => {
    setInput((prev) => (payload ? payload : prev))
  }, [payload])
  const onForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input) {
      console.log("제목을 입력해 주세요.")
      return focus()
    }
    onSubmit && onSubmit(input)
  }
  return (
    <View
      position="fixed"
      css={{ top: 0, left: 0, width: "100%", height: "100vh", justifyContent: "center", alignItems: "center" }}
      style={state ? {} : { visibility: "hidden", opacity: 0 }}>
      <View
        as="form"
        onSubmit={onForm}
        position="relative"
        css={{
          zIndex: 2,
          padding: 10,
          borderRadius: 10,
          backgroundColor: "white",
          rowGap: 10,
        }}>
        {title && <View css={{ fontWeight: "bold", textAlign: "center" }}>{title}</View>}
        <AppInput
          props={{
            value: input,
            name: "nameInput",
            ref,
            onChange: (e) => setInput(e.target.value),
            title: "Title",
          }}
          placeholder="Enter Title"
        />
        <View type="row" css={{ columnGap: 10 }}>
          <Button color="lightGrey" type={"button"} onClick={closeFn} css={{ width: "100%" }}>
            Cancel
          </Button>
          <Button color="blue" type="submit" css={{ width: "100%" }}>
            {payload ? "Edit" : "Done"}
          </Button>
        </View>
      </View>
      <View type="bg" onClick={closeFn} />
    </View>
  )
}
