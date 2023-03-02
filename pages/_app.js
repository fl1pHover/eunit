import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider, useAuth } from 'context/auth';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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
        <MainLoader />
      )}
    </AuthProvider>

    //           </>
    //      )}
    // </>
  );
}

export default MyApp;
