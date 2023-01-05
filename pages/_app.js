import { Center, ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import { AuthProvider } from "context/auth";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
// import Navbar from "../components/navbar";
import Navbar from "../components/navbar/index";
import urls from "../constants/api";
import Layout from "../layout/layout";
import theme from "../lib/theme";
import "../styles/globals.scss";



function MyApp({ Component, pageProps }) {
  


  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#1d1e44");
  let [category, setCategory] = useState()
  const getData = async () => {
    try {
      axios.get(`${urls['test']}/category`).then((d) => {
        setCategory(d.data['categories'])
      })
      setLoading(false)
    } catch(e) {
      setLoading(false)
      console.log(e)
    }
  }
  useEffect(() => {
    setLoading(true);
    getData()
    
  }, []);

  return (
    
      <AuthProvider>
      {!loading ? (
        <ChakraProvider theme={theme}>
          <AnimatePresence>
            <Layout >
              <Navbar data = {category} />
              <Component {...pageProps} />
            </Layout>
          </AnimatePresence>
        </ChakraProvider>
      ) : (
        <Center width={"100vw"} height="100vh" className="loader">
           <Head>
        <title>BOM</title>
        <meta name="description" content="Bom, zariin site" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
          <PulseLoader color={color} loading={loading} size={30} />
        </Center>
      )}
      </AuthProvider>
    
    //           </>
    //      )}
    // </>
  );
}

export default MyApp;
