import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper";

import Image from "next/image";

const headerImageData = [
  {
    image: "/images/HeaderSlider/4.png",
    href: "/1",
  },
  {
    image: "/images/HeaderSlider/4.png",
    href: "/1",
  },
  {
    image: "/images/HeaderSlider/4.png",
    href: "/1",
  },
  {
    image: "/images/HeaderSlider/4.png",
    href: "/1",
  },
];

const SwiperHeader = () => {
  return (
    <div
      height="60vh"
      // Padding hiivel
      // padding={"5px"}
      className="h-[60vh]"
    >
      <Swiper
        spaceBetween={0}
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
            <SwiperSlide key={index} className="relative">
              {/* <Link href={props.href}> */}
              {/* </Link> */}
              <Image
                src={props.image}
                layout="fill"
                objectFit="cover"
                alt="swiper image"
                className="absolute"
              />
              <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-slate-900/30" />
              <div className="relative flex flex-col items-center justify-center w-full h-full z-1">
                <p className="text-4xl font-semibold text-white md:text-6xl">
                  Онцгой зар
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SwiperHeader;
