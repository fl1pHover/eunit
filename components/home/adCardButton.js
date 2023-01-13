import React from "react";
import { FaHeart } from "react-icons/fa";

import { Tooltip, useToast, IconButton } from "@chakra-ui/react";
import { BiArea, BiDoorOpen, BiGitCompare } from "react-icons/bi";
import mergeNames from "@/util/mergeNames";

const AdCardButton = () => {
  const toast = useToast();
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <div className="space-x-2 flex flex-row items-center">
      <Tooltip label="Хадгалах">
        <button
          className="bg-slate-200/40 rounded-full p-2 group hover:bg-slate-200 transition-all duration-300 ease-in-out"
          onClick={() => {
            setIsLiked(true);
            toast({
              title: "Хүсэл рүү нэмэгдлээ.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          }}
        >
          <FaHeart
            className={mergeNames(
              "hover:text-red-400 ",
              isLiked ? "text-red-500/90" : "text-slate-200/90"
            )}
          />
        </button>
      </Tooltip>

      <Tooltip label="Харьцуулах">
        <button className="bg-slate-200/40 rounded-full p-2 hover:bg-slate-200 transition-all duration-300 ease-in-out">
          <BiGitCompare className="text-blue-700" />
        </button>
      </Tooltip>
    </div>
  );
};

export default AdCardButton;
