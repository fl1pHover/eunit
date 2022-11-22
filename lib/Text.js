import React from "react";
import mergeNames from "@/util/mergeNames";

const Text = (props) => {
  return (
    <p
      className={mergeNames(
        props?.classname && props.classname,
        "text-sm font-medium"
      )}
    >
      {props.children}
    </p>
  );
};

export default Text;

export const XSText = (props) => {
  return (
    <p className={mergeNames(props?.classname && props.classname, "text-xs")}>
      {props.children}
    </p>
  );
};
