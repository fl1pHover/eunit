import Head from 'next/head';
import Footer from '../components/footer/index';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>BOM</title>
        <meta name="description" content="Bom, zariin site" />
        <link rel="icon" href="/images/logo/bom-blue.png" />
      </Head>
      <div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      >
        {children}
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>

      <div className="block h-20 md:hidden" />
    </>
  );
};

export default Layout;
