import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from 'context/auth';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import Navbar from '@/components/navbar/index';
import Layout from '@/layout/layout';
import { MainLoader } from '@/lib/Loader';
import ScrollTop from '@/lib/ScrollTop';
import theme from '@/lib/theme';
import '@/styles/globals.scss';
import Router from 'next/router';

function MyApp({ Component, pageProps }) {
  let [isLoading, setIsLoading] = useState(false);

  const handleStart = (url) => setIsLoading(true);
  const handleComplete = (url) => {
    setIsLoading(false);
  };

  Router.events.on('routeChangeStart', handleStart);
  Router.events.on('routeChangeComplete', handleComplete);
  Router.events.on('routeChangeError', handleComplete);

  return (
    <AuthProvider>
      {isLoading && <MainLoader />}
      <ChakraProvider theme={theme}>
        <AnimatePresence>
          <Layout>
            <Navbar />
            <Component {...pageProps} />
            <ScrollTop />
          </Layout>
        </AnimatePresence>
      </ChakraProvider>
    </AuthProvider>

    //           </>
    //      )}
    // </>
  );
}

export default MyApp;
