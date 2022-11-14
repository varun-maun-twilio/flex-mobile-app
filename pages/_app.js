import Head from 'next/head'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (

    <div className={"container mx-0 flex flex-col h-full v-full"} style={ {maxHeight: "-webkit-fill-available",maxWidth:"100vw"}}>
      <Head>
        <title>Flex Mobile App</title>

      </Head>
      <Component {...pageProps} />

    </div>

  )
}

export default MyApp
