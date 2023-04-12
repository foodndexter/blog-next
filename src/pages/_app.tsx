import { Layout } from "@/components"
import { store, ThemeProvider, UserProvider } from "@/core"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux"
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <UserProvider>
            <ThemeProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </UserProvider>
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
