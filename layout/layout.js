import Head from "next/head";
import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Layout = ({ children }) => {
     return (
          <>
               <Head>
                    <title>BOM</title>
                    <meta name="description" content="Bom, zariin site" />
                    {/* <link rel="icon" href="/favicon.ico" /> */}
               </Head>
               {children}
               <Footer />
          </>
     );
};

export default Layout;
