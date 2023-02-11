import React from 'react';
import { BiArea, BiDoorOpen } from 'react-icons/bi';

import { FiCamera } from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';
import { TbBath } from 'react-icons/tb';

import { Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import AdCardButton from './adCardButton';

const Card = ({ item }) => {
  const router = useRouter();
  return (
    <div className="relative overflow-hidden rounded-md shadow-md bg-zinc-200 group ">
      <div className="md:min-h-[35vh] min-h-[30vh] h-full w-full relative">
        <Image
          src={item?.images[0] ?? '/images/HeaderSlider/1.jpg'}
          alt="product image"
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-125 transition-all w-full h-full ease-in-out duration-400 aspect-[4/5]"
        />
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full">
        <div className="flex flex-col w-full h-full px-3 py-2 bg-gradient-to-b from-slate-700/0 via-slate-700/30 to-slate-900/100 ">
          <button
            onClick={() =>
              item && item._id && router.push(`/product/${item.num}`)
            }
            className="absolute top-0 left-0 z-10 flex items-start justify-between flex-1 w-full h-full p-2 "
          >
            <div className="px-2 py-1 rounded-md bg-mainBlossom w-fit">
              <p className="h-4 text-sm font-semibold text-white md:h-6">
                <Image
                  src="/images/logo/bom-white.png"
                  alt="BOM logo"
                  objectFit="contain "
                  className="h-full"
                />
              </p>
            </div>
            <button className="flex items-center justify-center w-6 h-6 bg-gray-600 rounded-full md:w-8 md:h-8">
              <FiCamera size={16} className="text-white" />
            </button>
          </button>
          <div className="relative flex flex-col justify-end h-full mb-2 space-y-2">
            <div className="flex flex-row justify-between w-full">
              <TextContainer
                title={item.title}
                description={item.positions?.location_id ?? ''}
              />
              <AdCardButton id={item?.num} />
            </div>
            <div className="flex flex-wrap items-end justify-between gap-x-1">
              {item?.filters?.map((p, i) => {
                return (
                  <React.Fragment key={i}>
                    <ApartmentIconInfo p={p} />
                    {p.id === 'area' && (
                      <ItemContainer
                        Icon={(props) => <BiArea {...props} text="" />}
                        text={calcValue(p.value, 'байхгүй', 'м.кв')}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const ApartmentIconInfo = ({ p }) => {
  // END YG ROOM MASTERBEDROOM AND BATHROOM IIN MEDEELEL BAIAGA
  return (
    <React.Fragment>
      {p && p.id === 'room' && (
        <ItemContainer
          text={calcValue(p.value, 'байхгүй')}
          Icon={(props) => <BiDoorOpen {...props} text="" />}
        />
      )}
      {p && p.id === 'masterBedroom' && (
        <ItemContainer
          Icon={(props) => <IoBedOutline {...props} text="" />}
          text={calcValue(p.value, 'байхгүй')}
        />
      )}
      {p && p.id === 'bathroom' && (
        <ItemContainer
          Icon={(props) => <TbBath {...props} text="" />}
          text={calcValue(p.value, 'байхгүй')}
        />
      )}
    </React.Fragment>
  );
};

const ItemContainer = ({ Icon = () => <></>, text = '' }) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <Icon className="text-white" />
      <p className="text-white md:text-sm text-[12px]">{text}</p>
    </div>
  );
};

const TextContainer = ({ title = '', description = '' }) => {
  return (
    <div className="w-2/3">
      <p className="text-sm font-bold text-white uppercase truncate md:text-lg">
        {title}
      </p>
      <p className="text-[12px] md:text-base font-semibold truncate text-slate-200/90 first-letter:uppercase">
        {description}
      </p>
    </div>
  );
};

const typeCheck = (id, propmt) => {
  return id && id.name && id.name.toLowerCase() === propmt;
  // return id && id.name && id.name.toLowerCase() === propmt;
};

const calcValue = (props, checker = 'Байхгүй', suffix) => {
  // p?.value?.toLowerCase() === "байхгүй"

  if (props.toString().toLowerCase() === checker) return 0;
  if (props) {
    if (suffix) return `${props} ${suffix}`;
    return props;
  }
  return '-';
};
export default Card;
