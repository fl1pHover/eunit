import { NavContainer } from "@/lib/Container";
import { STYLES } from "@/styles/index";
import { Image } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { MdOutlineClear } from "react-icons/md";
import { useSelector } from "react-redux";
import urls from "../../constants/api";
import { useAuth } from "../../context/auth";
import mergeNames from "../../util/mergeNames";
import CreateAdNav from "./createAdNav";
import { EstimatorIcon, UserIcon, WhiteHeartIcon } from "./icons";
import NavCategory from "./navCategory";
import UserDrawer from "./userDrawer";

const Bottom = ({ sticky }) => {
  const router = useRouter();
  const token = getCookie("token");
  const { user } = useSelector((state) => state.user);
  const { setDefaultAds, setSpecialAds, setAds, logout } = useAuth();
  // Visible start

  const [isHoveringId, setIsHoveringId] = useState(true);
  const [activeSearch, setActiveSearch] = useState(false);
  const handleMouseOver = (id) => {
    setIsHoveringId(id);
  };

  const handleMouseOut = () => {
    setIsHoveringId(false);
  };
  // Visible end

  // Search start
  const [search, setSearch] = useState("");
  const searchAds = async (value) => {
    try {
      await fetch(`${urls["test"]}/ad/search/{value}?value=${value}`)
        .then((d) => d.json())
        .then((d) => {
          setDefaultAds(d?.defaultAds);
          setSpecialAds(d?.specialAds);
          let ad = d?.specialAd?.ads.concat(d?.defaultAds?.ads);
          setAds({ ads: ad, limit: ad?.length ?? 0 });
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = (e) => {
    // 👇️ clear input value
    setSearch("");
    console.log("clear input");
  };

  // Search end

  return (
    <div className={mergeNames("md:block hidden", "bg-mainBlossom ")}>
      <NavContainer>
        <div className="flex flex-row items-center justify-center gap-10">
          <div className="flex flex-row items-center ">
            <Link href="/">
              <a className="p-2">
                <Image
                  src="/images/logo/bom-white.png"
                  alt="Logo"
                  className="h-6"
                />
              </a>
            </Link>

            <NavCategory />
          </div>

          {/* baruun taliin bookmark search etc */}
          <div className="flex flex-row items-center text-white">
            <button
              className="h-full px-2"
              onClick={() => setActiveSearch(true)}
            >
              <HiOutlineSearch />
            </button>
            <WhiteHeartIcon
              onClick={() => router.push("/account?tab=Bookmark")}
            />

            {user?.userType != undefined ? (
              <UserDrawer user={user} />
            ) : (
              <UserIcon text="Нэвтрэх" onClick={() => router.push("/login")} />
            )}
            <CreateAdNav />
            <EstimatorIcon onClick={() => router.push("/estimator")} />
            {/* <Link href={'/createAd'}>
              <button className="px-4 py-1 ml-2 text-sm font-semibold transition-all bg-teal-700 rounded-lg hover:scale-105">
                <p>Зар нэмх</p>

              </button>
            </Link> */}
          </div>
        </div>

        {/* Search input */}
        {activeSearch && (
          <motion.div
            onMouseOut={() => setActiveSearch(false)}
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                stiffness: 0,
                ease: "easeInOut",
                duration: 0.3,
              },
            }}
            onMouseOver={() => setActiveSearch(true)}
            className={mergeNames(
              "bg-blue-900/[0.96] w-full absolute left-0",
              "py-2",
              STYLES.flexCenter,
              "items-center text-2xl text-blue-300"
            )}
          >
            <div className="relative flex flex-row items-center w-2/5 h-10">
              <button className="disabled">
                <HiOutlineSearch
                  onClick={async () => {
                    searchAds();
                  }}
                />
              </button>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Зараа хайна уу"
                onKeyPress={(e) => {
                  if (event.key === "Enter") {
                    () => func(search), console.log("Searching!!");
                  }
                }}
                value={search}
                className={mergeNames(
                  "h-full w-full ml-2 border-none rounded-md placeholder-blue-300/40 bg-mainBlossom bg-opacity-40  focus:ring-0 "
                )}
              />
              <button
                onClick={handleClear}
                className={mergeNames(
                  "text-xs rounded-full p-[2px] bg-mainBlossom/80",
                  "absolute right-2"
                )}
              >
                <MdOutlineClear />
              </button>
            </div>
          </motion.div>
        )}
      </NavContainer>
    </div>
  );
};

export default Bottom;

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });

  if (!token)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
}
