// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectMongo, menuModel } from "@/lib"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = Api

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const method = req.method as ReqMethod
  await connectMongo()
  if (method === "GET") {
    try {
      const menus = await menuModel.find({})
      return res.send({ success: true, payload: menus })
    } catch (error: any) {
      return res.send({ success: false, message: error.message })
    }
  }
}
