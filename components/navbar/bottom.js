import Link from 'next/link';
import { useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';

import { categories } from '@/data/categories';
import { NavContainer } from '@/lib/Container';
import mergeNames from '@/util/mergeNames';

const Bottom = ({ sticky }) => {
  const [isHoveringId, setIsHoveringId] = useState(false);
  // const pt = useBreakpoints();

  const handleMouseOver = (id) => {
    setIsHoveringId(id);
  };

  const handleMouseOut = () => {
    setIsHoveringId(false);
  };

  return (
    <div
      className={mergeNames(
        'md:block hidden',
        'bg-mainBlossom shadow-lg',
        'transition-all ease-in-out duration-500',
        sticky ? 'wrap' : 'nowrap'
      )}
    >
      <NavContainer>
        <div className="flex flex-row items-center justify-between h-full gap-2">
          <div className="flex flex-row items-stretch h-full ">
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
                    <div className="relative h-full">
                      <div className="flex flex-col justify-center h-full px-2 py-4 lg:py-6 lg:px-4">
                        <Link href={`/category/${id}`}>
                          <a className="text-sm font-medium text-center text-white lg:text-base">
                            {categoryName}
                          </a>
                        </Link>
                      </div>
                      <div className="absolute left-0 min-w-full bg-blue-900/[0.96] rounded-b-md flex flex-col overflow-hidden">
                        {submenu &&
                          isHoveringId &&
                          isHoveringId === id &&
                          submenu.map(({ category, href }, subkey) => {
                            return (
                              <Link
                                key={subkey}
                                href={`/category/${id}/${href}`}
                                // className="px-4 py-3 text-sm font-medium text-white transition-colors ease-in hover:bg-blue-700 first-letter:uppercase whitespace-nowrap"
                              >
                                <a className="px-4 py-3 text-sm font-medium text-white transition-colors ease-in hover:bg-blue-700 first-letter:uppercase whitespace-nowrap">
                                  {category}
                                </a>
                              </Link>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div className="flex flex-row gap-1 lg:gap-4">
            <Link href={'/project'} className="hidden lg:block">
              <button
                disabled
                className="px-4 py-1 text-sm text-gray-500 border border-blue-900 rounded-lg cursor-not-allowed lg:text-base"
              >
                Шинэ төсөл
              </button>
            </Link>

            <Link href={'/createAd'}>
              <button className="flex flex-row items-center gap-1 px-4 py-1 text-sm font-semibold text-white transition-all ease-in-out bg-teal-700 rounded-lg lg:text-base hover:scale-105">
                <p>Зар нэмэх</p>
                <BiPlusCircle className="hidden lg:block" />
              </button>
            </Link>
          </div>
        </div>
      </NavContainer>
    </div>
  );
};

export default Bottom;
