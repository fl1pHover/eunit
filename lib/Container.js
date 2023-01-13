import mergeNames from "@/util/mergeNames";
import React from "react";

export const Container = () => {
  return <div className="xl:px-28 lg:px-20 md:px-20">Container</div>;
};
export const ContainerX = (props) => {
  return (
    <div className="xl:px-28 lg:px-20 md:px-12 sm:px-14 xs:px-6 px-4">
      {props.children}
    </div>
  );
};

export const ContainerXP = (props) => (
  <div
    className={mergeNames(
      "xl:px-28 lg:px-20 md:px-12 sm:px-14 xs:px-6 px-4",
      props?.classname ?? ""
    )}
  >
    {props.children}
  </div>
);

export const NavContainer = (props) => {
  return (
    <div className="lg:px-12 md:px-12 sm:px-14 xs:px-6 px-4">
      {props.children}
    </div>
  );
};
