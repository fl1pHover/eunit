import AdCardButton from "@/components/home/adCardButton";
import { WhiteHeartIcon } from "@/components/navbar/icons";
import { HeartIcon } from "@/components/navbar/icons";
import { STYLES } from "@/styles/index";
import mergeNames from "@/util/mergeNames";
import { Link } from "@chakra-ui/react";
import { Tooltip } from "flowbite-react";
import Image from "next/image";
import React from "react";
import { BiGitCompare, BiTrash } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

const Estimated = () => {
  return (
    <div className="py-5">
      <div className="flex justify-end w-full">
        {/* Таны үнэлгээ */}

        <EstimateCardButton label={true} />
      </div>
      <div className="grid grid-cols-1 gap-3 my-3 2xl:grid-cols-2 4xl:grid-cols-3 w-100">
        <EstimatedCard />
        <EstimatedCard />
        <EstimatedCard />
      </div>
    </div>
  );
};

export default Estimated;

const EstimatedCard = () => {
  return (
    <Link href={() => {}} className="text-left">
      <div className="bg-white shadow-md rounded-md p-5 border border-gray-200  h-[125px]">
        <div className="flex h-full gap-3 ">
          <Image
            src={""}
            alt="Үнэлгээ зураг"
            width={100}
            height={100}
            className="overflow-hidden border border-gray-300 rounded-md"
          />
          <div className="flex flex-col justify-between w-full h-full ">
            <div className="flex justify-between w-full">
              <div className="text-sm font-semibold">
                <h1 className="text-gray-400">Төрөл</h1>
                <h1>Дэд төрөл</h1>
              </div>
              <div>
                <p className="font-semibold">251,100 ₮</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="text-sm">
                <h1 className="text-gray-400">Lorem, ipsum.</h1>
                <h1>Lorem, ipsum dolor.</h1>
              </div>
              <div>
                <p>
                  <EstimateCardButton />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const EstimateCardButton = ({ label = false }) => {
  return (
    <div className="relative flex flex-row items-center space-x-2">
      <button
        className={mergeNames(cardIcon.div, label && "px-2 rounded-md")}
        onClick={() => {}}
      >
        <BiTrash className={mergeNames("text-red-500", cardIcon.icon)} />
        {label && <p className="text-sm text-red-400 "> Үнэлгээг хоослох</p>}
      </button>
    </div>
  );
};

const cardIcon = {
  div: "flex items-center justify-center transition-all duration-300 ease-in-out rounded-full bg-red-200/40 group-a hover:bg-slate-200  shadow-md",
  icon: "md:p-2 p-[5px] h-7 w-7 md:w-8 md:h-8",
};
