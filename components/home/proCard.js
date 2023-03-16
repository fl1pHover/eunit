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
import currency from 'currency.js';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { SwiperSlide } from 'swiper/react';
import EditAd from '../ad/edit';
import AdCardButton from './adCardButton';

// Import Swiper React components
import { Swiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper';

function ProCard({
  item,
  deleteFunc = {},
  isDelete = false,
  data,
  setData,
  admin = false,
}) {
  const router = useRouter();
  const user = getCookie('user');
  // console.log(item.user);
  const token = getCookie('token');

  return (
    // <Skeleton>
    <Skeleton isLoaded>
      <div className="relative overflow-hidden rounded-2xl md:min-h-[350px] min-h-[300px]  shadow-md bg-zinc-200 group flex flex-col w-full h-full ">
        <div className="grid w-full h-full grid-cols-2">
          <div className="absolute top-0 left-0 z-10 flex items-center justify-between flex-1 w-full px-3 py-2">
            <ImageCount onClick={() => console.log('Zurag')}>
              {item?.images?.length}
            </ImageCount>
            {isDelete ? (
              // <DButton onClick={deleteFunc} />
              <Fragment>
                <EditAd
                  ads={data}
                  setData={setData}
                  admin={admin}
                  data={item}
                  onNext={async () => {
                    await axios
                      .put(`${urls['test']}/ad/${item._id}`, item, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                          'Access-Control-Allow-Headers': '*',
                          'Content-Type': 'application/json',
                          charset: 'UTF-8',
                        },
                      })
                      .then((d) => console.log(d.data));
                  }}
                >
                  <AiFillEdit />
                </EditAd>
                <Alerting
                  btn={<DButton onClick={deleteFunc} />}
                  onclick={deleteFunc}
                />
              </Fragment>
            ) : (
              <AdCardButton id={item?.num} adId={item?._id} />
            )}
          </div>
          <div className="relative z-0 w-full h-full bg-gray-800 cursor-pointer ">
            {/* {item?.images && ( */}
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper cardSwiper"
            >
              {item?.images.length == 0 && (
                <Image
                  src={'/images/noImage.png'}
                  alt=" зар"
                  layout="fill"
                  objectFit="cover"
                  className={mergeNames(
                    'transition-all w-full object-cover h-full ease-in-out duration-400 relative'
                  )}
                />
              )}

              {item?.images.map((c, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Image
                      src={c ?? '/images/noImage.png'}
                      alt=" зар"
                      layout="fill"
                      objectFit="cover"
                      className={mergeNames(
                        'transition-all w-full object-cover h-full ease-in-out duration-400 relative'
                      )}
                      onClick={async () => {
                        if (user) {
                          item?._id &&
                            (await axios
                              .get(
                                `${urls['test']}/ad/view/${item.num}/${
                                  JSON.parse(user)._id
                                }`
                              )
                              .then((d) =>
                                router.push(`/product/${item.num}`)
                              ));
                        } else {
                          item?._id && router.push(`/product/${item.num}`);
                        }
                      }}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* <div className="absolute top-0 left-0 z-10 w-full h-full bg-gradient-to-b from-slate-700/0 via-slate-700/30 to-slate-900/100"></div> */}
          </div>
          <div className="relative flex flex-col w-full p-2 pt-10 space-y-2 bom-bg">
            <div className="flex items-center justify-between gap-4 text-sm font-md">
              <p className={mergeNames('font-bold text-xl')}>
                {currency(
                  `${item?.filters?.find((f) => f.type == 'price')?.input}`,
                  {
                    separator: ',',
                    symbol: '₮ ',
                    pattern: `# !`,
                  }
                )
                  .format()
                  .toString() ?? 0}
              </p>
            </div>
            <div className="relative flex flex-row justify-between w-full">
              <TextContainer
                dark={true}
                title={item.title}
                description={item.positions?.location_id ?? ''}
              />
            </div>
            <div className="flex items-center justify-between gap-4 text-sm text-mainBLossom font-md">
              <p className={mergeNames('font-semibold  mt-0')}>
                {item?.subCategory?.name ?? ''}
              </p>
              <p className={mergeNames('font-semibold  mt-0')}>
                {item?.types[0] ?? ''}
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
        <div className="h-[50px] absolute bottom-0 border border-top-bgGrey left-0 w-full backdrop-blur-sm p-2 bg-white/90">
          <Tip lbl="Зарын эзэн">
            <button
              className="flex items-center gap-2"
              onClick={() => router.push(`/account/${item.user}`)}
            >
              <div className="relative rounded-full w-9 h-9 bg-mainBlossom ">
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
                />
              </div>
              <p className="font-semibold">Username</p>
            </button>
          </Tip>
        </div>
      </div>

      {/* Zariin body  */}

      {/* Zariin info  */}
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
        <Icon className="text-mainBlossom" />
        <p className="text-mainBlossom md:text-sm text-[12px]">{text}</p>
      </div>
    </Tip>
  );
};

const TextContainer = ({ title = '', description = '', dark }) => {
  return (
    <div className="w-2/3">
      <p
        className={mergeNames(
          'text-sm font-semibold  uppercase truncate md:text-[16px]',
          dark ? 'text-mainBlossom' : 'text-white'
        )}
      >
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
export default ProCard;
