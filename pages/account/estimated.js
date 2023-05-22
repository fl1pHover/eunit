import AdCardButton from "@/components/home/adCardButton";
import { WhiteHeartIcon } from "@/components/navbar/icons";
import { HeartIcon } from "@/components/navbar/icons";
import urls from "@/constants/api";
import { STYLES } from "@/styles/index";
import mergeNames from "@/util/mergeNames";
import { Image, Link } from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Tooltip } from "flowbite-react";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BiGitCompare, BiTrash } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

const Estimated = () => {
  const token = getCookie("token");
  const [estimate, setEstimate] = useState([]);
  const getEstimate = async () => {
    await axios
      .get(`${urls["test"]}/estimate`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Headers": "*",
        },
      })
      .then((d) => setEstimate(d.data));
  };
  useEffect(() => {
    if (token) getEstimate();
  }, [token]);
  return (
    <div className="py-5">
      <div className="flex justify-end w-full">
        {/* Таны үнэлгээ */}

        <EstimateCardButton label={true} />
      </div>
      <div className="grid grid-cols-1 gap-3 my-3 xl:grid-cols-2 4xl:grid-cols-3 w-100">
        {estimate &&
          estimate.map((est, i) => {
            return <EstimatedCard est={est} key={i} />;
          })}
      </div>
    </div>
  );
};

export default Estimated;

const EstimatedCard = ({ est }) => {
  return (
    <div className="text-left">
      <div className="bg-white shadow-md rounded-md p-5 border border-gray-200  h-[125px]">
        <div className="flex h-full gap-3">
          <Link
            href={est.file ?? ""}
            target="_blank"
            className="flex items-center"
          >
            <Image
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
              }
              alt="Үнэлгээ зураг"
              className="w-[60px] overflow-hidden border border-gray-300 rounded-md "
            />
          </Link>
          <div className="flex flex-col justify-between w-full h-full ">
            <div className="flex justify-between w-full">
              <div className="text-sm font-semibold">
                <h1 className="text-gray-400">{est?.category?.name ?? ""}</h1>
                <h1>{est?.subCategory?.name ?? ""}</h1>
              </div>
              <div>
                <p className="font-semibold">251,100 ₮</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="text-sm">
                <h1
                  className={mergeNames(
                    "text-gray-400 font-semibold",
                    est.status && "text-yellow-400",
                    est.deleted && "text-red-400"
                  )}
                >
                  {est.status ?? ""}
                </h1>
                <h1>Lorem, ipsum dolor.</h1>
              </div>
              <div>
                <EstimateCardButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
