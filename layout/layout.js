import { motion } from "framer-motion";
import Head from "next/head";
import React from "react";
import Footer from "../components/footer";
const Layout = ({ children, user }) => {
     return (
          <>
               <Head>
                    <title>BOM</title>
                    <meta name="description" content="Bom, zariin site" />
                    {/* <link rel="icon" href="/favicon.ico" /> */}
               </Head>
               <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
               >
                    {children}
               </motion.div>
               <Footer />
          </>
     );
};

export default Layout;
