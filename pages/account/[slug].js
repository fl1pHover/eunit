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

const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Accounts = ({ propUser }) => {
  const router = useRouter();
  const [ads, setAds] = useState([]);
  const getAds = async () => {
    await axios
      .post(`${urls["test"]}/ad/many/0/false`, propUser.ads)
      .then((d) => {
        setAds(d.data);
      });
  };

  useEffect(() => {
    if (propUser) getAds();
  }, [propUser]);
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
                propUser?.profileImg ??
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
                    {propUser.username}
                  </h1>
                  <h3 className="font-bold text-blue-600 capitalize text-md">
                    {propUser.userType == "default"
                      ? "Энгийн"
                      : propUser.userType == "agent"
                      ? "Агент"
                      : propUser.userType == "organization"
                      ? "Байгууллага"
                      : propUser.userType}
                  </h3>
                </div>
                <p
                  className={mergeNames(
                    STYLES.flexCenter,
                    "items-center",
                    "px-4 py-2 text-md md:text-lg font-bold text-white bg-blue-600 rounded-md cursor-pointer gap-1 md:gap-2"
                  )}
                  onClick={() => router.push(`tel:${propUser.phone}`)}
                >
                  <FaPhoneAlt /> +976 {propUser.phone}
                </p>
              </div>
              {/* //TODO: Social Hayg */}

              {propUser?.socials && <Socials propUser={propUser} />}
            </div>
            {/* {propUser?.socials && <Socials propUser={propUser} />} */}
          </div>
        </div>

        {ads && <AdContent data={ads} showLink="hidden" />}
      </div>
    </MainContainer>
  );
};
export default Accounts;

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  const { slug } = params;

  const res = await fetch(`${urls["test"]}/user/${slug}`);
  const user = await res.json();
  return {
    props: {
      propUser: user,
    },
  };
}

const Socials = ({ propUser }) => {
  const [socials, setSocials] = useState([
    {
      name: "facebook",
      url: propUser?.socials[0]?.url ?? "",
    },
    {
      name: "instagram",
      url: propUser?.socials[1]?.url ?? "",
    },
    {
      name: "telegram",
      url: propUser?.socials[2]?.url ?? "",
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
