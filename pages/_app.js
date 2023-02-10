import { Center, ChakraProvider } from '@chakra-ui/react';
import { AuthProvider, useAuth } from 'context/auth';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

import Navbar from '@/components/navbar/index';
import Layout from '@/layout/layout';
import ScrollTop from '@/lib/ScrollTop';
import theme from '@/lib/theme';
import '@/styles/globals.scss';

function MyApp({ Component, pageProps }) {
  let { loading } = useAuth();
  let [color, setColor] = useState('#1d1e44');
  let [category, setCategory] = useState();

  return (
    <AuthProvider>
      {!loading ? (
        <ChakraProvider theme={theme}>
          <AnimatePresence>
            <Layout>
              <Navbar />
              <Component {...pageProps} />
              <ScrollTop />
            </Layout>
          </AnimatePresence>
        </ChakraProvider>
      ) : (
        <Center width={'100vw'} height="100vh" className="loader">
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
