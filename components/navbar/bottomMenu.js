import { useRouter } from "next/router";
import React from "react";
import { AiFillCalculator } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { IoWallet } from "react-icons/io5";

const Container = ({ text = "", Icon = () => <></>, onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      className="group cursor-pointer w-1/5 text-center py-4 flex flex-col justify-center items-center"
    >
      <Icon
        size={20}
        className="text-white group-hover:text-amber-300 group-hover:scale-110"
      />
      <p className="text-white text-xs font-semibold group-hover:text-amber-300">
        {text}
      </p>
    </button>
  );
};

const BottomMenu = (props) => {
  const router = useRouter();

  const handleLink = (link) => {
    router.push(link);
  };
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 w-screen bg-mainBlossom">
      <div className="flex flex-row">
        <Container
          onClick={() => handleLink("/")}
          text="Нүүр"
          Icon={(props) => <HiHome {...props} />}
        />
        <Container
          onClick={() => handleLink("/wallet")}
          text="Хэтэвч"
          Icon={(props) => <IoWallet {...props} />}
        />
        <Container
          onClick={() => handleLink("/")}
          text="Хайлт"
          Icon={(props) => <BiSearch {...props} />}
        />
        <Container
          onClick={() => handleLink("/estimate")}
          text="Үнэлгээ"
          Icon={(props) => <AiFillCalculator {...props} />}
        />
        <Container
          text="Профайл"
          onClick={() => handleLink("/account")}
          Icon={(props) => <FaUserCircle {...props} />}
        />
      </div>
    </div>
  );
};

export default BottomMenu;
