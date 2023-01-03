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
import Layout from "../layout/layout";
import theme from "../lib/theme";
import "../styles/globals.scss";



function MyApp({ Component, pageProps }) {
  
  const [user, setUser] = useState({
    status: false,
    profileImg: "",
    username: "",
    email: "",
  });

  // onAuthStateChanged(auth, async (user) => {
  //   if (user && user.email) {
  //     let res;
  //     try {
  //       res = await axios.get(
  //         `https://bom-location.herokuapp.com/user/${user.email}`
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }

  //     if (res != undefined) {
  //       setUser((user) => ({
  //         ...user,
  //         username: res.data.username,
  //         profileImg: res.data.profileImg,
  //         email: res.data.email,
  //       }));
  //       setUser((user) => ({ ...user, status: true }));
  //     }
  //   } else {
  //     setUser((user) => ({
  //       ...user,
  //       username: "",
  //       profileImg: "",
  //       email: "",
  //       status: false,
  //     }));
  //   }
  // });



  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#1d1e44");
  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    
      <AuthProvider>
      {!loading ? (
        <ChakraProvider theme={theme}>
          <AnimatePresence>
            <Layout >
              <Navbar />
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
