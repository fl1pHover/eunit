import { categories } from '@/data/categories';
import mergeNames from '@/util/mergeNames';
import { Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
const NavCategory = () => {
  const [isHoveringId, setIsHoveringId] = useState(false);
  const handleMouseOver = (id) => {
    setIsHoveringId(id);
  };

  const handleMouseOut = () => {
    setIsHoveringId(false);
  };

  return (
    <>
      {categories?.map(
        ({ image, categoryName, id, itemCount, submenu }, key) => {
          return (
            <div
              key={key}
              // onClick={() => handleMouseOver(id)}
              onMouseOver={() => handleMouseOver(id)}
              onMouseOut={handleMouseOut}
              className={mergeNames(
                'hover:bg-blue-900 transition-colors ease-in-out'
              )}
            >
              <div className="h-full">
                <div className="flex flex-col justify-center h-full px-2 py-4 lg:py-3 lg:px-4">
                  <Link href={`/category/${id}`}>
                    <a className="text-[11px] font-medium text-center h-full text-white lg:text-[13px]">
                      {categoryName}
                    </a>
                  </Link>
                  {/* <p className="text-[11px] font-medium text-center h-full text-white lg:text-[13px]">
                    {categoryName}
                  </p> */}
                </div>
              </div>
              <div className="absolute left-[50%] -translate-x-[50%] w-full  flex flex-row overflow-hidden justify-center ">
                {submenu &&
                  isHoveringId &&
                  isHoveringId === id &&
                  submenu.map(({ category, href }, subkey) => {
                    return (
                      <div key={subkey}>
                        {/* <div className="absolute left-0 w-1/2 h-full from-blue-900/0 via-blue-900/40 to-blue-900/100 bg-[url('/images/flurry.svg')] bg-no-repeat" /> */}
                        <Image
                          src="/images/flurry.svg"
                          alt="asd"
                          className="absolute top-0 left-0 w-1/2"
                          bgRepeat="repeat"
                        />

                        <Link href={`/category/${href}`}>
                          <motion.a
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={mergeNames(
                              'px-2 lg:px-4 py-3 text-[10px] lg:text-sm font-medium text-white transition-colors ease-in cursor-pointer bg-blue-900/[96] hover:bg-blue-700 first-letter:uppercase whitespace-nowrap z-30',
                              subkey === submenu.length - 1
                                ? ''
                                : 'border-r border-blue-900/[96]'
                            )}
                          >
                            <p>{category}</p>
                          </motion.a>
                        </Link>
                        <Image
                          src="/images/flurry.svg"
                          alt="asd"
                          className="absolute top-0 right-0 w-1/2 rotate-90"
                          bgRepeat="repeat"
                        />
                        {/* <div className="absolute right-0 w-1/2 h-full bg-gradient-to-r from-blue-900/100 via-blue-900/40 to-white/0" /> */}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        }
      )}
    </>
  );
};

export default NavCategory;
