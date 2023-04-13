// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectMongo, menuModel } from "@/lib"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = Api

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method } = req
  await connectMongo()
  if (method === "GET") {
    try {
      const menus = await menuModel.find({})
      return res.send({ success: true, payload: menus })
    } catch (error: any) {
      return res.send({ success: false, message: error.message })
    }
  } else {
    let { _id, name, path, target } = req.body as { name: string; path: string; _id: string; target: string }
    const { targetname, menuid } = req.query as {
      targetname: string
      menuid: string
    }
    if (menuid) {
      _id = menuid
    }
    if (targetname) {
      target = targetname
    }

    const menu = (await menuModel.findById(_id)) as { items: Menu[] }
    let items: Menu[] = menu?.items ? [...menu.items] : []

    if (method === "POST") {
      const check = items.find((item) => item.name === name)
      if (check) {
        return res.send({ success: false, message: "이미 존재하는 메뉴입니다." })
      }
      items.push({ name, path })
    } else if (method === "PATCH") {
      const index = items.findIndex((item) => item.name === target)
      items[index] = { ...items[index], name }
    } else if (method === "DELETE") {
      items = items.filter((item) => item.name !== target)
    }

    try {
      await menuModel.findByIdAndUpdate(_id, { $set: { items } })
      return res.send({ success: true, message: method === "POST" ? "하위메뉴 추가" : method === "PATCH" ? "하위메뉴 수정" : "하위메뉴 삭제" })
    } catch (error: any) {
      return res.send({ success: false, message: error.message })
    }
  }
}
