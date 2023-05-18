import { Image, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
//TODO Icons
import { useRouter } from "next/router";
import mergeNames from "../../util/mergeNames";
import { UserIcon } from "./icons";

import { useAuth } from "@/context/auth";
import { STYLES } from "@/styles/index";
import Feedback from "@/util/Feedback";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRef } from "react";
import { BsGrid } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiHeart } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { deleteCookie } from "cookies-next";
import { AiOutlineCalculator } from "react-icons/ai";

const drawerItem = [
  {
    icon: <CgProfile />,
    text: "Хувийн мэдээлэл",
    href: "Profile",
  },
  {
    icon: <BsGrid />,
    text: "Миний зарууд",
    href: "MyAds",
  },
  // {
  //   icon: <MdShare />,
  //   text: "Хуваалцсан зарууд",
  //   href: "SharedAds",
  // },
  {
    icon: <FiHeart />,
    text: "Миний хүслүүд",
    href: "Bookmark",
  },
  {
    icon: <IoWalletOutline />,
    text: "Хэтэвч",
    href: "WalletPage",
  },
  {
    icon: <AiOutlineCalculator />,
    text: "Үнэлгээ",
    href: "Estimated",
  },
];

const BodyDrawer = ({ user }) => {
  const router = useRouter();
  return (
    <DrawerBody className="flex flex-col justify-between p-0 bg-bgdark/95">
      <div
        className={mergeNames(
          STYLES.flexBetween,
          "flex-col w-full my-auto items-center "
        )}
      >
        <div
          className={mergeNames(
            STYLES.flexCenter,
            "flex-col items-center text-white"
          )}
        >
          <Image
            // src={user?.image}
            src={
              user?.profileImg ??
              "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png"
            }
            alt="user image"
            className="w-[100px] aspect-square rounded-full bg-gray-400 object-cover mt-10"
          />
          <h2 className="text-[22px] mt-2 font-bold">{user?.username ?? ""}</h2>
          <h2 className="text-[14px] font-semibold">{user?.email ?? ""}</h2>
        </div>
      </div>
      <div className="flex flex-col p-4 text-center bg-white rounded-t-2xl">
        <div className="grid grid-cols-2 gap-4 py-3">
          {drawerItem.map((d, i) => {
            return (
              <DownLink
                key={i}
                icon={d.icon}
                href={`/account?tab=${d.href}`}
                text={d.text}
              />
            );
          })}
        </div>
        <div className="w-full h-[1px] mt-4 mb-4 bg-gray-200 inline-block" />
        <div className="flex flex-col space-y-2 ">
          <Feedback />
          <button
            onClick={() => {
              signOut();
              deleteCookie("token");
            }}
            className="py-2 font-semibold text-white rounded-md bg-mainBlossom hover:bg-red-500 "
          >
            Гарах
          </button>
        </div>
      </div>
    </DrawerBody>
  );
};

const DownLink = ({ href, text, className, icon, onClick = () => {} }) => {
  return (
    <Link
      href={href}
      className={mergeNames(
        "px-5 py-4 transition-all ease-in-out border-2 rounded-lg h-[100px] group hover:bg-gray-100 text-mainBlossom text-bold",
        STYLES.flexCenter,
        "flex-col items-center"
      )}
    >
      <a
        className={mergeNames(
          "px-5 py-4 transition-all ease-in-out border-2 rounded-lg h-[100px] group hover:bg-gray-100 text-mainBlossom text-bold",
          STYLES.flexCenter,
          "flex-col items-center"
        )}
      >
        {text && text?.length > 0 ? (
          <>
            <p className="text-[30px] mb-2">{icon}</p>
            <Text className="font-semibold">{text}</Text>
          </>
        ) : (
          ""
        )}
      </a>
    </Link>
  );
};

const UserDrawer = ({ user }) => {
  const router = useRouter();
  const [active, setActive] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const handleClick = () => {
    setActive(!current);
  };
  return (
    <div className="relative">
      <UserIcon text="Профайл" onClick={onOpen} active={active} />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent className="bg-transparent">
          <DrawerCloseButton className="text-white" />

          <BodyDrawer user={user} />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default UserDrawer;
