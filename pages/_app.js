import Head from 'next/head'
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  



  return (

    <div className={"container mx-0 flex flex-col h-full v-full"} style={ {maxHeight: "-webkit-fill-available",maxWidth:"100vw"}}>
      <Head>
        <title>Flex Mobile App</title>

      </Head>
      <ToastContainer />
      <SessionProvider session={session}  basePath="/flex-mobile-app/api/auth" >
      <Component {...pageProps} />
      </SessionProvider>
    </div>

  )
}

export default MyApp
