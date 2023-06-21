import { STYLES } from "@/styles/index";
import { BomArea, BomInput } from "@/util/BomInput";
import CustomModal from "@/util/CustomModal";
import mergeNames from "@/util/mergeNames";
import { Image, Input, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { AiFillEye } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

const EstimatedCard = ({ est, adminBtn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <p className="font-semibold">
                {est.status == "pending" ? " " : "Value"}
              </p>
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
              {/* <h1>Lorem ipsum dolor sit amet.</h1> */}
            </div>
            <div className="flex items-center gap-3">
              <EstimateDeleteButton />
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
                      <h2>
                        {item.name}:
                        <span className="font-semibold">
                          &nbsp;{item.value}{" "}
                        </span>
                      </h2>
                    );
                  })}
                  <p className={mergeNames("text-center")}></p>
                  {adminBtn && (
                    <form
                      action="submit"
                      className="flex flex-col gap-3 text-lg"
                    >
                      <Input type="number" placeholder="Үнэлсэн дүн" />
                      <BomArea placeholder="Нэмэлт тайлбар" />
                      <Input
                        onClick={() => {}}
                        type="submit"
                        value="Үнэлгээ илгээх"
                        className={mergeNames(STYLES.blueButton)}
                      />
                    </form>
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

export const EstimateDeleteButton = ({ label = false }) => {
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
