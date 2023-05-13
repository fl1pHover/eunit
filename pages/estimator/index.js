import ButtonSelectItem from "@/components/createAd/formButtonSelectItem";
import Step1 from "@/components/createAd/step1";
import FieldCategory from "@/components/createAd/step1/fieldCategory";
import FieldSellType from "@/components/createAd/step1/fieldSellType";
import FieldSubCategory from "@/components/createAd/step1/fieldSubCategory";
import { categories } from "@/data/categories";
import { ContainerX } from "@/lib/Container";
import { TEXT } from "@/styles/index";
import mergeNames from "@/util/mergeNames";
import { FormLabel, Heading } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";

const Estimator = ({}) => {
  const [types, setTypes] = useState({
    categoryId: false,
    categoryName: false,
    subCategoryId: false,
    sellType: false,
    adType: false,
  });

  return (
    <section className="px-0 xl:px-28 lg:px-20 ">
      <div className="flex flex-col items-center">
        {/* <Step1 categories={passcategory} /> */}
        <div className="relative w-full overflow-hidden rounded-b-[50px] ">
          <img
            src="utils/banner/calc-banner-blue.svg"
            className="w-full h-[50vh] object-cover"
            alt=""
          />
          <div className="absolute top-0 left-0 grid items-center justify-around w-full h-full grid-cols-1 gap-20 p-10 pb-4 text-white lg:grid-cols-2 md:pb-16 ">
            <img
              src="utils/banner/calc-image.svg"
              alt=""
              className="w-[200px] object-cover absolute top-[20%] left-[60%] lg:left-[20%] opacity-60"
            />
            <div className="hidden lg:block"></div>
            <div className="w-full md:w-4/5 text-[18px] relative z-10 font-semibold ">
              <h1
                className={mergeNames(
                  "md:text-[50px] text-[40px] leading-[50px] mb-5"
                )}
              >
                Хөрөнгийн үнэлгээ
              </h1>
              <p className={mergeNames("md:text-lg text-base")}>
                Өөрийн хөрөнгийн үнэлгээг түргэн шуурхай мэдэж аваарай.
              </p>
            </div>
          </div>
        </div>
        <div className="flex p-10 flex-col gap-5 w-[93%] -translate-y-16 mx-10 bg-white shadow-xl   xl:w-[70%] rounded-3xl">
          <Box label="Хөрөнгийн төрөл" classname="justify-center">
            <FieldCategory {...{ types, categories, setTypes }} />
          </Box>
          <Box label="Хөрөнгийн дэд төрөл" classname="justify-center">
            {categories?.map((item, key) => {
              const isSelected = types.subCategoryId === item.href;
              return (
                <ButtonSelectItem
                  key={key}
                  isSelected={isSelected}
                  text={item?.categoryName}
                  onClick={() => {
                    // setTypes((prev) => ({
                    //   ...prev,
                    //   subCategoryId: item.href,
                    // }));
                  }}
                />
              );
            })}
          </Box>
          <Box label="Үнэлэх төрөл" classname="justify-center">
            {categories && (
              // ZARAH TURUL BOLON ZARIIN TURUL
              // ZARAH TURUL: SELL OR RENT
              // ZARIIN TURUL: DEFAULT, SPECIAL, POSTER
              <>
                <FieldSellType
                  //   title={selltypeTitle}
                  {...{ types, setTypes }}
                />
              </>
            )}
          </Box>
          <Box label="Үнэлгээний зориулалт" classname="justify-center">
            {/* children */}
          </Box>
          <Box label="Хаяг" classname="justify-center">
            {/* children */}
          </Box>
          <Box label="Мэдээлэл" classname="justify-center">
            {/* children */}
          </Box>
        </div>
      </div>
    </section>
  );
};

const Box = ({ children, classname, label }) => {
  return (
    <div className="flex flex-col w-full gap-5">
      <h1 className="font-bold text-center text-1xl text-mainBlossom/85">
        {label}
      </h1>
      <div
        className={mergeNames("flex gap-3 flex-wrap w-full mx-auto", classname)}
      >
        {children}
      </div>
    </div>
  );
};
const GridBox = ({ children, classname, label }) => {
  return (
    <div className="flex flex-col w-full gap-5">
      <h1 className="font-bold text-center text-1xl text-mainBlossom/85">
        {label}
      </h1>
      <div
        className={mergeNames(
          "grid grid-cols-1 md:grid-cols-2 gap-3 w-full ",
          classname
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Estimator;
