import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { ContainerX } from '../../lib/Container';
import mergeNames from '../../util/mergeNames';

const Bottom = ({ sticky, data }) => {
  const [isHoveringId, setIsHoveringId] = useState(null);
  // const pt = useBreakpoints();
  const router = useRouter();
  const handleMouseOver = (category) => {
    setIsHoveringId(category);
  };

  const handleMouseOut = () => {
    setIsHoveringId(null);
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
      <ContainerX>
        <div className="flex flex-row items-center justify-between h-full gap-2">
          <div className="flex flex-row items-stretch h-full">
            {data?.map((category, key) => {
              return (
                <div
                  key={key}
                  onMouseOut={handleMouseOut}
                  onMouseOver={() => handleMouseOver(category)}
                  className={mergeNames(
                    'hover:bg-blue-900 transition-colors ease-in-out'
                  )}
                >
                  <div className="relative h-full">
                    <div className="h-full lg:py-6 lg:px-4 px-2 py-4 flex flex-col justify-center">
                      <Link href={`/category/${category.name}`}>
                        <a className="text-white font-medium text-sm lg:text-base text-center">
                          {category.name}
                        </a>
                      </Link>
                    </div>
                    <div className="absolute left-0 min-w-full bg-blue-900/[0.96] rounded-b-md flex flex-col overflow-hidden">
                      {category?.subCategory &&
                        isHoveringId != null &&
                        isHoveringId == category &&
                        category.subCategory?.map(({ name, href }, key) => {
                          return (
                            <Button
                              key={key}
                              onClick={() => {
                                router
                                  .push(`/category/${href}`)
                                  .then(() => router.reload());
                              }}
                              borderRadius="0"
                              // colorScheme="mainBlue"
                              className="bg-[#1d3988] text-left text-sm text-white font-medium px-4 py-3 hover:bg-blue-700 first-letter:uppercase transition-colors ease-in whitespace-nowrap"
                            >
                              {/* <a className="text-sm text-white font-medium px-4 py-3 hover:bg-blue-700 first-letter:uppercase transition-colors ease-in whitespace-nowrap z-1 w-full"> */}
                              {name}
                              {/* </a> */}
                            </Button>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-row lg:gap-4 gap-1">
            <Link href={'/project'} className="lg:block hidden">
              <button
                disabled
                className="text-gray-500 border border-blue-900 rounded-lg px-4 py-1 cursor-not-allowed text-sm lg:text-base"
              >
                Шинэ төсөл
              </button>
            </Link>

            <Link href={'/createAd'}>
              <button className="bg-teal-700 rounded-lg px-4 py-1 text-white font-semibold text-sm lg:text-base hover:scale-105 transition-all ease-in-out flex flex-row items-center gap-1">
                <p>Зар нэмэх</p>
                <BiPlusCircle className="lg:block hidden" />
              </button>
            </Link>
          </div>
        </div>
      </ContainerX>
    </div>
  );
};

export default Bottom;
