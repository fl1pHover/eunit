import { Skeleton } from '@chakra-ui/react';

import AdCard from '@/components/home/adCard';
import { ContainerXP } from '@/lib/Container';
import { SectionTitle } from '@/lib/Title';
// import { BiArrowFromRight } from "react-icons/bi";
import mergeNames from '@/util/mergeNames';
import { useRouter } from 'next/router';
import { AiOutlineArrowRight } from 'react-icons/ai';

// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';

// import required modules
import { STYLES } from '@/styles/index';

const AdContent = ({
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
      <div className="grid grid-cols-2 gap-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3">
        {data?.map((item, key) => (
          <AdCard key={key} item={item || {}} />
        ))}{' '}
        {data == undefined && <Skeleton />}
      </div>
      {/* <Swiper
        navigation={true}
        slidesPerView={5}
        grid={{
          rows: 2,
        }}
        fill="column"
        slidesPerColumn={2}
        modules={[Grid, Navigation]}
        className="mySwiper"
      >
        {data?.map((item, key) => (
          <SwiperSlide key={key}>
            <AdCard item={item || {}} />
          </SwiperSlide>
        ))}
      </Swiper> */}

      
    </ContainerXP>
  );
};

export default AdContent;
