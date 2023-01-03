import { Divider, Avatar } from "@chakra-ui/react";
import React, { useState } from "react";

//TODO Icons
import Text from '../../lib/Text' ;
import { UserIcon } from "./icons";
import mergeNames from "../../util/mergeNames";
import { useRouter } from "next/router";
import Cookies from "js-cookie";


const DownLink = ({ href, text, onClick = () => {} }) => {
  return (
    <button onClick={onClick}>
      {text && text?.length > 0 ? (
        <Text className="hover:text-mainBlossom font-semibold cursor-pointer">
          {text}
        </Text>
      ) : (
        ""
      )}
    </button>
  );
};

const UserDropdown = ({user, logout}) => {
  const router = useRouter();
  const [active, setActive] = useState(false);
 

  const handleClick = () => {
    setActive((current) => !current);
  };
  return (
    <div className="relative">
      <UserIcon text="Профайл" onClick={handleClick} active={active} />
      <div
        className={mergeNames(
          active ? "profile__drop-menu" : "profile__drop-menu drop__hidden",
          "absolute w-[250px] -right-0 lg:mt-4 mt-2",
          "bg-white rounded-md p-3 shadow-lg shadow-slate-900"
        )}
      >
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-center">
            <Avatar src="https://bit.ly/dan-abramov" size={"sm"} />
            <div className="flex flex-col pt-2 text-center">
              <Text>{user.username}</Text>
              <Text>{user.email}</Text>
            </div>
          </div>
        </div>
        <Divider orientation="horizontal" bgColor={"red"} my={3} />
        <div className="flex flex-col text-center space-y-2">
          <DownLink
            onClick={() => router.push("/account?profile")}
            text="Хувийн мэдэээлэл"
          />
          <DownLink
            onClick={() => router.push("/account?ads")}
            text="Миний зарууд"
          />
          <DownLink
            onClick={() => router.push("/account?wallet")}
            text="Хэтэвч"
          />
          <Divider orientation="horizontal" bgColor={"red"} my={3} />
          <button onClick={logout} className="text-red-500 font-semibold">
            Гарах
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
