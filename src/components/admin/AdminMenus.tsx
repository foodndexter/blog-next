import { colors } from "@/assets"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { styled } from "@stitches/react"
import React, { useEffect, useRef, useState } from "react"

type Props = { menus: Menu[] }
export default function AdminMenus({ menus }: Props) {
  console.log(menus)

  const Container = styled("div", {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    width: "calc(100% - 24px)",
    columnGap: 10,
    margin: "10px auto",
  })
  return (
    <>
      {menus && menus.length > 0 ? (
        <Container>
          {menus.map((item, index) => (
            <Item key={index} {...item} />
          ))}
          <Item initial name="메뉴를 추가하세요" />
        </Container>
      ) : (
        <Container css={{ display: "block" }}>
          <Item name="등록된 메뉴가 없습니다." initial />
        </Container>
      )}
    </>
  )
}

function Item({ name, items, path, initial }: Menu & { initial?: boolean }) {
  const Container = styled("div", {
    border: "1px solid",
    backgroundColor: "white",
    borderColor: colors.lightGrey,
    padding: 10,
    boxShadow: "0 3px 6px rgba(0,0,0,.1)",
    borderRadius: 10,
    "&:hover": {
      boxShadow: "0 3px 6px rgba(0,0,0,.2)",
    },
  })

  const [adding, setAdding] = useState(false)

  const onInitial = () => {
    if (initial) {
      console.log("no menu")
      setAdding((prev) => !prev)
    }
  }
  return (
    <Container>
      <Wrap>
        {name}
        <AddButton onClick={onInitial} />
      </Wrap>
      {adding && <Form state={adding} />}
    </Container>
  )
}

type ButtonProps = { onClick?: AppFn }
function AddButton({ onClick }: ButtonProps) {
  return (
    <Button css={{ width: 30, height: 30, borderRadius: 15, border: "none", backgroundColor: colors.blue, color: "white" }} onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} />
    </Button>
  )
}

type FormProps = { state: boolean }
function Form({ state }: FormProps) {
  const Container = styled("form", {
    display: "flex",
    flexDirection: "column",
    rowGap: 10,
  })

  const Input = styled("input", {})

  const [name, setName] = useState("")

  const ref = useRef<HTMLInputElement | null>(null)
  const focus = () => ref.current?.focus()

  useEffect(() => {
    state && focus()
  }, [state])
  return (
    <Container>
      <input ref={ref} value={name} onChange={(e) => setName(e.target.value)} />
    </Container>
  )
}

const Wrap = styled("div", {
  display: "flex",
  alignItems: "center",
  columnGap: 10,
})

const Button = styled("button", {
  padding: 10,
  borderRadius: 5,
  border: "1px solid",
  fontSize: 16,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    opacity: 0.9,
  },
  "&:active": {
    opacity: 0.8,
  },
})
