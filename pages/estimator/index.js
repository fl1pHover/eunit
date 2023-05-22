import FilterDate, {
  FilterSelect,
  FilterText,
  FilterYear,
} from "@/components/createAd/filters";
import ButtonSelectItem from "@/components/createAd/formButtonSelectItem";
import FormLabel from "@/components/createAd/formLabel";
import Step1 from "@/components/createAd/step1";
import FieldCategory from "@/components/createAd/step1/fieldCategory";
import FieldSellType from "@/components/createAd/step1/fieldSellType";
import FieldSubCategory from "@/components/createAd/step1/fieldSubCategory";
import { ItemContainer } from "@/components/createAd/step4";
import urls from "@/constants/api";
import { Committee } from "@/constants/enums";
import { categories } from "@/data/categories";
import { Container, ContainerX } from "@/lib/Container";
import Input from "@/lib/Input";
import Select from "@/lib/Select";
import { STYLES, TEXT } from "@/styles/index";
import CustomModal from "@/util/CustomModal";
import mergeNames from "@/util/mergeNames";

import useEstimate from "@/util/useEstimate";
import {
  Button,

  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React from "react";
import { Fragment } from "react";
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
  const [est, setEst] = useState([]);
  const toast = useToast();
  const router = useRouter();
  const token = getCookie("token");
  const { categories } = useSelector((state) => state.categories);
  const getEstimate = async () => {
    try {
      await axios
        .get(`${urls["test"]}/category/filters/6468e73ee15122dbb07a4364`)
        .then((d) => {
          setEst(d.data?.steps?.[0]?.values ?? []);
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
      est.map((v) => {
        filters.push({
          name: v.name,
          id: v.type,
          value: values[v.type],
          type: v.types,
        });
      });

      fileUrl.append("images", estimate.file);
      await axios
        .post(`${urls["test"]}/ad/uploadFields`, fileUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Headers": "*",
          },
        })
        .then((d) => {
          file = d.data[0];
        });
      await axios
        .post(
          `${urls["test"]}/estimate`,
          {
            file: file,
            subCategory: estimate.subCategoryId,
            category: categories[estimate.categoryId]._id,
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

  useEffect(() => {
    getEstimate();
  }, []);
  return (
    <section className="px-0 xl:px-28 lg:px-20">
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
            <FieldCategory
              categories={categories}
              setTypes={setEstimate}
              types={estimate}
            />
          </Box>

          {estimate.categoryId && (
            <Box label="Хөрөнгийн дэд төрөл" className="justify-center">
              {categories?.map((item, key) => {
                const isSelected = estimate.subCategoryId === item._id;

                return (
                  item.parent == categories?.[estimate.categoryId]?._id &&
                  item.parent != null && (
                    <ButtonSelectItem
                      key={key}
                      isSelected={isSelected}
                      text={item?.name}
                      onClick={() => {
                        setEstimate((prev) => ({
                          ...prev,
                          subCategoryId: item._id,
                        }));
                      }}
                    />
                  )
                );
              })}
            </Box>
          )}
          {/* <Box label="Үнэлэх төрөл" className="justify-center">
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
          </Box> */}
          {est &&
            estimate.categoryId &&
            est.map((f, i) => {
              if (
                f.other == true &&
                f.value.find((v) => v.id == "other") == undefined
              )
                f.value.push({ id: "other", value: "Бусад" });

              if (f.types == "date")
                return (
                  <FilterDate
                    key={i}
                    title={f.name}
                    name={f.name}
                    onSelect={(num) => {
                      change(f.type, num, "");
                    }}
                  />
                );
              if (f.types == "text")
                return (
                  <FilterText
                    key={i}
                    title={f.name}
                    ph={f.name}
                    value={values[f.type]}
                    onChange={(e) => {
                      e.persist();
                      change(f.type, e.target.value, "");
                    }}
                  />
                );

              if (f.type == "committee") {
                return (
                  typeId && (
                    <FilterSelect
                      key={i}
                      label={values[f.name] ?? f.name}
                      title={f.name}
                      data={
                        typeId[f.parentId] != "country"
                          ? Committee
                          : f.value.filter(
                              (v) => v.parentId == typeId[v.parent]
                            )
                      }
                      Item={({ data, onClick, id, ...props }) => {
                        return (
                          <button
                            {...props}
                            onClick={(e) => {
                              e.persist();
                              change(f.type, data, "");
                              onClick();
                            }}
                          >
                            {data}
                            {props.children}
                          </button>
                        );
                      }}
                    />
                  )
                );
              }
              if (f.types == "dropdown")
                if (f.parentId == null) {
                  return (
                    <FilterSelect
                      key={i}
                      title={f.name}
                      data={f.value}
                      label={values[f.type] ?? f.name}
                      Item={({ data, onClick, id, ...props }) => {
                        return (
                          <button
                            {...props}
                            onClick={(e) => {
                              e.persist();
                              change(f.type, data, id);
                              onClick();
                            }}
                          >
                            {data}
                            {props.children}
                          </button>
                        );
                      }}
                    />
                  );
                } else {
                  return (
                    typeId && (
                      <ItemContainer
                        key={i}
                        className={"flex flex-col items-center justify-center"}
                      >
                        <FormLabel title={f.name} />
                        <Select
                          width="long"
                          data={
                            f.value.filter(
                              (v) =>
                                (f.parentId == v.parent &&
                                  typeId[f.parentId] == v.parentId) ||
                                v.id == "other"
                            ).length > 0
                              ? f.value.filter(
                                  (v) =>
                                    (f.parentId == v.parent &&
                                      typeId[f.parentId] == v.parentId) ||
                                    v.id == "other"
                                )
                              : est
                                  .filter((fil) => fil.type == f.parentId)[0]
                                  .value.filter(
                                    (v) =>
                                      v.id == "B2" ||
                                      v.id == "B1" ||
                                      parseInt(typeId[f.parentId]) >=
                                        parseInt(v.id)
                                  )
                          }
                          label={values[f.type] ?? f.name}
                          Item={({ data, onClick, id, ...props }) => {
                            return (
                              <button
                                {...props}
                                onClick={(e) => {
                                  e.persist();
                                  change(f.type, data, id);
                                  onClick();
                                }}
                              >
                                {data}
                                {props.children}
                              </button>
                            );
                          }}
                        />
                        {typeId[f.type] == "other" ? (
                          <Fragment>
                            <Box h={4} />
                            <Input
                              ph={values[f.type]}
                              onChange={(e) => {
                                change(f.type, e.target.value, "");
                              }}
                              value={
                                values[f.type] != "Бусад" ? values[f.type] : ""
                              }
                            />
                          </Fragment>
                        ) : (
                          <Box />
                        )}
                      </ItemContainer>
                    )
                  );
                }
            })}
          {estimate.categoryId && (
            <ItemContainer className="mx-auto">
              <FormLabel title={"Гэрчилгээний хуулбар"} />
              <form action="">
                <input
                  type="file"
                  name="upload"
                  accept="application/pdf"
                  className="bg-blue-100 cursor-pointer "
                  // ref={hiddenFileInput}
                  // style={{ display: "none" }}
                  onChange={(e) => {
                    setEstimate((prev) => ({
                      ...prev,
                      file: e.target.files[0],
                    }));
                  }}
                />
              </form>
            </ItemContainer>
          )}

          <Button className="px-10 mx-auto" onClick={() => sendEstimate()}>
            Нэмэх
          </Button>
        </div>
        <div className="grid  grid-cols-4 gap-2 mt-6 p-5 flex-col  w-[93%] -translate-y-16 mx-10 bg-white shadow-xl   xl:w-[70%] rounded-3xl">
          <EstimatorModal />
          <Button
            className={mergeNames(
              STYLES.blueButton,
              "mx-auto col-span-full px-10"
            )}
          >
            Илгээх
          </Button>
        </div>
      </div>
    </section>
  );
};

const EstimatorModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      btnClose2={"Буцах"}
      className=""
      btnOpen={
        <div className="w-full bg-blue-200 h-[100px] relative grid place-items-center ">
          <h2>{"1"}</h2>
        </div>
      }
      header="Үнэлгээ хийлгэх хөрөнгийн мэдээлэл"
    >
      <div className="flex flex-col">
        <div className="flex gap-2">
          <h2>Төрөл:</h2>
          <h2>Lorem ipsum dolor sit</h2>
        </div>
      </div>
    </CustomModal>
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
