import AdCard from '@/components/home/adCard';
import { ContainerXP } from '@/lib/Container';
import { SectionTitle } from '@/lib/Title';
// import { BiArrowFromRight } from "react-icons/bi";
import mergeNames from '@/util/mergeNames';
import { useRouter } from 'next/router';
import { AiOutlineArrowRight } from 'react-icons/ai';

import SwiperNav from '@/util/SwiperNav';
import { Skeleton } from '@chakra-ui/react';
import { SwiperSlide } from 'swiper/react';

// import required modules

const AdContent = ({
  inCat,
  showLink,
  data = [],
  key = Math.random(),
  title = 'Үл хөдлөх хөрөнгө',
  url = 'realState',
}) => {
  const router = useRouter();
  return (
    <ContainerXP key={key} classname="pb-10">
      <div className="flex flex-row items-end justify-between mt-4 mb-4 md:mt-6">
        <div className="pl-4 text-left">
          <SectionTitle>{title}</SectionTitle>
        </div>
        <button
          onClick={() => router.push(`category/${url}`)}
          className={mergeNames(showLink, 'flex items-center')}
        >
          <p className="text-sm font-semibold">Цааш үзэх</p>
          <AiOutlineArrowRight size={12} />
        </button>
      </div>

      {inCat ? (
        <div className="grid grid-cols-2 gap-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3">
          {data?.ads?.map((item, i) => {
            return <AdCard key={i} item={item || {}} />;
          })}
          {data?.ads === undefined &&
            data?.map((item, i) => {
              return <AdCard key={i} item={item || {}} />;
            })}
        </div>
      ) : (
        <SwiperNav>
          {data?.ads?.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <AdCard item={item || {}} />
              </SwiperSlide>
            );
          })}
          {data?.ads === undefined &&
            data?.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  <AdCard item={item || {}} />
                </SwiperSlide>
              );
            })}
        </SwiperNav>
      )}
      {data == undefined && <Skeleton height={'300px'} />}
      {/* <ul className="flex float-right list-style-none">
        <li className="disabled">
          <button
            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
            tabIndex="-1"
          >
            Өмнөх
          </button>
        </li>
        <li>
          <button className={mergeNames(STYLES.notActive)}>1</button>
        </li>
        <li className="active">
          <button className={mergeNames(STYLES.active)}>
            2 <span className="visually-hidden"></span>
          </button>
        </li>
        <li>
          <button className={mergeNames(STYLES.notActive)}>3</button>
        </li>
        <li>
          <button className={mergeNames(STYLES.notActive)}>Дараах</button>
        </li>
      </ul> */}
      {/* {inCat ? (
        <div className="grid grid-cols-2 gap-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3">
          {data?.map((item, key) => (
            <AdCard key={key} item={item || {}} />
          ))}
        </div>
      ) : (
        <SwiperNav>
          {data?.map((item, key) => (
            <SwiperSlide key={key}>
              <AdCard item={item || {}} />
            </SwiperSlide>
          ))}
        </SwiperNav>
      )}
      {data == undefined && <Skeleton height={'300px'} />} */}
    </ContainerXP>
  );
};

export default AdContent;
