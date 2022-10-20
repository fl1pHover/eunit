import { Container } from "@chakra-ui/react";
import React, { Children } from "react";
import Head from "next/head";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Layout = ({ children }) => {
     return (
          <>
               <Head>
                    <title>BOM</title>
                    <meta name="description" content="Bom, zariin site" />
                    {/* <link rel="icon" href="/favicon.ico" /> */}
               </Head>
               <Navbar />
               {children}
               <Footer />
          </>
     );
};

export default Layout;
