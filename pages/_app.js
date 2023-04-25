import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider, useAuth } from "context/auth";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import Navbar from "@/components/navbar";
import Layout from "@/layout/layout";
import { MainLoader } from "@/lib/Loader";
import ScrollTop from "@/lib/ScrollTop";
import theme from "@/lib/theme";
import "@/styles/globals.scss";
import Router from "next/router";
import { useRouter } from "next/router";
import AdminBar from "@/components/admin/AdminBar";

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
              <Navbar />
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
