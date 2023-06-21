import Image from "next/image";
import React from "react";

import { categories } from "@/data/categories";
import useBreakpoints from "@/hooks/useBreakpoints";
import { ContainerX } from "@/lib/Container";
import mergeNames from "@/util/mergeNames";
import Link from "next/link";

const calcSize = (pt) => {
  switch (pt) {
    case "3xl":
    case "2xl":
    case "xl":
      return 60;
    case "lg":
    case "md":
      return 40;
    case "sm":
      return 50;
    case "xs":
    case "default":
    default:
      return 30;
  }
};
const transition =
  "group-hover:scale-125 transition-all duration-300 ease-in-out";

const CategorySelect = () => {
  // const { categories } = useAuth();
  const pt = useBreakpoints();
  const iconSz = React.useMemo(() => calcSize(pt), [pt]);

  return (
    <div className="sm:py-[50px] py-[20px]">
      <ContainerX>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6 xl:gap-10 sm:gap-5">
          {categories.map(({ ...props }, index) => {
            return (
              <div key={index}>
                {/* Categoryiin default menug ni hamgiin ehnii submenu eer avna */}
                {props.submenu &&
                  props.submenu.slice(0, 1).map((sub, i) => {
                    return (
                      <Link key={i} href={`/category/${sub.href}`}>
                        <a className="group">
                          <div
                            className={mergeNames(
                              "text-center aspect-square",
                              "h-full w-full relative cursor-pointer",
                              "overflow-hidden rounded-lg bg-white shadow-md"
                            )}
                          >
                            <Image
                              layout="fill"
                              src={props.image}
                              objectFit="cover"
                              alt="category image"
                              className={transition}
                            />
                            <div
                              className={mergeNames(
                                "absolute w-full h-full top-0 bottom-0 right-0 left-0",
                                "bg-gradient-to-b from-gray-900/50 to-mainBlossom/70",
                                "transition-all ease-in-out duration-500",
                                "group-hover:from-gray-900/30 group-hover:to-mainBlossom/50"
                              )}
                            >
                              <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                                <props.icon
                                  size={iconSz}
                                  className={mergeNames(
                                    "text-white",
                                    transition
                                  )}
                                />
                                <p
                                  className={mergeNames(
                                    "text-white font-semibold lg:text-lg text-sm break-words px-2"
                                  )}
                                >
                                  {props.categoryName}
                                </p>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </ContainerX>
    </div>
  );
};

export default CategorySelect;
