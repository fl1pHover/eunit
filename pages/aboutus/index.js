import { ContainerX } from "@/lib/Container";
import { SectionTitle } from "@/lib/Title";
import { STYLES } from "@/styles/index";
import mergeNames from "@/util/mergeNames";
import { Heading } from "@chakra-ui/react";
import React from "react";

const AboutUs = () => {
  return (
    <section id="aboutus">
      <div className="h-[45vh] w-full relative grid place-items-center bg-gradient-to-t from-cyan-500/10 to-slate-900/90">
        {/* <img
          src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v1016-c-08_1-ksh6mza3.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=f584d8501c27c5f649bc2cfce50705c0"
          alt=""
          className="fixed top-0 left-0 object-cover h-[50vh] w-full z-[-1] "
        /> */}
        <video
          width="320"
          height="240"
          className="fixed top-0 left-0 object-cover h-[50vh] w-full z-[-1]"
          autoPlay
          muted
          loop
        >
          <source src="./videos/eunit-teaser.mp4" type="video/mp4" />
          <source src="./videos/eunit-teaser.mp4" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
        <SectionTitle classname="text-white">Бидний тухай</SectionTitle>
      </div>

      <div className="bg-bgGrey">
        <ContainerX classname="relative py-10 z-3">
          <div className="flex flex-col w-full gap-10 md:flex-row">
            <div className="flex flex-col w-full gap-5">
              <SectionTitle>Компанийн танилцуулга</SectionTitle>
              <p className="text-justify indent-5">
                Санхүү, нягтлан бодох бүртгэлийн зөвлөгөө өгөх, хөрөнгийн
                үнэлгээ хийх чиглэлээр 2019 оны 9-р сард үүсгэн байгуулагдсан
                Солид Юнити ХХК нь Монгол Улсын Сангийн сайдын 172-2019 дугаар
                бүхий “Аудитын үйл ажиллагаа эрхлэх” тусгай зөвшөөрлийг авснаар
                Солид Юнити Аудит ХХК нэртэйгээр аудитын салбарт бизнесийн үйл
                ажиллагаагаа эрхлэн, улсынхаа нийгэм, эдийн засгийн хөгжилд хувь
                нэмрээ оруулан ажиллаж байна.
              </p>
            </div>
            <img
              src="https://solidunity.mn/team/high/group_down.jpg"
              alt=""
              className="object-cover w-full rounded-lg xl:w-2/3"
            />
          </div>
        </ContainerX>
      </div>
    </section>
  );
};

export default AboutUs;
