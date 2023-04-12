// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectMongo, userModel } from "@/lib"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = Api

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email } = req.body as {
    email: string
  }

  await connectMongo()

  try {
    await userModel.findOneAndUpdate({ email }, { $set: { isLoggedIn: false } })
    return res.send({ success: true })
  } catch (error: any) {
    return res.send({ success: false, message: error.message, payload: "hellno" })
  }
}
