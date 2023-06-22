import urls from "@/constants/api";
import { getEstimateEnums, updateMessageEstimate } from "@/context/functions";
import { STYLES } from "@/styles/index";
import Alerting from "@/util/Alert";
import { BomArea } from "@/util/BomInput";
import CustomModal from "@/util/CustomModal";
import mergeNames from "@/util/mergeNames";
import {
  Button,
  Image,
  Input,
  Link,
  NumberInput,
  NumberInputField,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import currency from "currency.js";

import { useRouter } from "next/router";
import { useState } from "react";

import { AiFillEye } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

const EstimatedCard = ({ est, adminBtn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let token = getCookie("token");
  const router = useRouter();
  const deleteEstimate = async (id) => {
    try {
      await axios
        .delete(`${urls["test"]}/estimate/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((d) => {
          if (d.data.acknowledged) {
            router.reload();
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  const toast = useToast();
  const updatePrice = async (id) => {
    try {
      await axios
        .get(`${urls["test"]}/estimate/price/${id}/${price}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((d) => {
          onClose(),
            toast({
              title: "Амжилттай үнийн дүн нэмлээ.",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          router.reload();
        });
    } catch (error) {
      console.error(error);
    }
  };

  const [price, setPrice] = useState();
  const [note, setNote] = useState("");
  return (
    <div className="w-full text-left">
      <div className="bg-white shadow-md  flex  gap-3 rounded-md p-5 border border-gray-200  h-[125px]">
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
              {est.price && (
                <p className="font-semibold text-md sm:text-xl text-mainBlue">
                  {currency(`${est.price}`, {
                    separator: ",",
                    symbol: "₮ ",
                    pattern: `# !`,
                  })
                    .format()
                    .toString() ?? 0}
                </p>
              )}
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
                {getEstimateEnums(est.status ?? "")}
              </h1>
              {/* <h1>Lorem ipsum dolor sit amet.</h1> */}
            </div>
            <div className="flex items-center gap-3">
              <Alerting
                title="Үнэлгээ"
                isDelete={"Устгах"}
                className={mergeNames(cardIcon.div, "px-2 rounded-md")}
                bg="bg-transparent"
                btn={
                  <BiTrash
                    className={mergeNames("text-red-500", cardIcon.icon)}
                    isDelete={false}
                  />
                }
                onclick={() => {
                  deleteEstimate(est._id);
                }}
              />
              <Alerting
                title="Үнэлгээ"
                isDelete={"буцаах"}
                className={mergeNames(cardIcon.div, "px-2 rounded-md")}
                bg="bg-transparent"
                body={
                  <>
                    <BomArea
                      placeholder="Нэмэлт тайлбар"
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </>
                }
                btn={
                  <BiTrash
                    className={mergeNames("text-yellow-500", cardIcon.icon)}
                    isDelete={false}
                  />
                }
                onclick={() => {
                  updateMessageEstimate(est._id, "returned", {
                    message: message,
                  });
                }}
              />
              {/* <EstimateDeleteButton /> */}
              <CustomModal
                className=""
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                btnClose2={"Буцах"}
                header={"Үнэлгээ"}
                btnOpen={<EstimateShowButton />}
              >
                <div className="flex flex-col gap-3">
                  {est?.items?.map((item, i) => {
                    return (
                      <h2 key={i}>
                        {item.name}:
                        <span className="font-semibold">
                          &nbsp;{item.value}{" "}
                        </span>
                      </h2>
                    );
                  })}
                  {est.returnedMessage && (
                    <h2>
                      Утга:
                      <span className="font-semibold">
                        &nbsp;{est.returnedMessage}{" "}
                      </span>
                    </h2>
                  )}
                  {est.price && (
                    <h2>
                      Үнэ:
                      <span className="font-semibold">
                        &nbsp;{" "}
                        {currency(`${est.price}`, {
                          separator: ",",
                          symbol: "₮ ",
                          pattern: `# !`,
                        })
                          .format()
                          .toString() ?? 0}{" "}
                      </span>
                    </h2>
                  )}

                  <p className={mergeNames("text-center")}></p>
                  {adminBtn && est.price == undefined && (
                    <div className="flex flex-col gap-3 text-lg">
                      <NumberInput
                        onChange={(e) => {
                          setPrice(e);
                        }}
                      >
                        <NumberInputField
                          type="number"
                          placeholder="Үнэлсэн дүн"
                          value={price ?? ""}
                        />
                      </NumberInput>
                      {/* <BomArea placeholder="Нэмэлт тайлбар" /> */}
                      {price && (
                        <Button
                          className={mergeNames(STYLES.blueButton)}
                          onClick={() => {
                            updatePrice(est._id);
                          }}
                        >
                          Үнэлгээ илгээх
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CustomModal>
              {adminBtn}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatedCard;

export const EstimateDeleteButton = ({ label = false, onClick = () => {} }) => {
  return (
    <div className="relative flex flex-row items-center space-x-2">
      <button
        className={mergeNames(cardIcon.div, label && "px-2 rounded-md")}
        onClick={onClick}
      >
        <BiTrash className={mergeNames("text-red-500", cardIcon.icon)} />
        {label && <p className="text-sm text-red-400 "> Үнэлгээг хоослох</p>}
      </button>
    </div>
  );
};

export const EstimateShowButton = ({ label = false }) => {
  return (
    <div className="relative flex flex-row items-center space-x-2">
      <button
        className={mergeNames(
          cardIcon.div,
          "bg-blue-200/40",
          label && "px-2 rounded-md"
        )}
        onClick={() => {}}
      >
        <AiFillEye className={mergeNames("text-blue-500", cardIcon.icon)} />
        {label && <p className="text-sm text-blue-400 "> Үнэлгээг хоослох</p>}
      </button>
    </div>
  );
};
const cardIcon = {
  div: "flex items-center justify-center transition-all duration-300 ease-in-out rounded-full bg-red-200/40 group-a hover:bg-slate-200  shadow-md",
  icon: "md:p-2 p-[5px] h-7 w-7 md:w-8 md:h-8",
};
