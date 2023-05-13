import { createAdNav } from "@/data/adminNav";
import mergeNames from "@/util/mergeNames";
import Link from "next/link";
import React from "react";
import { Fragment } from "react";
import { useState } from "react";

const CreateAdNav = () => {
  const [isHoveringId, setIsHoveringId] = useState(true);
  const handleMouseOver = (id) => {
    setIsHoveringId(id);
  };

  const handleMouseOut = () => {
    setIsHoveringId(false);
  };

  return (
    <>
      {createAdNav?.map(({ tabName, id, submenu }, key) => {
        return (
          <div
            key={key}
            onMouseOver={() => handleMouseOver(id)}
            onMouseOut={handleMouseOut}
            className={mergeNames(
              "hover:bg-teal-700 transition-colors ease-in-out bg-teal-800"
            )}
          >
            <div className="h-full">
              <div className="flex flex-col justify-center h-full px-2 py-4 lg:py-3 lg:px-4">
                <Link href={`/${id}`}>
                  <a className="text-[11px] font-medium text-center h-full text-white lg:text-[13px]">
                    {tabName}
                  </a>
                </Link>
              </div>
            </div>
            <div className="absolute  w-auto  flex flex-col overflow-hidden justify-center bg-teal-800/[96]">
              {submenu &&
                isHoveringId &&
                isHoveringId === id &&
                submenu.map(({ tab, href }, subkey) => {
                  return (
                    <Fragment key={subkey}>
                      <Link href={`/${href}`}>
                        <a
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={mergeNames(
                            "px-2 lg:px-4 py-3 text-[10px] lg:text-sm font-medium text-white transition-colors ease-in cursor-pointer bg-teal-700/[96] hover:bg-teal-600 first-letter:uppercase whitespace-nowrap z-30",
                            subkey === submenu.length - 1
                              ? ""
                              : "border-r border-blue-900/[96]"
                          )}
                        >
                          <p>{tab}</p>
                        </a>
                      </Link>
                    </Fragment>
                  );
                })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CreateAdNav;
