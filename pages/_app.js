import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "context/auth";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import AdminBar from "@/components/admin/AdminBar";
import Navbar from "@/components/navbar";
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

function MyApp({ Component, pageProps }) {
  let [isLoading, setIsLoading] = useState(false);

  const handleStart = (url) => setIsLoading(true);
  const handleComplete = (url) => {
    setIsLoading(false);
  };
  const router = useRouter();
  Router.events.on("routeChangeStart", handleStart);
  Router.events.on("routeChangeComplete", handleComplete);
  Router.events.on("routeChangeError", handleComplete);
  const [user, setUser] = useState();
  const token = getCookie("token");
  const getUser = async () => {
    await axios
      .get(`${urls["test"]}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Headers": "*",
        },
      })
      .then((d) => setUser(d.data));
  };
  useEffect(() => {
    if (token) getUser();
  }, [token]);
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <AnimatePresence>
          <Layout>
            {isLoading && <MainLoader />}
            {/* <p>{JSON.stringify(Router)}</p> */}
            {router?.pathname.substring(0, 6) == "/admin" ? (
              <AdminBar />
            ) : (
              <Navbar user={user} />
            )}

            <Component {...pageProps} />
            <ScrollTop />
          </Layout>
        </AnimatePresence>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
