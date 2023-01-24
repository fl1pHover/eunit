import mergeNames from "@/util/mergeNames";
import React from "react";

const Input = ({ onChange = () => {}, ph = "", value = "", props }) => {
  return (
    <input
      {...props}
      placeholder={ph}
      defaultValue={value}
      onChange={(e) => onChange(e.target.value)}
      className={mergeNames(
        "px-4 py-2 md:w-2/3 w-full flex items-center justify-between",
        "rounded-full border-2 border-blue-400 bg-blue-100/10 outline-blue-400",
        "text-black font-medium placeholder-slate-400"
      )}
    />
  );
};

export default Input;
