import ButtonSelectItem from "@/components/createAd/formButtonSelectItem";
import Step1 from "@/components/createAd/step1";
import FieldCategory from "@/components/createAd/step1/fieldCategory";
import FieldSellType from "@/components/createAd/step1/fieldSellType";
import FieldSubCategory from "@/components/createAd/step1/fieldSubCategory";
import urls from "@/constants/api";
import { categories } from "@/data/categories";
import { ContainerX } from "@/lib/Container";
import { TEXT } from "@/styles/index";
import mergeNames from "@/util/mergeNames";
import useEstimate from "@/util/useEstimate";
import { FormLabel, Heading, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const Estimator = ({}) => {
  const [estimate, setEstimate] = useState({
    categoryId: "",
    subCategoryId: "",
    file: [],
  });
  const [values, change, typeId] = useEstimate();
  const [subCategory, setSubCategory] = useState([]);
  const [items, setItems] = useState();
  const toast = useToast();
  const router = useRouter();
  const { categories } = useSelector((state) => state.categories);
  const getSubcategory = async (id) => {
    try {
      await axios
        .get(`${urls["test"]}/category/${id}`)
        .then((d) => setSubCategory(d.data));
    } catch (error) {
      console.error(error?.message);
    }
  };
  const getItems = async (id) => {
    try {
      await axios.get(`${urls["test"]}/category/filters/${id}`).then((d) => {
        setItems(d.data);
      });
    } catch (error) {
      console.error(error?.message);
    }
  };

  const sendEstimate = async () => {
    try {
      let file = "";
      let fileUrl = new FormData();
      let filters = [];
      subCategory.steps[0].values.map((v) => {
        filters.push({
          name: v.name,
          id: v.type,
          value: values[v.type],
          type: v.types,
        });
      });
      estimate.file?.map((prev) => fileUrl.append("images", prev));
      await axios
        .post(`${urls["test"]}/ad/uploadFields`, fileUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Headers": "*",
          },
        })
        .then((d) => (file = d.data));
      await axios
        .post(
          `${urls["test"]}/estimate`,
          {
            file: file,
            subCategory: estimate.subCategoryId,
            category: estimate.categoryId,
            sellType: "sell",
            items: filters,
            status: "pending",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Headers": "*",
              charset: "UTF-8",
            },
          }
        )
        .then((d) => {
          toast({
            title: "Амжилттай нэмэгдлээ.",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          router.reload();
        });
    } catch (error) {
      console.error(error?.message);
    }
  };

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
          <Box label="Хөрөнгийн төрөл" className="justify-center">
            <FieldCategory {...{ estimate, categories, setEstimate }} />
          </Box>
          <Box label="Хөрөнгийн дэд төрөл" className="justify-center">
            {categories?.map((item, key) => {
              const isSelected = estimate.subCategoryId === item.href;
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
          <Box label="Үнэлэх төрөл" className="justify-center">
            {categories && (
              // ZARAH TURUL BOLON ZARIIN TURUL
              // ZARAH TURUL: SELL OR RENT
              // ZARIIN TURUL: DEFAULT, SPECIAL, POSTER
              <>
                <FieldSellType
                  //   title={selltypeTitle}
                  {...{ estimate, setEstimate }}
                />
              </>
            )}
          </Box>
          <Box label="Үнэлгээний зориулалт" className="justify-center">
            {/* children */}
          </Box>
          <Box label="Хаяг" className="justify-center">
            {/* children */}
          </Box>
          <Box label="Мэдээлэл" className="justify-center">
            {/* children */}
          </Box>
        </div>
      </div>
    </section>
  );
};

const Box = ({ children, className, label }) => {
  return (
    <div className="flex flex-col w-full gap-5">
      <h1 className="font-bold text-center text-1xl text-mainBlossom/85">
        {label}
      </h1>
      <div
        className={mergeNames("flex gap-3 flex-wrap w-full mx-auto", className)}
      >
        {children}
      </div>
    </div>
  );
};
const GridBox = ({ children, className, label }) => {
  return (
    <div className="flex flex-col w-full gap-5">
      <h1 className="font-bold text-center text-1xl text-mainBlossom/85">
        {label}
      </h1>
      <div
        className={mergeNames(
          "grid grid-cols-1 md:grid-cols-2 gap-3 w-full ",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Estimator;
