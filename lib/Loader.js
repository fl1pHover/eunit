import mergeNames from '@/util/mergeNames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { STYLES } from '../styles';

export const MainLoader = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 z-50 w-screen h-screen bg-bgdark/90 lds-ellipsis"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
    >
      <div
        className={mergeNames(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          STYLES.flexCenter,
          'flex-col items-center'
        )}
      >
        <Image
          src="/images/logo/bom-white-text.png"
          width={180}
          height={90}
          alt=""
        />
        <span className="loader"></span>
      </div>
    </motion.div>
  );
};
