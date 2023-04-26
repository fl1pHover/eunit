import CompareSelect from "@/components/Profile/CompareSelect";
import urls from "@/constants/api";
import { useAuth } from "@/context/auth";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/footer/index";

const Layout = ({ children }) => {
  const { comparison } = useAuth();
  const comparisonCategory = getCookie("comparisonCategory");
  const [ads, setAds] = useState([]);
  const getAds = async () => {
    await axios
      .post(`${urls["test"]}/ad/many/0/false/5/created`, comparison)
      .then((d) => setAds(d.data.ads));
  };
  useEffect(() => {
    if (comparison.length > 0) {
      getAds();
    } else {
      setAds([]);
      setCookie("comparisonCategory", "");
    }
  }, [comparison]);
  const router = useRouter();
  return (
    <>
      <Head>
        <title>E-unit</title>
        <meta name="description" content="Bom, zariin site" />
        <link rel="icon" href="/images/logo/bom-blue.png" />
      </Head>
      <div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      >
        {children}
        {comparison &&
          ads &&
          (router?.pathname == "/" ||
            router?.pathname == "/category" ||
            router?.pathname == "/category/[slug]" ||
            router?.pathname == "/account/[slug]" ||
            (router?.pathname == "/account" &&
              (router?.query?.tab == "MyAds" ||
                router?.query?.tab == "Bookmark"))) && (
            <CompareSelect btnView={false} compareAds={ads} />
          )}
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>

      <div className="block h-20 md:hidden" />
    </>
  );
};

export default Layout;
