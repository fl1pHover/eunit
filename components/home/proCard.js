import React, { useState } from 'react';
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
import { AiFillEdit, AiOutlineEye } from 'react-icons/ai';
import { SwiperSlide } from 'swiper/react';
import EditAd from '../ad/edit';
import AdCardButton from './adCardButton';

import { Swiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { getSellType } from '@/context/functions';
import { STYLES } from '@/styles/index';
import moment from 'moment';
import { Navigation } from 'swiper';

function ProCard({
  item,
  deleteFunc = {},
  isDelete = false,
  data,
  setData,
  admin = false,
  user,
}) {
  const router = useRouter();
  const token = getCookie('token');
  const [image, setImage] = useState(1);

  return (
    // <Skeleton>
    <Skeleton isLoaded>
      <div className="relative overflow-hidden rounded-2xl md:min-h-[350px] min-h-[300px]  shadow-md  group flex flex-col w-full h-full mb-2">
        <div className="grid flex-1 w-full h-full grid-cols-1 md:grid-cols-2">
          <div className="absolute top-0 left-0 z-10 flex items-center justify-between flex-1 w-full px-3 py-2">
            {item?.images.length != 0 ? (
              <ImageCount onClick={() => console.log('Zurag')}>
                {image}/{item?.images?.length}
              </ImageCount>
            ) : (
              <ImageCount onClick={() => console.log('Zurag')}>0</ImageCount>
            )}
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
              <AdCardButton id={item?.num} adId={item?._id} user={user} />
            )}
          </div>
          <div className="relative z-0 w-full h-full bg-gray-800 cursor-pointer h-[250px]">
            <div className="absolute z-20 p-2 text-center text-white -rotate-45 top-[30px] w-52 -left-[50px] bg-mainBlossom">
              {/* <Image src="/utils/vip.png" layout="fill" /> */}
              <p className="font-bold tracking-wide">VIP</p>
            </div>
            {/* {item?.images && ( */}
            {item?.images.length == 0 && (
              <Image
                src={'/images/noImage.png'}
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
                        .get(`${urls['test']}/ad/view/${item.num}/${user._id}`)
                        .then((d) => router.push(`/ad/${item.num}`)));
                  } else {
                    item?._id && router.push(`/ad/${item.num}`);
                  }
                }}
              />
            )}
            <Swiper
              navigation={true}
              modules={[Navigation]}
              onSlideChange={(swiper) => setImage(swiper.realIndex + 1)}
              // loop={true}
              className="mySwiper cardSwiper"
              onClick={async () => {
                if (user) {
                  item?._id &&
                    (await axios
                      .get(`${urls['test']}/ad/view/${item.num}/${user._id}`)
                      .then((d) => router.push(`/product/${item.num}`)));
                } else {
                  item?._id && router.push(`/product/${item.num}`);
                }
              }}
            >
              {item?.images.map((c, i) => {
                const a = '/images/noImage.png';
                return (
                  <SwiperSlide key={i} onClick={() => setImage(i + 1)}>
                    <Image
                      src={c ?? a}
                      alt="Зарын зураг"
                      layout="fill"
                      objectFit="cover"
                      className={mergeNames(
                        'transition-all w-full object-cover h-full ease-in-out duration-400 relative'
                      )}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div className="absolute bottom-0 left-0 z-20 w-full pointer-events-none h-1/2 bg-gradient-to-b from-slate-700/0 via-slate-700/10 to-slate-900/40"></div>
          </div>
          <div className="relative flex flex-col justify-between w-full h-full p-4 space-y-2 bg-white bom-bg">
            {/* <Box className="absolute w-full h-full scale-y-150 scale-x-125 bg-[#0c0e23] rotate-6" /> */}
            <div className="z-0 flex flex-col gap-0 md:gap-2">
              <div className="z-10 flex items-center justify-between gap-4 text-sm font-md">
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
              <div className="flex flex-wrap items-end gap-5 my-3">
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
              <div className="relative flex flex-row justify-between w-full">
                <TextContainer
                  dark={true}
                  title={item.title}
                  description={item.positions?.location_id ?? ''}
                />
              </div>

              <div className="flex items-center gap-2 my-1 text-sm text-mainBLossom font-md">
                <p
                  className={mergeNames(
                    'font-semibold flex gap-1 items-center mt-0 rounded-sm bg-red-400 text-white px-2'
                  )}
                >
                  {/* <AiOutlineCheckCircle className="text-blue-600" /> */}
                  {getSellType(item?.sellType ?? '')}
                </p>
                <p
                  className={mergeNames(
                    'font-semibold flex gap-1 items-center mt-0 bg-gray-200 px-1 rounded-sm truncate'
                  )}
                >
                  {/* <RxDotFilled />  */}
                  {/* <AiOutlineCheckCircle className="text-blue-600 " /> */}
                  {item?.subCategory?.name ?? ''}
                </p>
              </div>
              <p className="h-full text-gray-500 line-clamp-3 ">
                {item.description}
              </p>
            </div>
            <div className="flex items-end justify-between h-full text-sm">
              <Tip lbl="Зарын огноо">
                <p>
                  {moment(item?.createdAt, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                </p>
              </Tip>
              <Tip lbl="Зарын үзэлтийн тоо">
                <div className="flex items-center justify-center gap-1">
                  <AiOutlineEye className="text-[18px]  translate-y-[1px]" />
                  <p>{item.views.length}</p>
                </div>
              </Tip>
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
        <div className="h-[50px] relative border border-top-bgGrey w-full backdrop-blur-sm p-2 bg-white/90 flex justify-between">
          <Tip lbl="Зарын эзэн">
            <button
              className="flex items-center gap-2"
              onClick={() => router.push(`/account/${item?.user?._id}`)}
            >
              <div className="relative overflow-hidden border-2 rounded-full w-9 h-9 border-mainBlossom">
                <Image
                  // Eniig user bolgood darahaar ordgoor
                  src={item?.user?.profileImg ?? '/images/logo/bom-white.png'}
                  alt="BOM logo"
                  objectFit="cover"
                  layout="fill"
                  className={mergeNames(
                    item?.user?.profileImg ? '' : 'p-2 bg-mainBlossom '
                  )}
                />
              </div>
              <p className="font-semibold">{item?.user?.username ?? ''}</p>
            </button>
          </Tip>

          <div className="flex gap-2">
            <button
              className={mergeNames(
                ' bg-white text-blue-600 border rounded-full border-blue-600',
                'px-3 hover:bg-blue-600 hover:text-white transition-all ease-in-out'
              )}
              onClick={() => router.push(`tel: ${item?.user?.phone ?? ''}`)}
            >
              {item?.user?.phone ?? ''}
            </button>
            <button
              className={mergeNames(
                STYLES.blueButton,
                'px-3 whitespace-nowrap'
              )}
              onClick={() => router.push(`mailto: ${item?.user?.email ?? ''}`)}
            >
              Имэйл
            </button>
          </div>
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
        <Icon className="text-xl text-mainBlossom" />
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
