import {
  Box,
  Button,
  GridItem,
  HStack,
  IconButton,
  Image,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Fragment, useEffect, useMemo, useState } from 'react';

import MainContainer from '../../layout/mainContainer';
import ECalculator from '../calculator';

import ScrollTop from '../../lib/ScrollTop';

// Image Swiper Gallery
import ImageGallery from 'react-image-gallery';

import AdContent from '@/components/home/adContent';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import axios from 'axios';
import { getCookie } from 'cookies-next';

import EditAd from '@/components/ad/edit';
import { FiltersContainer } from '@/components/createAd/step4/filter';
import Engage from '@/components/product/Engage';
import ProductHeader from '@/components/product/ProductHeader';
import { getSellType, getSuggestionValue } from '@/context/functions';
import ItemContainer from '@/util/product/ItemContainer';
import ProductInfoValue from '@/util/product/ProductInfoValue';
import WhiteBox from '@/util/product/WhiteBox';
import moment from 'moment';
import { useRouter } from 'next/router';
import { BiArea, BiDoorOpen } from 'react-icons/bi';
import { FaCopy, FaHeart } from 'react-icons/fa';
import { IoBedOutline } from 'react-icons/io5';
import { TbBath } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { setBookmark } from 'store/slice/bookmark';
import urls from '../../constants/api';
import UserInfo from './userInfo';

export const ProductInfo = ({
  title,
  value,
  id,
  children,
  href = false,
  type = '',
  tt = 'capitalize',
  func = () => {},
  setEditData,
  edit = false,
  editData,
  classnames,
  admin,
  cateId,
  editFunc = () => {},
}) => {
  const [selectedParent, setSelectedParent] = useState([]);
  const [localData, setData] = useState();
  const [other, setOther] = useState(false);

  let dummy = { ...editData };
  return (
    <Fragment>
      {href && (
        <p
          className={mergeNames(
            id === 'price'
              ? 'mt-3 text-xl font-bold col-span-full block'
              : 'hidden'
          )}
        >
          Бусад мэдээлэл
        </p>
      )}
      <GridItem
        className={mergeNames(
          title.length > 30
            ? 'product__info col-span-full md:col-span-2 lg:col-span-1 row-start-1'
            : 'product__info',
          'bg-white shadow rounded-md',
          classnames
        )}
      >
        <Stack
          direction={'row'}
          className={mergeNames('p-2 rounded-md')}
          onClick={href ? () => {} : func}
        >
          <div className="flex flex-col w-full pl-2 text-left sm:pl-5">
            <Text fontSize={{ base: '13px', xl: '15px' }}>{title}: </Text>
            {!localData && (
              <ProductInfoValue
                href={href}
                id={id}
                value={value}
                cateId={cateId}
              />
            )}
            {localData && (
              <FiltersContainer
                selectedOther={other}
                other={localData.other ?? false}
                value={localData.value}
                name={localData.name}
                defValue={value}
                types={localData.types}
                ph={value}
                label={value}
                onChange={(e) => {
                  if (typeof e == 'string' || typeof e == 'number') {
                    dummy?.filters.map((df) => {
                      if (df.type == localData.type) {
                        df.input = e;
                      }
                    });
                    if (!admin) {
                      setEditData(dummy);
                    }
                  } else {
                    dummy?.filters.map((df) => {
                      if (df.type == localData.type) {
                        df.input = e.target.value;
                      }
                    });
                    if (!admin) {
                      setEditData(dummy);
                    }
                  }
                }}
                Item={({ data, onClick, id, ...props }) => {
                  // console.log(data.type);
                  return (
                    <button
                      {...props}
                      onClick={() => {
                        if (data == 'Бусад') {
                          setOther(true);
                        } else {
                          setOther(false);
                          dummy?.filters.map((df) => {
                            if (df.type == localData.type) {
                              df.input = data;
                            }
                          });
                          if (!admin) {
                            setEditData(dummy);
                          }
                        }
                        onClick();
                      }}
                    >
                      {data}
                      {props.children}
                    </button>
                  );
                }}
              />
            )}
          </div>
          {edit && (
            <Button
              onClick={async () => {
                if (type != 'sellType') {
                  await axios.get(`${urls['test']}/items/${type}`).then((d) => {
                    setData(d.data);
                  });
                } else {
                  setData({
                    value: [
                      {
                        id: 'sell',
                        value: 'Зарах',
                      },
                      {
                        id: 'rent',
                        value: 'Түрээслэх',
                      },
                      {
                        id: 'sellRent',
                        name: 'Зарах, түрээслэх',
                      },
                    ],
                    name: 'Борлуулах төрөл',
                    types: 'dropdown',
                    type: type,
                    input: value,
                  });
                }
              }}
            >
              edit
            </Button>
          )}
        </Stack>
      </GridItem>
    </Fragment>
  );
};

