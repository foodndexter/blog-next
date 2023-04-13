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
    maxAge: 60 * 60,
    updateAge: 28 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      await connectMongo()
      if (profile) {
        const _id = await crypto.randomBytes(16).toString("hex")
        const { email, name, kakao_account } = profile as { email: string; name?: string; kakao_account?: { email: string } }
        const user = await userModel.findOne({ email: kakao_account ? kakao_account.email : email })
        if (!user) {
          const newUser = { _id, email: kakao_account ? kakao_account.email : email, name, isLoggedIn: true }
          const res = await userModel.create(newUser)
          if (!res) {
            throw new Error("유저 회원가입 하면서 문제가 발생함")
          }
        } else {
          try {
            const res = await userModel.findOneAndUpdate({ email }, { $set: { isLoggedIn: true } })
            console.log(res)
          } catch (error: any) {
            throw new Error("로그인 하면서 활성화 단계에서 에러뜸")
          }
        }
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
