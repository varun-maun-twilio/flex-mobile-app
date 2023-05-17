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
        <meta name="viewport" content="minimal-ui, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />


<link rel="apple-touch-startup-image" href="https://www.twilio.com/content/dam/twilio-com/core-assets/social/apple-touch-icon.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="https://www.twilio.com/content/dam/twilio-com/core-assets/social/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="72x72" href="https://www.twilio.com/content/dam/twilio-com/core-assets/social/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="114x114" href="https://www.twilio.com/content/dam/twilio-com/core-assets/social/favicon-16x16.png">
         
      </Head>
      <ToastContainer />
      <SessionProvider session={session}  >
      <Component {...pageProps} />
      </SessionProvider>
    </div>

  )
}

export default MyApp
