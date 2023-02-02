import { Skeleton } from '@chakra-ui/react';

import AdCard from '@/components/home/adCard';
import { ContainerXP } from '@/lib/Container';
import { SectionTitle } from '@/lib/Title';
// import { BiArrowFromRight } from "react-icons/bi";
import { useRouter } from 'next/router';
import { AiOutlineArrowRight } from 'react-icons/ai';

const AdContent = ({
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
          className="flex flex-row items-center gap-1 cursor-pointer"
        >
          <p className="text-sm font-semibold">Цааш үзэх</p>
          <AiOutlineArrowRight size={12} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3">
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
