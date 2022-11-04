import React from "react";
// import swiper
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Box, Link } from "@chakra-ui/react";
import { Autoplay, Navigation, Pagination } from "swiper";

import Image from "next/image";

const headerImageData = [
     {
          image: "/images/HeaderSlider/1.jpg",
          href: "/1",
     },
     {
          image: "/images/HeaderSlider/2.jpg",
          href: "/1",
     },
     {
          image: "/images/HeaderSlider/1.jpg",
          href: "/1",
     },
     {
          image: "/images/HeaderSlider/2.jpg",
          href: "/1",
     },
];

const SwiperHeader = () => {
     return (
          <Box
               height="60vh"
               // Padding hiivel
               // padding={"5px"}
          >
               <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                         delay: 2000,
                         disableOnInteraction: false,
                    }}
                    pagination={{
                         clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper headerSwiper"
               >
                    {headerImageData.map(({ ...props }, index) => {
                         return (
                              <SwiperSlide key={index}>
                                   <Link href={props.href}>
                                        <Image
                                             src={props.image}
                                             layout="fill"
                                             objectFit="cover"
                                             alt="swiper image"
                                        />
                                   </Link>
                              </SwiperSlide>
                         );
                    })}
               </Swiper>
          </Box>
     );
};

export default SwiperHeader;
