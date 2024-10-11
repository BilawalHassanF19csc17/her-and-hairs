import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return <>
  <Head>
    <title>Her&Hair</title>
    <link rel="icon" href="/cropped-image-2.png" />
    <meta property="og:image" content="/cropped-image-2.png" />
  </Head>
  <Component {...pageProps} />
  </>
}
  