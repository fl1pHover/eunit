import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import Navbar from "../components/navbar";
import Layout from "../layout/layout";
import theme from "../lib/theme";
import "../styles/globals.scss";

// function Loading() {
//      const router = useRouter();

//      const [loading, setLoading] = useState(false);

//      useEffect(() => {
//           const handleStart = (url) =>
//                url !== router.asPath && setLoading(true);
//           const handleComplete = (url) =>
//                url === router.asPath &&
//                setTimeout(() => {
//                     setLoading(false);
//                }, 5000);

//           router.events.on("routeChangeStart", handleStart);
//           router.events.on("routeChangeComplete", handleComplete);
//           router.events.on("routeChangeError", handleComplete);

//           return () => {
//                router.events.off("routeChangeStart", handleStart);
//                router.events.off("routeChangeComplete", handleComplete);
//                router.events.off("routeChangeError", handleComplete);
//           };
//      });

//      return (
//           loading && (
//                <div className="spinner-wrapper">
//                     <div className="spinner"></div>
//                </div>
//           )
//      );
//      console.log(loading);
// }

const firebaseConfig = {
     apiKey: "AIzaSyDrmzxc8MCm7PcO0Ood0MEvliD86e3RBEg",

     authDomain: "bomregistration.firebaseapp.com",

     projectId: "bomregistration",

     storageBucket: "bomregistration.appspot.com",

     messagingSenderId: "567513313511",

     appId: "1:567513313511:web:1d919d03c2334022667242",

     measurementId: "G-T3VWESJ3PF",
};
const app = initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }) {
     // if (typeof window !== "undefined") {
     //      const spinner = document.getElementById("spinner");

     //      if (spinner) {
     //           setTimeout(() => {
     //                spinner.style.display = "none";
     //                setLoading(false);
     //           }, 2000);
     //      }

     // }

     const auth = getAuth();
     const [user, setUser] = useState({
          status: false,
          profileImg: "",
          username: "",
          email: "",
     });

     onAuthStateChanged(auth, async (user) => {
          if (user && user.email) {
               let res;
               try {
                    res = await axios.get(
                         `https://bom-location.herokuapp.com/user/${user.email}`
                    );
               } catch (err) {
                    console.log(err);
               }

               if (res != undefined) {
                    setUser((user) => ({
                         ...user,
                         username: res.data.username,
                         profileImg: res.data.profileImg,
                         email: res.data.email,
                    }));
                    setUser((user) => ({ ...user, status: true }));
               }
          } else {
               setUser((user) => ({
                    ...user,
                    username: "",
                    profileImg: "",
                    email: "",
                    status: false,
               }));
          }
     });

     const logout = () => {
          console.log("asdf");
          signOut(auth)
               .then(() => {
                    setUser((user) => ({
                         ...user,
                         status: false,
                         username: "",
                         email: "",
                         profileImg: "",
                    }));
               })
               .catch((err) => {
                    console.log(err);
               });
     };

     return (
          <>
               {/* <Loading /> */}
               <ChakraProvider theme={theme}>
                    <Layout>
                         <Navbar user={user} logout={logout} />
                         <Component {...pageProps} />
                    </Layout>
               </ChakraProvider>
          </>
     );
}

export default MyApp;
