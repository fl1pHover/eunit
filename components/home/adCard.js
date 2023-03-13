import React from 'react';
import { BiArea, BiDoorOpen } from 'react-icons/bi';

import { IoBedOutline } from 'react-icons/io5';
import { TbBath } from 'react-icons/tb';

import urls from '@/constants/api';
import { DButton, ImageCount } from '@/lib/Button';
import Tip from '@/lib/Tip';
import Alerting from '@/util/Alert';
import mergeNames from '@/util/mergeNames';
import { Skeleton } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import AdCardButton from './adCardButton';

function Card({ item, deleteFunc = {}, isDelete = false }) {
  const router = useRouter();
  const user = getCookie('user');
  return (
    // <Skeleton>
    <Skeleton isLoaded>
      <div className="relative overflow-hidden rounded-md md:min-h-[350px] min-h-[300px]  shadow-md bg-zinc-200 group ">
        {/* zarin zurag absolute  */}
        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-0 w-full h-full cursor-pointer"
          onClick={async () => {
            user &&
              item &&
              item._id &&
              (await axios
                .get(
                  `${urls['test']}/ad/view/${item.num}/${JSON.parse(user)._id}`
                )
                .then((d) => router.push(`/product/${item.num}`)));
          }}
        >
          {item?.images && (
            <Image
              src={item?.images[0] ?? '/images/noImage.png'}
              alt=" зар"
              layout="fill"
              objectFit="cover"
              className={mergeNames(
                'group-hover:scale-125 transition-all w-full object-cover h-full ease-in-out duration-400 aspect-[4/5] relative z-0 ',
                'text-center grid place-items-center font-bold'
              )}
            />
          )}

          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-700/0 via-slate-700/30 to-slate-900/100"></div>
        </div>
        {/* Zariin body  */}
        <div className="relative z-10 flex items-center justify-between flex-1 w-full h-full px-3 py-2">
          <Tip lbl="Зарын эзэн">
            <button className="relative rounded-full w-9 h-9 bg-mainBlossom ">
              <Image
                // Eniig user bolgood darahaar ordgoor
                src={
                  // useriinZurag ??
                  '/images/logo/bom-white.png'
                }
                alt="BOM logo"
                objectFit="contain"
                layout="fill"
                className="p-2"
                onClick={() => router.push(`account/${item.user}`)}
              />
            </button>
          </Tip>
          {isDelete ? (
            // <DButton onClick={deleteFunc} />
            <Alerting
              btn={<DButton onClick={deleteFunc} />}
              onclick={deleteFunc}
            />
          ) : (
            <ImageCount onClick={() => console.log('Zurag')}>
              {item?.images?.length}
            </ImageCount>
          )}
        </div>

        {/* Zariin info  */}
        <div className="absolute bottom-0 left-0 z-20 flex flex-col justify-end w-full p-2 mb-2 space-y-2 ">
          <div className="flex items-center justify-between gap-4 text-sm text-white font-md">
            <p className={mergeNames('font-bold text-xl')}>Price</p>
          </div>
          <div className="relative flex flex-row justify-between w-full">
            <TextContainer
              title={item.title}
              description={item.positions?.location_id ?? ''}
            />
            <AdCardButton id={item?.num} adId={item?._id} />
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-white font-md">
            <p className={mergeNames('font-semibold text-white mt-0')}>
              SubCat
            </p>
            <p className={mergeNames('font-semibold text-white mt-0')}>
              Buy/sell/rent
            </p>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-x-1">
            {item?.filters?.map((p, i) => {
              return (
                <React.Fragment key={i}>
                  <ApartmentIconInfo p={p} />

                  {p.type === 'area' && (
                    <ItemContainer
                      lbl={p.name}
                      Icon={(props) => <BiArea {...props} text="" />}
                      text={calcValue(p.input, 'байхгүй', 'м.кв')}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          {item?.adStatus == 'pending' && (
            <p
              className={mergeNames(
                'text-teal-300 px-3 rounded-md font-bold mx-auto'
              )}
            >
              {/* {item.adStatus} */}
              Хүлээгдэж байна...
            </p>
          )}
          {item?.adStatus == 'deleted' && (
            <p
              className={mergeNames(
                'text-teal-300 px-3 rounded-md font-bold mx-auto'
              )}
            >
              {/* {item.adStatus} */}
              Устгагдсан байна...
            </p>
          )}
        </div>
      </div>
    </Skeleton>
  );
}
const ApartmentIconInfo = ({ p }) => {
  // END YG ROOM MASTERBEDROOM AND BATHROOM IIN MEDEELEL BAIAGA
  return (
    <React.Fragment>
      {p && p.type === 'room' && (
        <ItemContainer
          lbl={p.name}
          text={calcValue(p.input, 'байхгүй')}
          Icon={(props) => <BiDoorOpen {...props} text="" />}
        />
      )}
      {p && p.type === 'masterBedroom' && (
        <ItemContainer
          lbl={p.name}
          Icon={(props) => <IoBedOutline {...props} text="" />}
          text={calcValue(p.input, 'байхгүй')}
        />
      )}
      {p && p.type === 'bathroom' && (
        <ItemContainer
          lbl={p.name}
          Icon={(props) => <TbBath {...props} text="" />}
          text={calcValue(p.input, 'байхгүй')}
        />
      )}
    </React.Fragment>
  );
};

const ItemContainer = ({ Icon = () => <></>, text = '', lbl }) => {
  return (
    <Tip lbl={lbl}>
      <div className="flex flex-row items-center gap-1">
        <Icon className="text-white" />
        <p className="text-white md:text-sm text-[12px]">{text}</p>
      </div>
    </Tip>
  );
};

const TextContainer = ({ title = '', description = '' }) => {
  return (
    <div className="w-2/3">
      <p className="text-sm font-semibold text-white uppercase truncate md:text-[16px]">
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
