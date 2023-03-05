import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from 'context/auth';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import Navbar from '@/components/navbar/index';
import Layout from '@/layout/layout';
import { MainLoader } from '@/lib/Loader';
import ScrollTop from '@/lib/ScrollTop';
import theme from '@/lib/theme';
import '@/styles/globals.scss';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  // let { loading } = useAuth();
  let [color, setColor] = useState('#1d1e44');
  let [category, setCategory] = useState();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false);
      }, 1000);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });
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
