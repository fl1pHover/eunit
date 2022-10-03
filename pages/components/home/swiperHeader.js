import React from "react";
import NextLink from "next/link";
// import swiper
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { Box, Image, Link } from "@chakra-ui/react";

const headerImageData = [
     {
          image: "./images/HeaderSlider/1.jpg",
          href: "/1",
     },
     {
          image: "./images/HeaderSlider/2.jpg",
          href: "/1",
     },
     {
          image: "./images/HeaderSlider/1.jpg",
          href: "/1",
     },
     {
          image: "./images/HeaderSlider/2.jpg",
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
                         delay: 5000,
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
                                   <NextLink href={props.href} passHref>
                                        <Link>
                                             <Image
                                                  src={props.image}
                                                  width="100%"
                                                  height={"100%"}
                                                  objectFit="cover"
                                             />
                                        </Link>
                                   </NextLink>
                              </SwiperSlide>
                         );
                    })}
               </Swiper>
          </Box>
     );
};

export default SwiperHeader;