const Product = () => {
  const { asPath, pathname } = useRouter();
  const toast = useToast();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const { bookmarks } = useSelector((state) => state.bookmarks);
  const [data, setData] = useState('');
  const dispatch = useDispatch();
  const [suggestion, setSuggestion] = useState();
  // propAds?.subCategory?.suggestionItem[0] ?? "location"
  const dummyData = [];

  const [sData, setsData] = useState([]);
  const libraries = useMemo(() => ['places'], []);
  const [markerActive, setMarkerActive] = useState(null);
  const [generalData, setGeneralData] = useState({
    imgSelected: false,
    images: [],
  });
  const [isLiked, setIsLiked] = useState();
  const [images, setImages] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC2u2OzBNo53GxJJdN3Oc_W6Yc42OmdZcE',
    libraries: libraries,
  });
  const token = getCookie('token');
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      // clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );
  const mapCenter = useMemo(
    () => ({
      lat: parseFloat(data?.location?.lat ?? 47.91887307876936),
      lng: parseFloat(data?.location?.lng ?? 106.91757202148438),
    }),
    [data]
  );
  const getSuggestion = async (suggest, sd) => {
    if (suggest != 'map') {
      try {
        if (sd?.subCategory?._id) {
          await axios
            .post(`${urls['test']}/ad/suggestion/${sd?.subCategory?._id}/1`, {
              items: [
                {
                  id: suggest,
                  value: sd.items.filter((s) => s.id == suggest)[0].value,
                },
              ],
              types: [],
            })
            .then((d) => {
              setsData([]);
              console.log(d.data);
              let ads = d.data?.ads?.filter((da) => da._id != sd._id);
              setsData({ limit: ads.length, ads: ads });
            });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getData = async () => {
    await axios.get(`${urls['test']}/ad/id/${router.query.slug}`).then((d) => {
      setData(d.data);
      dummyData = d.data;
      getSuggestion(d.data?.subCategory?.suggestionItem[0], d.data);
    });
  };
  // useEffect(() => {
  //   if (propAds) {
  //     setGeneralData((prev) => ({
  //       ...prev,
  //       imgSelected: propAds?.images[0] ? true : false,
  //       images: [...propAds?.images],
  //     }));
  //     setImages(propAds.images ?? []);
  //     getData();
  //   }
  // }, [propAds]);

  useEffect(() => {
    if (router?.query?.slug) getData();
  }, [router?.query?.slug]);
  const [open, setOpen] = useState(false);
  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(window.location.toString());
  };

  return (
    <Box m={2} as="section" id="main__product">
      <ScrollTop />

      <MainContainer>
        <Stack direction={'row'} py={2} gap={3} pos="relative">
          <Box maxWidth={'100%'} flex="0 0 100%" borderRadius="5px">
            <div className="flex gap-7">
              <div className="flex flex-col w-full gap-5">
                {/* <p className="text-darkBlue">/Үл хөдлөх/Орон сууц</p> */}
                <h1 className="my-5 text-lg font-semibold md:text-3xl">
                  {data.title}{' '}
                </h1>
                <Engage
                  date={moment(data.createdAt).format('lll')}
                  num={data.num}
                  view={
                    data?.views?.length > 0 && (
                      <p>Үзсэн хүний тоо: {data.views.length}</p>
                    )
                  }
                />
                <div className="relative overflow-hidden bg-gray-900 rounded-lg gallery">
                  {data?.images?.length > 0 ? (
                    <div className="object-contain">
                      <ImageGallery
                        // thumbnailPosition="bottom"
                        lazyLoad={true}
                        showPlayButton={false}
                        // showBullets={true}
                        // showThumbnails={false}
                        // showIndex={true}
                        items={data?.images?.map((i) => ({
                          original: i,
                          thumbnail: i,
                          loading: 'lazy',
                          thumbnailLoading: 'lazy',
                        }))}
                      />
                    </div>
                  ) : (
                    <div className="grid w-full font-bold h-[50vh] bg-gray-700 text-white aspect-square place-items-center text-md">
                      Энэ заранд зураг байхгүй байна
                    </div>
                  )}
                </div>
                <div
                  className={mergeNames(
                    // '-translate-y-[50px] relative z-10',
                    ' py-5 px-6  w-full   font-semibold',
                    'lg:flex-row gap-5 flex-col flex justify-between whitespace-nowrap',
                    ' bg-white/90 rounded-md'
                  )}
                >
                  <div className="grid items-center justify-between w-full grid-cols-2 gap-3 md:grid-cols-4">
                    {data?.items?.map((p, i) => {
                      return (
                        <Fragment key={i}>
                          {(p.position == 'top' || p.position == 'any') && (
                            <ItemContainer
                              lbl={p.name}
                              name={p.name}
                              href={true}
                              value={p.value}
                              id={p.id}
                              cateId={data.subCategory?._id}
                              Icon={(props) => {
                                switch (p.id) {
                                  case 'room':
                                    return (
                                      <BiDoorOpen
                                        {...props}
                                        text=""
                                        className="text-xl"
                                      />
                                    );
                                  case 'area':
                                    return <BiArea {...props} text="" />;
                                  case 'masterBedroom':
                                    return (
                                      <IoBedOutline
                                        {...props}
                                        text=""
                                        className="text-xl"
                                      />
                                    );
                                  case 'bathroom':
                                    return (
                                      <TbBath
                                        {...props}
                                        text=""
                                        className="text-xl"
                                      />
                                    );
                                  default:
                                    return;
                                }
                              }}
                              text={calcValue(
                                p.value,
                                'байхгүй',
                                p.id == 'area' ? 'м.кв' : ''
                              )}
                            />
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {/* <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-7"> */}
                  <WhiteBox
                    heading="Зарын дэлгэрэнгүй"
                    classnames="flex flex-col gap-3"
                  >
                    <Text className="text-[#5c727d] whitespace-pre-line">
                      {data.description}
                    </Text>
                  </WhiteBox>
                  <WhiteBox heading="Газрын зураг">
                    {isLoaded && (
                      <GoogleMap
                        options={mapOptions}
                        zoom={14}
                        center={mapCenter}
                        mapTypeId={google.maps.MapTypeId.ROADMAP}
                        mapContainerStyle={{ width: '100%', height: '30vh' }}
                      >
                        {isLoaded && (
                          <MarkerF
                            position={{
                              lat: parseFloat(data?.location?.lat ?? 47.74604),
                              lng: parseFloat(
                                data?.location?.lng ?? 107.341515
                              ),
                            }}
                            // onMouseOver={() => setMarkerActive(i)}

                            animation={google.maps.Animation.DROP}
                          />
                        )}
                      </GoogleMap>
                    )}
                  </WhiteBox>
                </div>
                <WhiteBox
                  heading="Хаяг"
                  classnames="grid xs:grid-cols-2 xl:grid-cols-4 gap-5"
                >
                  {data?.items?.map((p, i) => {
                    if (p.position == 'location') {
                      return (
                        <ProductInfo
                          href={true}
                          key={i}
                          title={p.name}
                          id={p.id}
                          cateId={data.subCategory?._id}
                          value={p.value}
                          onClick={() => getFilterByItem(p.id, p.value)}
                        />
                      );
                    }
                  })}
                </WhiteBox>
                <WhiteBox
                  heading="Мэдээлэл"
                  classnames="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3"
                >
                  <ProductInfo
                    href={data.sellType}
                    title={'Борлуулах төрөл'}
                    id={data.sellType}
                    cateId={data.subCategory?._id}
                    value={getSellType(data.sellType)}
                    onClick={() =>
                      getFilterByItem(data.sellType, data.sellType)
                    }
                  />

                  {data?.items?.map((p, i) => {
                    if (p.position == 'default') {
                      return (
                        <ProductInfo
                          key={i}
                          href={(p.isSearch || p.id == 'sellType') ?? false}
                          title={p.name}
                          id={p.id}
                          cateId={data.subCategory?._id}
                          value={p.value}
                          onClick={() => getFilterByItem(p.id, p.value)}
                        />
                      );
                    }
                  })}
                </WhiteBox>
              </div>
              <div className="sticky flex-col hidden h-full gap-3 top-20 lg:flex">
                {data && (
                  <>
                    <div>
                      <ProductHeader
                        price={
                          data?.items?.find((d) => d.id == 'price')?.value ?? 0
                        }
                        unitPrice={
                          data?.items?.find((d) => d.id == 'unitPrice')
                            ?.value ?? 0
                        }
                      />

                      <IconButton
                        className="float-right bg-white border-2 border-gray-200"
                        aria-label="Bookmark add"
                        icon={<FaHeart />}
                        _hover={{
                          color: 'red',
                        }}
                        size={{ base: 'xs', sm: 'md' }}
                        color={
                          bookmarks?.find((b) => b == data._id) != undefined
                            ? 'red'
                            : 'gray'
                        }
                        onClick={() => {
                          if (bookmarks != undefined) {
                            dispatch(setBookmark(data._id));
                            if (bookmarks.includes(data._id)) {
                              toast({
                                title: 'Зар хүслээс хасагдлаа.',
                                status: 'warning',
                                duration: 5000,
                                isClosable: true,
                              });
                            } else {
                              toast({
                                title: 'Зар хүсэлд нэмэгдлээ.',
                                status: 'success',
                                duration: 5000,
                                isClosable: true,
                              });
                            }
                          } else {
                            toast({
                              title: 'Та нэвтэрнэ үү',
                              status: 'warning',
                              duration: 5000,
                              isClosable: true,
                            });
                          }
                        }}
                      />
                      <IconButton
                        className="float-right bg-white border-2 border-gray-200 hover:text-blue-600"
                        aria-label="Get link"
                        icon={<FaCopy />}
                        onClick={() => {
                          copyToClipboard(),
                            toast({
                              title: `Холбоосыг хуулж авлаа`,
                              status: 'info',
                              isClosable: true,
                              duration: 1500,
                            });
                        }}
                        size={{ base: 'xs', sm: 'md' }}
                      />
                    </div>
                    <div className="p-2 bg-white rounded-md">
                      <UserInfo
                        id={data.user._id}
                        email={data.user.email}
                        username={data.user?.username}
                        phone={
                          data.items?.filter((f) => f.id == 'phone')[0].value
                        }
                        agent={
                          data.user?.userType == 'default'
                            ? 'Энгийн'
                            : data.user?.userType == 'organization'
                            ? 'Байгууллага'
                            : data.user?.userType == 'agent'
                            ? 'Агент'
                            : data.user?.userType
                        }
                        avatar={
                          data.user?.profileImg ??
                          'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png'
                        }
                      />
                    </div>
                    {user && user._id == data?.user?._id && (
                      <EditAd
                        images={images}
                        data={data}
                        setData={setData}
                        generalData={generalData}
                        setGeneralData={setGeneralData}
                        setImages={setImages}
                        onNext={async () => {
                          const f = new FormData();
                          f.append('title', data.title);
                          f.append('description', data.description);
                          f.append('filters', data.filters);
                          f.append('subCategory', data.subCategory._id);
                          f.append('category', data.category);
                          f.append('types', data.types);
                          f.append('adTypes', data.adType);
                          f.append('location', data.location);
                          let fImages = new FormData();
                          images?.map((prev) => {
                            fImages.append('images', prev);
                          });

                          try {
                            await axios
                              .post(
                                `${urls['test']}/ad/uploadFields`,
                                fImages,
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Access-Control-Allow-Headers': '*',
                                  },
                                }
                              )
                              .then((d) => f.append('images', d.data));
                            await axios.put(
                              `${urls['test']}/ad/${data._id}`,
                              f,
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  'Access-Control-Allow-Headers': '*',
                                  'Content-Type': 'application/json',
                                  charset: 'UTF-8',
                                },
                              }
                            );
                          } catch (error) {}
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
            <Box>
              {/* <Estimator /> */}
              {data && (
                <ECalculator
                  data={parseInt(
                    data?.items?.filter((f) => f.id === 'price')[0]?.value ??
                      '0'
                  )}
                />
              )}
            </Box>
          </Box>
        </Stack>
      </MainContainer>
      {
        <MainContainer py={'50px'}>
          <div className={mergeNames(STYLES.flexBetween, 'flex-row')}>
            <h1
              variant={'mediumHeading'}
              className="text-sm font-bold uppercase md:text-lg"
            >
              Санал болгох зарууд
            </h1>
            {sData?.ads?.length > 0 && (
              <Box>
                <Select
                  className="h-[30px] text-sm border-2 pr-3 border-blue-700 rounded-full"
                  onChange={(e) => {
                    setSuggestion(e.target.value);
                    getSuggestion(e.target.value, data);
                  }}
                >
                  <Fragment>
                    {data?.subCategory?.suggestionItem?.map((sug, i) => {
                      return getSuggestionValue(sug);
                    })}
                    <option value={'map'}>Газрын зургаар</option>
                  </Fragment>
                </Select>
              </Box>
            )}
          </div>
          {suggestion == 'map' && sData?.ads?.length > 0 ? (
            <GoogleMap
              options={mapOptions}
              onClick={(e) => {
                // setMap(e.latLng.toJSON());
                console.log(e.latLng.toJSON());
              }}
              zoom={14}
              center={mapCenter}
              mapTypeId={google.maps.MapTypeId.ROADMAP}
              mapContainerStyle={{ width: '100%', height: '50vh' }}
            >
              {isLoaded &&
                sData?.ads?.map((m, i) => {
                  return (
                    <HStack key={i}>
                      <MarkerF
                        position={{
                          lat: parseFloat(m.location?.lat ?? 47.74604),
                          lng: parseFloat(m.location?.lng ?? 107.341515),
                        }}
                        // onMouseOver={() => setMarkerActive(i)}
                        onMouseOver={() => setMarkerActive(i)}
                        animation={google.maps.Animation.DROP}
                      >
                        {/* end zasna */}
                        {/* <Image
                          src="/images/logo/404.pmg"
                          alt="map image"
                          className="w-full h-[100px]"
                        /> */}
                        {markerActive == i && (
                          <InfoWindow
                            position={{
                              lat: parseFloat(m.location?.lat ?? 47.74604),
                              lng: parseFloat(m.location?.lng ?? 107.341515),
                            }}
                          >
                            <div
                              onClick={() => router.push(`/ad/${m.num}`)}
                              className={mergeNames(
                                'h-[125px] aspect-4/3 flex flex-col cursor-pointer justify-end relative',
                                'group-hover:block '
                              )}
                            >
                              <Image
                                src={
                                  m.images[0] ?? '/images/HeaderSlider/1.jpg'
                                }
                                alt="map image"
                                className={mergeNames(
                                  'absolute top-0 left-0 object-cover w-full h-full ',
                                  ''
                                )}
                              />
                              <div className="absolute top-0 left-0 object-cover w-full h-full bg-gradient-to-b from-slate-700/0 via-slate-700/50 to-slate-900/100 "></div>
                              <p className="z-10 text-base font-bold text-white">
                                {m.title}
                              </p>
                              <p className="z-10 text-base font-bold text-white">
                                {
                                  m.items.filter((f) => f.id == 'price')[0]
                                    ?.value
                                }
                              </p>
                            </div>
                          </InfoWindow>
                        )}
                      </MarkerF>
                    </HStack>
                  );
                })}
            </GoogleMap>
          ) : (
            sData?.ads?.length > 0 && <AdContent data={sData} n={10} />
          )}
        </MainContainer>
      }
    </Box>
  );
};
// 890
export default Product;

// export async function getServerSideProps(ctx, req, res) {
//   const { params } = ctx;
//   const { slug } = params;
//   const token = getCookie('token', { req, res });
//   const adRes = await fetch(`${urls['test']}/ad/id/${slug}`);

//   const ads = await adRes.json();

//   return {
//     props: {
//       propAds: ads,
//     },
//   };
// }

const calcValue = (props, checker = 'Байхгүй', suffix) => {
  // p?.value?.toLowerCase() === "байхгүй"

  if (props.toString().toLowerCase() === checker) return 0;
  if (props) {
    if (suffix) return `${props} ${suffix}`;
    return props;
  }
  return '-';
};
