import React from "react";
import { CgChevronRight, CgClose } from "react-icons/cg";

import mergeNames from "@/util/mergeNames";
import { categories } from "@/data/categories";
import { useRouter } from "next/router";

import { AiOutlineCar } from "react-icons/ai";
import { BsBuilding, BsPhone } from "react-icons/bs";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { MdComputer } from "react-icons/md";
import { RiHomeSmile2Line } from "react-icons/ri";
import Footer from "@/components/footer/index";

const Icon = ({ id, ...props }) => {
  switch (id) {
    case "realState":
      return <BsBuilding {...props} />;
    case "vehicle":
      return <AiOutlineCar {...props} />;
    case "computer":
      return <MdComputer {...props} />;
    case "phone":
      return <BsPhone {...props} />;
    case "electronic":
      return <CgSmartHomeWashMachine {...props} />;
    case "household-items":
      return <RiHomeSmile2Line {...props} />;
    default:
      return <></>;
  }
};

const SideMenu = ({
  show = false,
  closeNav = () => {},
  openNav = () => {},
}) => {
  const router = useRouter();
  const [collapsedId, setCollapsed] = React.useState(false);
  return (
    <React.Fragment>
      <div
        className={mergeNames(
          "transition-all ease-in-out duration-100",
          show
            ? "w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900/50"
            : ""
        )}
      />
      <div
        style={{ width: show ? "100%" : "0rem" }}
        className={mergeNames(
          // show ? "absolute": "hidden",
          "absolute z-50",
          show ? "translate-x-0" : "translate-x-0",
          "transition-all ease-in-out duration-300",
          "left right-0 top-0 bottom-0 h-screen"
        )}
      >
        <div className="flex flex-col items-end h-screen overflow-y-scroll">
          <div className="w-3/4 bg-slate-100 h-screen">
            <div
              className={mergeNames(
                "flex justify-between items-center bg-mainBlossom/100 py-4 w-full px-6"
              )}
            >
              <p className="text-slate-50 font-semibold text-base">Ангилал</p>
              <button onClick={closeNav}>
                <CgClose size={30} className="text-slate-50" />
              </button>
            </div>
            <div>
              {categories?.map((item, key) => {
                return (
                  <div className="w-full" key={key}>
                    <button
                      onClick={() => {
                        setCollapsed((prev) => {
                          if (prev === item.id) return false;
                          return item.id;
                        });
                      }}
                      className={mergeNames(
                        "hover:bg-slate-300",
                        "sm:px-4 sm:py-4 px-3 py-3",
                        "border-b border-gray-200",
                        "w-full flex flex-row items-center justify-between"
                      )}
                    >
                      <div className="flex flex-row gap-2 items-center">
                        <Icon
                          size={16}
                          id={item?.id}
                          className="text-blue-900"
                        />
                        <p className="font-semibold sm:text-base text-sm">
                          {item?.categoryName}
                        </p>
                      </div>
                      <CgChevronRight
                        size={20}
                        className={mergeNames(
                          collapsedId === item.id && "rotate-90",
                          "transition-all ease-in-out"
                        )}
                      />
                    </button>
                    <div
                    //  className={mergeNames("sm:px-4 sm:py-4 px-3 py-3")}
                    // className="bg-gray-200"
                    >
                      {collapsedId &&
                        collapsedId === item.id &&
                        item?.submenu?.map(({ category, href }, key) => {
                          return (
                            <button
                              onClick={() => {
                                router.push(`/category/${item.id}/${href}`);
                                closeNav();
                              }}
                              key={key}
                              className="w-full py-3 pl-3 pr-3 border-b border-gray-300 hover:bg-gray-300"
                            >
                              <p className="text-xs sm:text-sm text-gray-900 font-medium text-left">
                                {category}
                              </p>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideMenu;
