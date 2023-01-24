import mergeNames from "@/util/mergeNames";
import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

const generalButtonStyle =
  "bg-blue-500 transition-all ease-in-out hover:bg-blue-600 outline-none py-1";

const Counter = ({ limit, maxValue, setValue = () => {} }) => {
  // const Counter = ({ limit = 5, maxValue = "5+" }) => {
  const [number, setNumber] = React.useState(0);
  return (
    <div className="md:w-1/3 flex flex-row h-14">
      <button
        onClick={() => {
          setNumber((prev) => {
            if (prev === 0) {
              setValue(0);
              return 0;
            }
            if (prev === maxValue) {
              setValue(limit);
              return limit;
            }
            setValue(prev - 1);
            return prev - 1;
          });
        }}
        className={mergeNames(generalButtonStyle, "rounded-l-full pl-5 pr-3 ")}
      >
        <BiMinus size={30} className="text-white" />
      </button>
      <div className="w-[100px] border border-blue-500 flex justify-center items-center">
        <p className="text-lg font-semibold">{number}</p>
      </div>
      <button
        onClick={() => {
          setNumber((prev) => {
            if (limit && maxValue) {
              if (prev > limit - 1 || prev === maxValue) {
                setValue(maxValue);
                return maxValue;
              }
            }
            if (limit && !maxValue) {
              if (prev > limit - 1) {
                setValue(limit);
                return limit;
              }
            }
            setValue(prev + 1);
            return prev + 1;
          });
        }}
        className={mergeNames(generalButtonStyle, "rounded-r-full pr-5 pl-3 ")}
      >
        <BiPlus size={30} className="text-white" />
      </button>
    </div>
  );
};

export default Counter;
