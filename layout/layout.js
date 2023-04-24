import CompareSelect from "@/components/Profile/CompareSelect";
import { useAuth } from "@/context/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../components/footer/index";

const Layout = ({ children }) => {
  const { compareAds } = useAuth();
  const router = useRouter();
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
        {compareAds &&
          (router?.pathname == "/" ||
            router?.pathname == "/category" ||
            router?.pathname == "/category/[slug]" ||
            router?.pathname == "/account/[slug]" ||
            (router?.pathname == "/account" &&
              (router?.query?.tab == "MyAds" ||
                router?.query?.tab == "Bookmark"))) && (
            <CompareSelect btnView={false} />
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
