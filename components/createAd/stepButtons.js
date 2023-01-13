import React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const StepButtons = ({ onPrev = () => {}, onNext = () => {} }) => {
  return (
    <div className="mt-4">
      <div className="h-5 w-full bg-emerald-400/30 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 bg-emerald-400 h-5 w-[10vw]" />
        <p className="absolute top-0 left-[10vw] bottom-0 flex justify-center items-center font-semibold">
          10%
        </p>
      </div>
      <div className="flex flex-row justify-between pt-2">
        <button
          onClick={onPrev}
          className="bg-red-400 rounded-full px-4 py-2 text-white font-bold flex flex-row gap-1 items-center"
        >
          <FiArrowLeft size={20} />
          Буцах
        </button>
        <button
          onClick={onNext}
          className="bg-blue-500 rounded-full px-4 py-2 text-white font-bold flex flex-row gap-1 items-center"
        >
          Дараах
          <FiArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default StepButtons;
