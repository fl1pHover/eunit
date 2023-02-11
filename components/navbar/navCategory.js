import { categories } from '@/data/categories';
import mergeNames from '@/util/mergeNames';
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
              onMouseOut={handleMouseOut}
              onMouseOver={() => handleMouseOver(id)}
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
                </div>
              </div>
              <div className="absolute left-[50%] -translate-x-[50%] w-full  flex flex-row overflow-hidden justify-center  bg-blue-900/[96]">
                {submenu &&
                  isHoveringId &&
                  isHoveringId === id &&
                  submenu.map(({ category, href }, subkey) => {
                    return (
                      <Link href={`/category/${href}`} key={subkey}>
                        <motion.a
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={mergeNames(
                            'px-4 py-3 text-sm font-medium text-white transition-colors ease-in cursor-pointer hover:bg-blue-700 first-letter:uppercase whitespace-nowrap',
                            subkey === submenu.length - 1
                              ? ''
                              : 'border-r-2 border-blue-900/[0.96]'
                          )}
                        >
                          <p>{category}</p>
                        </motion.a>
                      </Link>
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
