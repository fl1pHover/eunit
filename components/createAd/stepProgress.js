import mergeNames from "@/util/mergeNames";
import React from "react";

// const NumberText = (props) => {
//   return <p className="text-blue-500 font-semibold">{props.children}</p>;
// };

const StepItem = ({ stepId = 1, activeStep = 1 }) => {
  const isActive = stepId === activeStep;
  return (
    <div
      className={mergeNames(
        "rounded-full border-2  w-12 h-12 flex items-center justify-center ",
        isActive ? "bg-blue-400 border-blue-400" : "bg-gray-50 border-blue-400"
      )}
    >
      <p
        className={mergeNames(
            "text-2xl",
          isActive ? "text-white font-bold" : "text-blue-500 font-semibold"
        )}
      >
        {stepId}
      </p>
    </div>
  );
};

const StepProgress = ({ activeStep = 1 }) => {
  return (
    <div className="w-full relative md:mb-8 mb-4">
      <div className="h-1 w-full bg-blue-500/50 absolute top-4 z-[-1] rounded-md" />
      <div className="flex w-full justify-evenly">
        <StepItem stepId={1} {...{ activeStep }} />
        <StepItem stepId={2} {...{ activeStep }} />
        <StepItem stepId={3} {...{ activeStep }} />
        <StepItem stepId={4} {...{ activeStep }} />
      </div>
    </div>
  );
};

export default StepProgress;
