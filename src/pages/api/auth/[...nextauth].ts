import NextAuth from "next-auth/next"
import GoogleProivder from "next-auth/providers/google"
import KakaoProvider from "next-auth/providers/kakao"
import { AuthOptions } from "next-auth"
import crypto from "crypto"
import { connectMongo, userModel } from "@/lib"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProivder({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  secret: "test",
  pages: {
    error: "/erorr",
    signOut: "/",
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60,
    updateAge: 28 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      await connectMongo()
      if (profile) {
        const _id = await crypto.randomBytes(16).toString("hex")
        const { email } = profile as { email: string }
        const users = await userModel.find({})
        console.log(profile, users)
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      } else if (new URL(url).origin === baseUrl) {
        return baseUrl
      }
      return baseUrl
    },
  },
}

export default NextAuth(authOptions)
