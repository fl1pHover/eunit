import React from "react";

import { Skeleton } from "@chakra-ui/react";

import AdCard from "@/components/home/adCard";
import { ContainerXP } from "@/lib/Container";
import { SectionTitle } from "@/lib/Title";
// import { BiArrowFromRight } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/router";

const AdContent = ({
  data = [],
  key = Math.random(),
  title = "Үл хөдлөх хөрөнгө",
  url = "realState",
}) => {
  const router = useRouter();
  return (
    <ContainerXP key={key} classname="pb-10">
      <div className="mb-4 md:mt-6 mt-4 flex flex-row items-end justify-between">
        <div className="text-left pl-4">
          <SectionTitle>{title}</SectionTitle>
        </div>
        <button
          onClick={() => router.push(`category/${url}`)}
          className="flex flex-row items-center gap-1 cursor-pointer"
        >
          <p className="font-semibold text-sm">Цааш үзэх</p>
          <AiOutlineArrowRight size={12} />
        </button>
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-5">
        {data &&
          data.map((item, key) => <AdCard key={key} item={item || {}} />)}
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </ContainerXP>
  );
};

export default AdContent;
