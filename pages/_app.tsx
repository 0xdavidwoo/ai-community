import Head from "next/head"
import "../styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>AI Forge · 造物社</title>
        <meta name="description" content="AI Forge - Build, learn and launch AI products together." />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

