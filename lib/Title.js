import mergeNames from "@/util/mergeNames";
import React from "react";

const Title = (props) => {
  return (
    <p
      className={mergeNames(
        "font-semibold pb-2 text-gray-900",
        props?.classname
      )}
    >
      {props.children}
    </p>
  );
};

export default Title;
