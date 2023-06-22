import EstimatedCard, {
  EstimateDeleteButton,
} from "@/components/estimator/EstimatedCard";
import AdCardButton from "@/components/home/adCardButton";
import { WhiteHeartIcon } from "@/components/navbar/icons";
import { HeartIcon } from "@/components/navbar/icons";
import urls from "@/constants/api";
import { STYLES } from "@/styles/index";
import CustomModal from "@/util/CustomModal";
import mergeNames from "@/util/mergeNames";
import { Image, Link, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Tooltip } from "flowbite-react";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

const Estimated = () => {
  const token = getCookie("token");
  const [estimate, setEstimate] = useState([]);
  const getEstimate = async () => {
    await axios
      .get(`${urls["test"]}/estimate`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Headers": "*",
        },
      })
      .then((d) => setEstimate(d.data));
  };
  useEffect(() => {
    if (token) getEstimate();
  }, [token]);

  return (
    <div className="py-5">
      <div className="flex justify-end w-full">
        {/* Таны үнэлгээ */}

        <EstimateDeleteButton label={true} />
      </div>
      <div className="grid grid-cols-1 gap-3 my-3 xl:grid-cols-2 4xl:grid-cols-3 w-100">
        {estimate &&
          estimate.map((est, i) => {
            return <EstimatedCard est={est} key={i} />;
          })}
      </div>
    </div>
  );
};

export default Estimated;

// export const EstimatedCard = ({ est, adminBtn }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <div className="w-full text-left">
//       <div className="bg-white shadow-md  flex  gap-3 rounded-md p-5 border border-gray-200  h-[125px]">
//         <Link
//           href={est.file ?? ""}
//           target="_blank"
//           className="flex items-center"
//         >
//           <Image
//             src={
//               "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
//             }
//             alt="Үнэлгээ зураг"
//             className="w-[60px] overflow-hidden border border-gray-300 rounded-md "
//           />
//         </Link>
//         <div className="flex flex-col justify-between w-full h-full ">
//           <div className="flex justify-between w-full">
//             <div className="text-sm font-semibold">
//               <h1 className="text-gray-400">{est?.category?.name ?? ""}</h1>
//               <h1>{est?.subCategory?.name ?? ""}</h1>
//             </div>

//             <div>
//               <p className="font-semibold">
//                 {est.status == "pending" ? " " : "Value"}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center justify-between w-full">
//             <div className="text-sm">
//               <h1
//                 className={mergeNames(
//                   "text-gray-400 font-semibold",
//                   est.status && "text-yellow-400",
//                   est.deleted && "text-red-400"
//                 )}
//               >
//                 {est.status ?? ""}
//               </h1>
//               {/* <h1>Lorem ipsum dolor sit amet.</h1> */}
//             </div>
//             <div className="flex items-center gap-3">
//               <EstimateDeleteButton />
//               <CustomModal
//                 className=""
//                 isOpen={isOpen}
//                 onOpen={onOpen}
//                 onClose={onClose}
//                 btnClose2={"Буцах"}
//                 header={"Үнэлгээ"}
//                 btnOpen={<EstimateShowButton />}
//               >
//                 <div className="flex flex-col gap-3">
//                   {est?.items?.map((item, i) => {
//                     return (
//                       <h2>
//                         {item.name}:
//                         <span className="font-semibold">
//                           &nbsp;{item.value}{" "}
//                         </span>
//                       </h2>
//                     );
//                   })}
//                   <p className={mergeNames("text-center")}></p>
//                 </div>
//               </CustomModal>
//               {adminBtn}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const EstimateDeleteButton = ({ label = false }) => {
//   return (
//     <div className="relative flex flex-row items-center space-x-2">
//       <button
//         className={mergeNames(cardIcon.div, label && "px-2 rounded-md")}
//         onClick={() => {}}
//       >
//         <BiTrash className={mergeNames("text-red-500", cardIcon.icon)} />
//         {label && <p className="text-sm text-red-400 "> Үнэлгээг хоослох</p>}
//       </button>
//     </div>
//   );
// };

// export const EstimateShowButton = ({ label = false }) => {
//   return (
//     <div className="relative flex flex-row items-center space-x-2">
//       <button
//         className={mergeNames(
//           cardIcon.div,
//           "bg-blue-200/40",
//           label && "px-2 rounded-md"
//         )}
//         onClick={() => {}}
//       >
//         <AiFillEye className={mergeNames("text-blue-500", cardIcon.icon)} />
//         {label && <p className="text-sm text-blue-400 "> Үнэлгээг хоослох</p>}
//       </button>
//     </div>
//   );
// };
