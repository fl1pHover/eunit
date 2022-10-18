import { ChakraProvider } from "@chakra-ui/react";
import theme from "../lib/theme";
import "../styles/globals.scss";
import Layout from "./layout/layout";
function MyApp({ Component, pageProps }) {
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
                    <Component {...pageProps} />
               </Layout>
          </ChakraProvider>
          //           </>
          //      )}
          // </>
     );
}

export default MyApp;
