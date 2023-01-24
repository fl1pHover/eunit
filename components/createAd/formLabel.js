import React from "react";

const FormLabel = ({ num = "", title = "", req = true }) => {
  return (
    <div className="text-center flex flex-row items-center justify-center space-x-1 pb-[16px] md:pb-[20px]">
      {num && (
        <div className="rounded-full border-2 border-mainBlossom/60 w-[30px] h-[30px] flex items-center justify-center">
          <p className="text-black/50 font-medium text-sm">{num}</p>
        </div>
      )}
      <p className="text-gray-700 font-normal md:text-2xl text-lg">
        {/* first-letter:uppercase lowercase */}
        {title}
      </p>
      {req && <p className="text-red-600">*</p>}
    </div>
  );
};

export default FormLabel;

export const LilFormLabel = ({ num = "", title = "", req = true }) => {
  return (
    <div className="text-center flex flex-row items-center justify-center space-x-1 pb-[16px] md:pb-[10px]">
      {num && (
        <div className="rounded-full border-2 border-mainBlossom/60 w-[30px] h-[30px] flex items-center justify-center">
          <p className="text-black/50 font-medium text-sm">{num}</p>
        </div>
      )}
      <p className="text-gray-700 font-normal md:text-2xl text-lg">
        {/* first-letter:uppercase lowercase */}
        {title}
      </p>
      {req && <p className="text-red-600">*</p>}
    </div>
  );
};
