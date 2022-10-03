import "../styles/globals.scss";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./lib/theme";
import Layout from "./layout/layout";

function MyApp({ Component, pageProps }) {
     return (
          <ChakraProvider theme={theme}>
               <Layout>
                    <Component {...pageProps} />
               </Layout>
          </ChakraProvider>
     );
}

export default MyApp;
