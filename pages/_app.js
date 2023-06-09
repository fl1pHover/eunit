import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "context/auth";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import urls from "@/constants/api";
import Layout from "@/layout/layout";
import { MainLoader } from "@/lib/Loader";
import ScrollTop from "@/lib/ScrollTop";
import theme from "@/lib/theme";
import "@/styles/globals.scss";
import axios from "axios";
import { getCookie } from "cookies-next";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setUser } from "store/slice/user";
import { wrapper } from "store/store";
import AdminBar from "../components/admin/AdminBar";
import Navbar from "../components/navbar";
import { SessionProvider } from "next-auth/react";
function MyApp({ Component, ...pageProps }) {
  let [isLoading, setIsLoading] = useState(false);
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const handleStart = (url) => setIsLoading(true);
  const handleComplete = (url) => {
    setIsLoading(false);
  };

  const router = useRouter();
  Router.events.on("routeChangeStart", handleStart);
  Router.events.on("routeChangeComplete", handleComplete);
  Router.events.on("routeChangeError", handleComplete);

  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <AnimatePresence>
            <Layout>
              {isLoading && <MainLoader />}
              {/* <p>{JSON.stringify(Router)}</p> */}
              {router?.pathname.substring(0, 6) == "/admin" ? (
                <AdminBar />
              ) : (
                <Navbar />
              )}
              <Component {...pageProps} />
              <ScrollTop />
            </Layout>
          </AnimatePresence>
        </ChakraProvider>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
