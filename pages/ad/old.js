import {
  Box,
  Button,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Fragment, useEffect, useMemo, useState } from 'react';

import { FaHeart } from 'react-icons/fa';

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
import currency from 'currency.js';
import moment from 'moment/moment';

import EditAd from '@/components/ad/edit';

import { FiltersContainer } from '@/components/createAd/step4/filter';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import urls from '../../constants/api';
import UserInfo from './userInfo';

export const ProductInfoValue = ({ href, value, id }) => {
  return href ? (
    <NextLink
      href={{
        pathname: `/category/filter/${id}`,
        query: { num: 0, value: value },
      }}
    >
      <Link
        fontSize={{ base: '13px', xl: '15px' }}
        cursor={'pointer'}
        fontWeight={'bold'}
      >
        {id === 'price' || id === 'unitPrice'
          ? currency(value, { separator: ',', symbol: '₮ ' })
              .format()
              .toString()
          : value}
      </Link>
    </NextLink>
  ) : (
    <Text fontSize={{ base: '13px', xl: '15px' }} fontWeight={'bold'}>
      {id === 'price' || id === 'unitPrice'
        ? currency(value, { separator: ',', symbol: '₮ ' }).format().toString()
        : value}
    </Text>
  );
};

export const ProductInfo = ({
  title,
  value,
  id,
  children,
  href = true,
  type = '',
  tt = 'capitalize',
  func = () => {},
  setEditData,
  edit = false,
  editData,
  admin,
  editFunc = () => {},
}) => {
  const [selectedParent, setSelectedParent] = useState([]);
  const [localData, setData] = useState();
  const [other, setOther] = useState(false);
  let dummy = { ...editData };
  return (
    <Fragment>
      <p
        className={mergeNames(
          id === 'price'
            ? 'mt-3 text-xl font-bold col-span-full block'
            : 'hidden'
        )}
      >
        Бусад мэдээлэл
      </p>
      <GridItem
        className={
          title.length + value?.length > 30
            ? 'product__info col-span-full'
            : 'product__info'
        }
      >
        <Stack
          direction={'row'}
          justifyContent="space-between"
          className={mergeNames('p-2 border-2 rounded-md border-bgGrey')}
          onClick={!href ? () => {} : func}
        >
          <div className="flex items-center gap-1">
            <Text
              fontSize={{ base: '13px', xl: '15px' }}
              textTransform={'capitalize'}
            >
              {title}:{' '}
            </Text>

            {!localData && (
              <ProductInfoValue href={href} id={id} value={value} />
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
                await axios.get(`${urls['test']}/items/${type}`).then((d) => {
                  setData(d.data);
                });
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

const Product = ({ propAds }) => {
  const toast = useToast();
  const router = useRouter();
  const [data, setData] = useState('');
  const [suggestion, setSuggestion] = useState(
    propAds?.subCategory?.suggessionType[0] ?? 'location'
  );
  const dummyData = [];

  const user = getCookie('user');
  const [sData, setsData] = useState([]);
  const libraries = useMemo(() => ['places'], []);
  const [markerActive, setMarkerActive] = useState(null);
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
  const mapCenter = useMemo(() => ({
    lat: parseFloat(data?.location?.lat ?? 47.91887307876936),
    lng: parseFloat(data?.location?.lng ?? 106.91757202148438),
  }), [data]);
  const getSuggestion = async (suggest, sd) => {
    if (suggest != 'map') {
      try {
        let type, id;
        switch (suggest) {
          case 'location':
            type = sd?.filters?.filter((d) => d.type == 'district')[0]?.input;
            id = 'district';
            break;
          case 'usage':
            type = sd?.filters?.filter((d) => d.type == 'landUsage')[0]?.input;
            id = 'landUsage';
            break;
          default:
            (type = sd?.filters?.filter((f) => f.type == suggest)[0]?.input),
              (id = suggest);
            break;
        }
        await axios
          .get(`${urls['test']}/ad/suggesstion/${id}/${type}/0`)
          .then((d) => {
            setsData([]);
            let ads = d.data?.ads?.filter((da) => da._id != sd._id);
            setsData({ ads, limit: sd.limit - 1 });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getData = async () => {
    setData(propAds);
    dummyData = propAds;
    await getSuggestion(suggestion, propAds);
  };
  useEffect(() => {
    if (propAds) {
      getData();
    }
  }, [propAds]);

  const [open, setOpen] = useState(false);

  return (
    <Box m={2} as="section" id="main__product">
      <ScrollTop />
      <MainContainer>
        <Stack direction={'row'} py={2} gap={3} pos="relative">
          {user && JSON.parse(user)._id == data?.user?._id && (
            <div className="absolute right-0 top-4">
              <EditAd
                data={data}
                setData={setData}
                onNext={async () => {
                  await axios
                    .put(`${urls['test']}/ad/${data._id}`, data, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                        'Access-Control-Allow-Headers': '*',
                        'Content-Type': 'application/json',
                        charset: 'UTF-8',
                      },
                    })
                    .then((d) => console.log(d.data));
                }}
              />
            </div>
          )}
          {/* //TODO Filter Box */}
          {/* {data?.subCategory && <FilterLayout data={data.subCategory}/>} */}

          {/* //TODO Main product */}
          <Box maxWidth={'100%'} flex="0 0 100%" borderRadius="5px">
            <Box className="p-3 bg-white shadow-md md:p-10 rounded-xl">
              {/*Product */}
              {data.title && (
                <Heading variant={'mediumHeading'} mb={5}>
                  {data.title}
                </Heading>
              )}

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 product__content-wrapper">
                {/*//TODO product slug hevtee uyd  */}
                {/* <div className="flex flex-col"> */}
                {/*  //TODO LEFT SIDE IMAGES AND DESC */}

                <div>
                  <Stack
                    className={mergeNames(STYLES.flexBetween, 'flex-row mb-2')}
                  >
                    <div className="flex flex-col justify-center sm:flex-row">
                      <Text className="mr-[10px]">
                        Зарын огноо: {moment(data.createdAt).format('lll')}
                      </Text>
                      <Text>Зарын дугаар: {data.num}</Text>
                    </div>
                    {data?.views?.length > 0 && (
                      <Text>Үзсэн хүний тоо: {data.views.length}</Text>
                    )}
                    <Text>
                      <IconButton
                        aria-label="Search database"
                        icon={<FaHeart />}
                        _hover={{
                          color: 'red',
                        }}
                        size={{ base: 'xs', sm: 'md' }}
                        color={
                          user
                            ? JSON.parse(user).bookmarks.find(
                                (b) => b == data._id
                              ) != undefined
                              ? 'text-red-500/90'
                              : 'text-slate-200/90'
                            : 'text-slate-200/90'
                        }
                        onClick={async () => {
                          await axios
                            .post(
                              `${urls['test']}/bookmark/ad`,
                              {
                                adId: data._id,
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            )
                            .then((d) => {
                              if (d.data) {
                                toast({
                                  title: 'Зар хүсэлд нэмэгдлээ.',
                                  status: 'success',
                                  duration: 5000,
                                  isClosable: true,
                                });
                              } else {
                                toast({
                                  title: 'Зар хүслээс хасагдлаа.',
                                  status: 'warning',
                                  duration: 5000,
                                  isClosable: true,
                                });
                              }
                              router.reload();
                            });
                        }}
                      />
                      {/* Хандалт: lorem */}
                    </Text>
                  </Stack>

                  <Box
                    className={mergeNames(
                      'product__image',
                      'border-2 border-blue-900/20 shadow-md'
                      // data?.images.length && 'mb-[120px]'
                    )}
                  >
                    {data?.images?.length > 0 ? (
                      // ?.length !== 0 ?
                      <div className="object-contain">
                        <ImageGallery
                          items={data?.images?.map((i) => ({
                            original: i,
                            thumbnail: i,
                          }))}
                        />
                      </div>
                    ) : (
                      <div className="grid w-full font-bold bg-gray-200 aspect-square place-items-center text-md">
                        Энэ заранд зураг байхгүй байна
                      </div>
                    )}
                  </Box>
                  <div className="flex flex-col gap-2 pt-5">
                    <p className="text-xl font-bold">Зарын дэлгэрэнгүй</p>
                    <Text whiteSpace={'pre-line'} mt={5}>
                      {data.description}
                    </Text>
                  </div>
                </div>

                {/*  //TODO  ENDING LEFT SIDE IMAGES AND DESC */}

                {/*  //TODO  STARTS RIGHT SIDE INFOS */}

                <div className="block w-full">
                  {data && (
                    <div className="grid grid-cols-1 gap-1 md:gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                      <UserInfo
                        id={data.user._id}
                        username={data.user?.username}
                        phone={
                          data.filters?.filter((f) => f.type == 'phone')[0]
                            .input
                        }
                        avatar={
                          data.user?.profileImg ??
                          'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png'
                        }
                      />

                      <p className="text-xl font-bold col-span-full">
                        Ерөнхий мэдээлэл
                      </p>

                      {data?.filters?.map((p, i) => {
                        console.log(p.type);
                        if (p.type != null && p.type != 'phone') {
                          return (
                            <ProductInfo
                              key={i}
                              title={p.name}
                              id={p.type}
                              value={p.input}
                              onClick={() => getFilterByItem(p.type, p.input)}
                            />
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              </div>
              {/*  //TODO  ENDING RIGHT SIDE INFOS */}
            </Box>

            <Box>
              {/* <Estimator /> */}
              {data && (
                <ECalculator
                  data={
                    data?.filters?.filter((f) => f.type === 'price')[0]?.input
                  }
                />
              )}
            </Box>
          </Box>
        </Stack>
      </MainContainer>
      {sData?.ads?.length > 0 && (
        <MainContainer py={'50px'}>
          <div className={mergeNames(STYLES.flexBetween, 'flex-row')}>
            <h1
              variant={'mediumHeading'}
              className="text-sm font-bold uppercase md:text-lg"
            >
              Санал болгох зарууд
            </h1>
            <Box>
              <Select
                className="h-[30px] text-sm border-2 pr-3 border-blue-700 rounded-full"
                onChange={async (e) => {
                  setSuggestion(e.target.value, data);
                  {
                    suggestion != 'map'
                      ? getSuggestion(e.target.value, data)
                      : console.log(data);
                  }
                }}
              >
                {data?.subCategory?.suggessionType?.map((sug, i) => {
                  switch (sug) {
                    case 'location':
                      return i !=
                        data?.subCategory?.suggessionType?.length - 1 ? (
                        <option value="location" key={i}>
                          Байршлаар
                        </option>
                      ) : (
                        <Fragment key={i}>
                          <option value="location">Байршлаар</option>

                          <option value={'map'}>Газрын зургаар</option>
                        </Fragment>
                      );
                    case 'usage':
                      return i !=
                        data?.subCategory?.suggessionType?.length - 1 ? (
                        <option value="usage" key={i}>
                          Зориулалтаар
                        </option>
                      ) : (
                        <Fragment key={i}>
                          <option value="usage">Зориулалтаар</option>

                          <option value={'map'}>Газрын зургаар</option>
                        </Fragment>
                      );
                    case 'room':
                      return i !=
                        data?.subCategory?.suggessionType?.length - 1 ? (
                        <option value="room" key={i}>
                          Өрөөгөөр
                        </option>
                      ) : (
                        (
                          <Fragment key={i}>
                            <option value="room">Өрөөгөөр</option>

                            <option value={'map'}>Газрын зургаар</option>
                          </Fragment>
                        ) + 1
                      );
                  }
                })}
              </Select>
            </Box>
          </div>
          {suggestion == 'map' ? (
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
                              onClick={() => router.push(`/product/${m.num}`)}
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
                                  m.filters.filter((f) => f.type == 'price')[0]
                                    ?.input
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
            <AdContent data={sData} />
          )}
        </MainContainer>
      )}
    </Box>
  );
};

export default Product;

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  const { slug } = params;
  const res = await fetch(`${urls['test']}/ad/id/${slug}`);
  const ads = await res.json();
  return {
    props: {
      propAds: ads,
    },
  };
}
