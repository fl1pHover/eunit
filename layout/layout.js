import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Footer from "@/components/footer/index";

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
      <div className="md:block hidden">
        <Footer />
      </div>
      <div className="md:hidden block h-20" />
    </>
  );
};

export default Layout;
