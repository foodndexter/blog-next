// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectMongo, menuModel } from "@/lib"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = Api

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // const method = req.method as ReqMethod
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
    if (method === "POST") {
      const input = req.body as { name: string; path?: string; items?: { name: string; path?: string } }

      const check = await menuModel.findOne({ name: input.name })
      if (!check) {
        try {
          const result = await menuModel.create(input)
          return res.send({ success: true, payload: result, message: "메뉴가 추가됨!" })
        } catch (error: any) {
          return res.send({ success: false, message: error.message })
        }
      }
      return res.send({ success: false, message: "중복된 이름이라서 안됨!" })
    } else if (method === "DELETE") {
      const { _id } = req.query as { _id: string }

      try {
        await menuModel.findByIdAndDelete(_id)
        return res.send({ success: true, message: "메뉴가 삭제되었습니다." })
      } catch (error: any) {
        return res.send({ success: false, message: error.message })
      }
    }
  }
}
