import { colors } from "@/assets"
import { Button, View } from "@/core"
import { faMinus, faPen, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import AdminForm from "./AdminForm"

type Props = { menus: Menu[] }
export default function AdminMenus({ menus }: Props) {
  return (
    <View
      css={{
        maxWidth: 500,
        margin: "0 auto",
        marginTop: 10,
        width: "calc(100% - 20px)",
        rowGap: 10,
        columnGap: 10,
        "@min500": {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        },
        "@min900": {
          maxWidth: 900,
          gridTemplateColumns: "1fr 1fr 1fr",
        },
      }}>
      {menus?.map((item) => (
        <AdminMenuItem key={item._id} {...item} />
      ))}
      <AdminMenuItem name="메뉴추가" />
    </View>
  )
}

function AdminMenuItem(props: Menu) {
  const { _id, items, name } = props
  const [form, setForm] = useState(false)
  const formHandler = () => setForm((prev) => !prev)

  const router = useRouter()
  const queryClient = useQueryClient()
  const addMenu = useMutation({
    mutationFn: async (name: string): Promise<Api> => {
      const { data } = await axios.post("api/menus", { name, path: name })
      return data
    },
    onSuccess: (res) => {
      const { success, message } = res
      console.log(message)
      if (success) {
        router.replace(router.asPath)
        queryClient.invalidateQueries({ queryKey: "menus" })
        formHandler()
      }
    },
  })

  const deleteMenu = useMutation({
    mutationFn: async (_id: string): Promise<Api> => {
      const { data } = await axios.delete(`api/menus?_id=${_id}`)
      return data
    },
    onSuccess: (res) => {
      const { success, message } = res
      console.log(message)
      if (success) {
        router.replace(router.asPath)
        queryClient.invalidateQueries({ queryKey: "menus" })
      }
    },
  })
  const onSubmit = (input: string) => {
    addMenu.mutate(input)
  }
  return (
    <>
      <View css={{ padding: 10, borderRadius: 10, backgroundColor: colors.lightGrey, rowGap: 10 }}>
        {name === "메뉴추가" ? (
          <AddButton onClick={formHandler} />
        ) : (
          <>
            <Row>
              <View as="p" css={{ fontWeight: 600 }}>
                {name}
              </View>
              <View type="row" css={{ columnGap: 5 }}>
                <Button color={"grey"} css={{ ...buttonStyle, fontSize: 10 }} onClick={formHandler}>
                  <FontAwesomeIcon icon={faPen} />
                </Button>
                <Button color={"red"} css={{ ...buttonStyle }} onClick={() => deleteMenu.mutate(_id)}>
                  <FontAwesomeIcon icon={name === "하위메뉴 추가" ? faPlus : faMinus} />
                </Button>
              </View>
            </Row>
            {items?.map((item) => (
              <AdminSubmenuItem key={item.name} {...item} title={name} _id={_id} />
            ))}
            <AdminSubmenuItem name="하위메뉴 추가" _id={_id} title={name} />
          </>
        )}
      </View>
      <AdminForm state={form} closeFn={formHandler} onSubmit={onSubmit} title="메뉴추가" />
    </>
  )
}

function AdminSubmenuItem({ name, title, _id }: Menu & { title?: string }) {
  const [form, setForm] = useState(false)
  const formHandler = () => setForm((prev) => !prev)

  const [edit, setEdit] = useState(false)
  const editHandler = () => setEdit((prev) => !prev)

  const router = useRouter()
  const queryClient = useQueryClient()

  const whenSuccess = (success: boolean) => {
    if (success) {
      router.replace(router.asPath)
      queryClient.invalidateQueries({ queryKey: "menus" })
      setForm(false)
      edit && editHandler()
    }
  }

  const url = "api/submenus"
  const deleteSubMenu = useMutation({
    mutationFn: async (): Promise<Api> => {
      console.log({
        target: name,
        _id,
      })
      const { data } = await axios.delete(`${url}?targetname=${name}&menuid=${_id}`, { withCredentials: true })
      return data
    },
    onSuccess: (res) => {
      const { success, message } = res
      console.log(message)
      whenSuccess(success)
    },
  })
  const editSubMenu = useMutation({
    mutationFn: async (input: { target: string; name: string }): Promise<Api> => {
      const { data } = await axios.patch(url, { ...input, _id })
      return data
    },
    onSuccess: (res) => {
      const { success, message } = res
      console.log(res)
      whenSuccess(success)
    },
  })

  const addSubMenu = useMutation({
    mutationFn: async (input: { name: string; path: string; _id: string }): Promise<Api> => {
      const { data } = await axios.post(url, { ...input })
      return data
    },
    onSuccess: (res) => {
      const { success, message } = res
      console.log(message, res)
      whenSuccess(success)
    },
  })

  const onSubmit = (input: string) => {
    edit ? editSubMenu.mutate({ target: name, name: input }) : addSubMenu.mutate({ name: input, path: input, _id })
  }
  const onEdit = () => {
    editHandler()
    formHandler()
  }

  const onDelete = () => {
    deleteSubMenu.mutate()
  }
  return (
    <>
      <Row>
        {name}
        <View type="row" css={{ columnGap: 5 }}>
          {name !== "하위메뉴 추가" && (
            <Button color={"grey"} css={{ ...buttonStyle, fontSize: 10 }} onClick={onEdit}>
              <FontAwesomeIcon icon={faPen} />
            </Button>
          )}
          <Button color={name === "하위메뉴 추가" ? "blue" : "red"} css={{ ...buttonStyle }} onClick={onDelete}>
            <FontAwesomeIcon icon={name === "하위메뉴 추가" ? faPlus : faMinus} />
          </Button>
        </View>
      </Row>
      <AdminForm
        state={form}
        closeFn={formHandler}
        onSubmit={onSubmit}
        title={`${title} ${edit ? "하위메뉴수정" : "하위메뉴추가"}`}
        payload={edit ? name : undefined}
      />
    </>
  )
}

function AddButton({ onClick }: { onClick?: AppFn }) {
  return (
    <Row>
      메뉴추가
      <Button css={{ ...buttonStyle }} onClick={onClick} color="blue">
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </Row>
  )
}

function Row({ children }: React.PropsWithChildren) {
  return (
    <View type="row" css={{ alignItems: "center", justifyContent: "space-between" }}>
      {children}
    </View>
  )
}
const buttonStyle = { padding: 0, width: 20, height: 20, borderRadius: 20 }
