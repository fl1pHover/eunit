import CompareSelect from "@/components/Profile/CompareSelect";
import urls from "@/constants/api";
import axios from "axios";
import { getCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBookmark } from "store/slice/bookmark";
import { setCategories } from "store/slice/category";
import { setUser } from "store/slice/user";
import Footer from "../components/footer/index";

const Layout = ({ children }) => {
  const token = getCookie("token");
  const dispatch = useDispatch();
  const { compare } = useSelector((state) => state.compare);
  const { user } = useSelector((state) => state.user);
  const { bookmarks } = useSelector((state) => state.bookmarks);
  const { categories } = useSelector((state) => state.categories);
  const getUser = async () => {
    if (user.userType == undefined && token) {
      await axios
        .get(`${urls["test"]}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((d) => {
          dispatch(setUser(d.data));
        });
    }
    if (categories?.length == 0) {
      await axios.get(`${urls["test"]}/category`).then((d) => {
        dispatch(setCategories(d.data));
      });
    }
  };

  useEffect(() => {
    if (
      user &&
      bookmarks &&
      bookmarks.length == 0 &&
      user?.bookmarks?.length > 0
    ) {
      dispatch(updateBookmark(user.bookmarks));
    }
  }, [user?.bookmarks]);
  useEffect(() => {
    getUser();
  }, [user, token]);

  const router = useRouter();
  return (
    <>
      <Head>
        <title>Eunit</title>
        <meta
          name="description"
          content="Eunit, үл хөдлөх хөрөнгийн зарын сайт"
        />
        <meta
          name="keywords"
          content="eunit, Eunit, үл хөдлөх, зарын сайт, гар утас, тээврийн хэрэгсэл, зарна, түрээслэнэ, монгол зарын сайт, хөрөнгийн үнэлгээ, хөрөнгө харьцуулалт, үнэлгээ хийх, "
        />
        <meta name="language" content="Mongolia" />
        <link rel="icon" href="/images/logo/bom-blue.png" />
      </Head>
      <div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      >
        {children}
        {compare &&
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
