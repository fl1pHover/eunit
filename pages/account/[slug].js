import AdContent from "@/components/home/adContent";

import MainContainer from "@/layout/mainContainer";
import { STYLES } from "@/styles/index";
import mergeNames from "@/util/mergeNames";
import { Image } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import urls from "../../constants/api";
import { useRouter } from "next/router";
import CustomToast from "@/util/customToast";
import { useSelector } from "react-redux";

const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Accounts = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [content, setContent] = useState("UserAds");
  const [ads, setAds] = useState([]);
  const [sAds, setSAds] = useState([]);

  const getUser = async () => {
    await axios
      .get(`${urls["test"]}/user/${router.query.slug}`)
      .then(async (d) => {
        setUser(d.data);
      });
  };
  const getAds = async () => {
    await axios
      .post(`${urls["test"]}/ad/many/0/false/10/created/all`, user.ads)
      .then((d) => {
        setAds(d.data);
      });
    await axios
      .post(`${urls["test"]}/ad/many/0/false/10/created/sharing`, user.ads)
      .then((d) => {
        setSAds(d.data);
      });
  };
  const tabs = [
    {
      tabHeader: "Зарууд",
      title: "UserAds",

      comp: <UserAds ads={ads} />,
    },
    {
      tabHeader: "Хуваалцсан зарууд",
      title: "SharingAds",
      comp: <SharingAds ads={sAds} />,
    },
  ];

  useEffect(() => {
    if (user) getAds();
  }, [user]);

  useEffect(() => {
    getUser();
  }, [router.query.slug]);
  return (
    <MainContainer py={5}>
      <div className={mergeNames("flex flex-col gap-3 px-2")}>
        <div
          className={mergeNames(
            "w-full p-3 sm:p-6 md:p-10 bg-white shadow-xl rounded-xl",
            "flex flex-row"
          )}
        >
          <div
            className={mergeNames(
              STYLES.flexCenter,
              "flex-col w-full items-center gap-4 md:gap-16 sm:flex-row"
            )}
          >
            <Image
              src={
                user?.profileImg ??
                "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png"
              }
              alt="User"
              className={mergeNames(
                "h-[75px] w-[75px] md:h-[150px] md:w-[150px] border border-gray-300",
                "rounded-full aspect-square object-cover"
              )}
            />

            <div className="flex flex-col w-full gap-5">
              {/* //TODO: Profile name, agent type */}
              <div
                className={mergeNames(
                  STYLES.flexBetween,
                  "xs:flex-row flex-col sm:justify-between justify-around items-center gap-2 xs:text-left text-center"
                )}
              >
                <div>
                  <h1 className="text-lg font-bold md:text-3xl">
                    {user?.username}
                  </h1>
                  <h3 className="font-bold text-blue-600 capitalize text-md">
                    {user?.userType == "default"
                      ? "Энгийн"
                      : user?.userType == "agent"
                      ? "Агент"
                      : user?.userType == "organization"
                      ? "Байгууллага"
                      : user?.userType}
                  </h3>
                </div>
                <p
                  className={mergeNames(
                    STYLES.flexCenter,
                    "items-center",
                    "px-4 py-2 text-md md:text-lg font-bold text-white bg-blue-600 rounded-md cursor-pointer gap-1 md:gap-2"
                  )}
                  onClick={() => router.push(`tel:${user?.phone}`)}
                >
                  <FaPhoneAlt /> +976 {user?.phone}
                </p>
              </div>
              {/* //TODO: Social Hayg */}

              {user?.socials && <Socials user={user} />}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-5 border-b cursor-pointer border-b-bgGrey lg:text-base text-[12px]">
          {tabs.map((tab, index) => {
            return (
              <button
                key={index}
                className={mergeNames("pb-3 relative")}
                onClick={() => {
                  setContent(tab.title);
                }}
              >
                {tab.tabHeader}
                <div
                  className={mergeNames(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 bg-mainBlue h-[2px]  duration-300",
                    content === tab.title ? "w-full " : "w-0"
                  )}
                ></div>
              </button>
            );
          })}
        </div>

        <div className="min-h-[40vh]">
          {tabs.map((tab, index) => {
            return (
              tab.title && (
                <>
                  <div
                    className={
                      mergeNames()

                      // tab.title && tab.comp ? "block" : "hidden"
                    }
                    key={index}
                  >
                    {content === tab.title && tab.comp}
                  </div>
                </>
              )
            );
          })}
        </div>
      </div>
    </MainContainer>
  );
};
export default Accounts;

const UserAds = ({ ads }) => {
  return <>{ads && <AdContent title="" data={ads} showLink="hidden" />}</>;
};
const SharingAds = ({ ads }) => {
  return (
    <>
      {ads ? (
        <AdContent title="" showLink="hidden" data={ads} />
      ) : (
        <div>Зар байхгүй</div>
      )}
    </>
  );
};

const Socials = ({ user }) => {
  const [socials, setSocials] = useState([
    {
      name: "facebook",
      url: user?.socials[0]?.url ?? "",
    },
    {
      name: "instagram",
      url: user?.socials[1]?.url ?? "",
    },
    {
      name: "telegram",
      url: user?.socials[2]?.url ?? "",
    },
  ]);

  return (
    <div className="flex flex-row justify-center gap-2 sm:justify-start md:gap-5 ">
      {socials?.map((s, i) => {
        return s.url != "" ? (
          <Link href={s.url} key={i}>
            <a
              target="_blank"
              className={mergeNames(
                STYLES.flexCenter,
                "items-center gap-2",
                "px-3 py-2 rounded-xl",
                "transition-all ease-in-out",
                "hover:bg-[#e3f2fd] hover:text-blue-500"

                // socials.length - 1 ? 'mr-5' : ''
              )}
            >
              <Image
                className="h-[30px] w-[30px]"
                src={`/utils/socials/` + capitalizeFirst(s.name) + `.svg`}
                alt="social icon"
              />
              <p className="hidden font-bold sm:block text-md">
                {capitalizeFirst(s.name)}
              </p>
            </a>
          </Link>
        ) : (
          <></>
        );
      })}
    </div>
  );
};
