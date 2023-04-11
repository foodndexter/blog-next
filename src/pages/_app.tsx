import { Layout } from "@/components"
import { store, ThemeProvider } from "@/core"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Provider store={store}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  )
}
