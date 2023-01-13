import React from "react";
import { CgAsterisk } from "react-icons/cg";

const AdLabel = (props) => {
  return (
    // <div className="flex flex-row items-start">
    <p className=" text-mainBlossom/70 font-medium text-xl first-letter:uppercase lowercase">
      {props.children}
    </p>
    // {/* <CgAsterisk size={16} className="text-red-600" /> */}
    // </div>
  );
};

export default AdLabel;
