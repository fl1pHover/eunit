import mergeNames from "@/util/mergeNames";
import { motion } from "framer-motion";
import Image from "next/image";
import { STYLES } from "../styles";

export const MainLoader = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-screen h-screen lds-ellipsis z"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full h-full bg-red-500"></div>
      <div
        className={mergeNames(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          STYLES.flexCenter,
          "flex-col items-center"
        )}
      >
        <Image
          src="/images/logo/bom-white-text.png"
          width={90}
          height={90}
          objectFit="cover"
          alt=""
        />
        <span className="loader"></span>
      </div>
    </motion.div>
  );
};
