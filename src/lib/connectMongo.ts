import mongoose from "mongoose"

const url = process.env.MONGO_URL!

let cached: any = global

cached = cached.mongoose
if (!cached) {
  cached = { conn: null, promise: null }
}

export default async function () {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(url).then((mongo) => mongo)
  }

  try {
    cached.conn = await cached.promise
  } catch (error: any) {
    cached.promise = null
    throw error
  }

  return cached.conn
}
