import { ChakraProvider } from "@chakra-ui/react";
import theme from "../lib/theme";
import "../styles/globals.scss";
import Layout from "../layout/layout";
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth'
import { useState } from "react";
import Navbar from "../components/navbar";
import { initializeApp } from "firebase/app";
import axios from "axios";
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
     const auth = getAuth()
     const [user, setUser] = useState({status: false, profileImg: '', username: '', email: ''})
     
     onAuthStateChanged(auth, async (user) => {
          if(user && user.email) {
               let res 
               try {
                   res = await axios.get(`https://bom-location.herokuapp.com/user/${user.email}`)
               } catch(err) { 
                    console.log(err)
               }

               if(res != undefined)
               {
                    setUser((user) => ({...user, username: res.data.username, profileImg: res.data.profileImg, email: res.data.email}))
               setUser((user) => ({...user, status: true}))
               }
          } else {
               setUser((user) => ({...user, username: '', profileImg: '', email: '', status: false}))
          }
     })

     const logout = () => {
          console.log('asdf')
          signOut(auth).then(() => {
               setUser((user) => ({...user, status: false, username: '', email: '', profileImg: ''}))
          }).catch((err) => {
               console.log(err)
          })
     }
     // const [playAnimation, setPlayAnimation] = useState(false);

     // // This will run one time after the component mounts
     // useEffect(() => {
     //      const onPageLoad = () => {
     //           setPlayAnimation(true);
     //      };

     //      // Check if the page has already loaded
     //      if (document.readyState === "complete") {
     //           onPageLoad();
     //      } else {
     //           window.addEventListener("load", onPageLoad);
     //           // Remove the event listener when component unmounts
     //           return () => window.removeEventListener("load", onPageLoad);
     //      }
     // }, []);

     return (
          // <>
          //      {playAnimation ? (
          //           <ClipLoader
          //                color={"#00000"}
          //                loading={playAnimation}
          //                size={150}
          //                aria-label="Loading Spinner"
          //                data-testid="loader"
          //           />
          //      ) : (
          //           <>
          <ChakraProvider theme={theme}>
               <Layout>
                    <Navbar user={user} logout={logout}/>
                    <Component {...pageProps} />
               </Layout>
          </ChakraProvider>
          //           </>
          //      )}
          // </>
     );
}

export default MyApp;
