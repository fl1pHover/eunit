import { swiperBreakpoints } from '@/constants/enums';

import { Grid, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import { Swiper } from 'swiper/react';

const SwiperNav = ({ children }) => {
  return (
    <Swiper
      navigation={true}
      slidesPerView={5}
      grid={{
        rows: 2,
        fill: 'row',
      }}
      breakpoints={swiperBreakpoints}
      spaceBetween={20}
      fill="column"
      modules={[Grid, Navigation, Pagination]}
      className="mySwiper"
      // pagination={{
      //   type: 'progressbar',
      // }}
    >
      {children}
    </Swiper>
  );
};

export default SwiperNav;
