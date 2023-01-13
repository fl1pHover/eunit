import React from "react";
import mergeNames from "@/util/mergeNames";
import { BiCheck } from "react-icons/bi";
import CategoryIcon from "./categoryIcon";

import { categories as localCategory } from "@/data/categories";
import { Divider } from "@chakra-ui/react";

const Label = ({ num = "", title = "" }) => {
  return (
    <div className="text-center flex flex-row items-center justify-center space-x-2 pb-[18px]">
      {num && (
        <div className="rounded-full border-2 border-mainBlossom/60 w-[30px] h-[30px] flex items-center justify-center">
          <p className="text-black/50 font-medium text-sm">{num}</p>
        </div>
      )}
      <p className="text-gray-700 font-normal text-2xl first-letter:uppercase lowercase">
        {title}
      </p>
    </div>
  );
};

const Line = () => {
  return (
    <div className="md:my-6 my-4">
      <Divider />
    </div>
  );
};

const Step1 = ({
  categories = localCategory,
  AdTypes = {},
  selectedIndex = {},
  assignCategoryIdx = () => {},
  assignSubCategoryIdx = () => {},
}) => {
  // const [selectedIndex, setSelectedIndex] = React.useState({
  //   category: "",
  //   subCategory: "",
  // });
  const [selectedAdType, setSelectedAdType] = React.useState(AdTypes.sell.id); // yr ni bol zarah gsn utga "sell"
  // console.log("categories", categories[selectedIndex.category], selectedIndex.category);
  return (
    <div className="w-full">
      <Label num="1" title="Таны зарах хөрөнгийн төрөл?" />
      <div className="flex justify-center">
        <div className="grid lg:grid-cols-6 grid-cols-3 py-4 lg:gap-4 gap-4 auto-rows-fr md:w-4/5 w-full">
          {categories?.map((item, key) => {
            const isSelected = key === selectedIndex.category;
            // console.log("item", item);
            return (
              <button
                key={Math.random()}
                className={mergeNames(
                  "group",
                  "flex flex-col justify-start items-center"
                )}
                onClick={() => {
                  assignCategoryIdx(key);
                  // setSelectedIndex((prev) => ({
                  //   ...prev,
                  //   category: key,
                  // }));
                }}
              >
                <div
                  className={mergeNames(
                    "w-[80px] h-[80px]",
                    "px-3 border border-gray-200 rounded-full",
                    "flex flex-row gap-2 items-center justify-center shadow-md",
                    // "shadow-[0_35px_35px_rgba(96,125,250,0.25)]",
                    "ring-[6px]  ring-offset-0",
                    isSelected
                      ? "bg-blue-500 ring-blue-200"
                      : "bg-blue-200 ring-transparent"
                  )}
                >
                  {/* <Icon  /> */}
                  <CategoryIcon
                    href={item?.href ?? item?.id}
                    size={40}
                    className={mergeNames(
                      isSelected ? "text-blue-200" : "text-blue-500/60",
                      "transition-all ease-in-out",
                      "text-[30px] group-hover:scale-125"
                    )}
                  />
                </div>
                <p
                  className={mergeNames(
                    "md:text-base font-semibold text-sm mt-2",
                    isSelected ? "text-gray-800" : "text-gray-500"
                    // "group-hover:text-white "
                  )}
                >
                  {item?.name || item?.categoryName}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {(selectedIndex?.category || selectedIndex?.category === 0) && (
        <div>
          <Line />
          <Label title="Дэд төрөл" />
          <div className="flex flex-wrap md:gap-4 gap-1 md:px-10 justify-center mb-6">
            {localCategory?.[selectedIndex.category]?.submenu?.map(
              (item, key) => {
                // {categories[selectedIndex.category]?.subCategory?.map((item, key) => {
                // console.log("item", item);
                const isSelected = selectedIndex.subCategory === item.href;
                return (
                  <button
                    onClick={() => {
                      assignSubCategoryIdx(item.href);
                      // setSelectedIndex((prev) => ({
                      //   ...prev,
                      //   subCategory: item.href,
                      // }));
                    }}
                    key={key}
                    className={mergeNames(
                      "ring-[6px] ring-offset-0 rounded-full px-4 py-2 md:mb-3 mb-2",
                      isSelected
                        ? "bg-blue-500 ring-blue-200"
                        : "bg-blue-100 ring-transparent"
                    )}
                  >
                    <p
                      className={mergeNames(
                        "font-semibold",
                        isSelected ? "text-white" : "text-blue-500/80"
                      )}
                    >
                      {item?.name ?? item?.category}
                    </p>
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}
      {selectedIndex.subCategory && (
        <div>
          <Line />
          <Label num={2} title="Борлуулах төрөл" />
          <div className="flex flex-row justify-center gap-4 mt-2">
            {Object.keys(AdTypes).map((type, key) => {
              //  type.id === AdTypes[type].id ene 2 ijilhen utgatai
              // console.log("type", type, AdTypes[type].id, selectedAdType);
              const isSelected = type === selectedAdType;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedAdType(type)}
                  className={mergeNames(
                    "ring-[6px] ring-offset-0 rounded-full md:mb-3 mb-2 px-1 py-1",
                    "flex flex-row items-center gap-3",
                    isSelected
                      ? " ring-blue-200 bg-blue-500"
                      : " ring-transparent bg-sky-100 "
                  )}
                >
                  <div
                    className={mergeNames(
                      "rounded-full w-[40px] h-[40px] flex justify-center items-center",
                      isSelected ? "bg-white" : ""
                    )}
                  >
                    <BiCheck
                      size={30}
                      className={mergeNames(
                        isSelected ? "text-blue-500" : "text-blue-200"
                      )}
                    />
                  </div>
                  <div className="pr-3">
                    <p
                      className={mergeNames(
                        "font-semibold",
                        isSelected ? "text-white" : "text-blue-500/80"
                      )}
                    >
                      {AdTypes[type].name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1;
