import Head from "next/head";
import Layout from "@/components/layout/layout";
// import Notification from "@/components/ui/notification";
import { NotificationContextProvider } from "@/store/notification-context";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="decription" content=""></meta>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          ></meta>
        </Head>
        <Component {...pageProps} />
    
      </Layout>
    </NotificationContextProvider>
  );
}
