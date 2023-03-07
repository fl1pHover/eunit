import {
  AspectRatio,
  Box,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Link,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

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
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import urls from '../../constants/api';
import { useAuth } from '../../context/auth';
import UserInfo from './userInfo';

export const ProductInfo = ({
  title,
  value,
  id,
  children,
  key = 0,
  tt = 'capitalize',
}) => {
  // console.log(value);

  return (
    <>
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
        key={key}
      >
        {children ? (
          children
        ) : (
          <Stack
            direction={'row'}
            className={mergeNames('p-2 border-2 rounded-md border-bgGrey')}
          >
            <Text
              fontSize={{ base: '13px', xl: '15px' }}
              textTransform={'capitalize'}
            >
              {title}:{' '}
            </Text>
            <NextLink
              href={{
                pathname: `/category/filter/${id}`,
                query: { num: 0, value: value },
              }}
            >
              <Link
                fontSize={{ base: '13px', xl: '15px' }}
                textTransform={tt}
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
          </Stack>
        )}
      </GridItem>
    </>
  );
};

const Product = ({ propAds }) => {
  const toast = useToast();
  const { districts, locations } = useAuth();
  const router = useRouter();
  const [data, setData] = useState('');
  const [suggestion, setSuggestion] = useState(
    propAds?.subCategory?.suggessionType[0] ?? 'location'
  );
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
  const mapCenter = useMemo(() => data?.location, [data]);
  const getSuggestion = async (suggest, sdata) => {
    if (suggest != 'map') {
      try {
        let type, id;
        switch (suggest) {
          case 'location':
            type = sdata?.filters.filter((d) => d.type == 'district')[0].input;
            id = 'district';
            break;
          case 'usage':
            type = sdata?.filters.filter((d) => d.type == 'landUsage')[0].input;
            id = 'landUsage';
            break;
          default:
            (type = sdata?.filters.filter((f) => f.type == suggest)[0].input),
              (id = suggest);
            break;
        }
        await axios
          .get(`${urls['test']}/ad/suggesstion/${id}/${type}/0`)
          .then((d) => {
            setsData([]);
            let ads = d.data.ads.filter((da) => da._id != sdata._id);
            setsData({ ads, limit: sdata.limit - 1 });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getData = async () => {
    setData(propAds);
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
        <Stack direction={'row'} py={2} gap={3}>
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

              {/* product image and information */}
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 product__content-wrapper">
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

                    <Text>
                      <IconButton
                        aria-label="Search database"
                        icon={<FaHeart />}
                        _hover={{
                          color: 'red',
                        }}
                        size={{ base: 'xs', sm: 'md' }}
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
                            .then((d) => console.log(d));
                          toast({
                            title: 'Зар хадгалагдлаа.',
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                          });
                        }}
                      />
                      {/* Хандалт: lorem */}
                    </Text>
                  </Stack>

                  <Box
                    className={mergeNames(
                      'product__image',
                      'border-2 border-blue-900/20  mb-[120px] shadow-md'
                    )}
                  >
                    {data?.images && (
                      <AspectRatio ratio={1}>
                        <ImageGallery
                          items={data?.images.map((i) => ({
                            original: i,
                            thumbnail: i,
                          }))}
                        />
                      </AspectRatio>
                    )}
                  </Box>
                  <Text mt={5}>{data.description}</Text>
                </div>

                {/*  //TODO  ENDING LEFT SIDE IMAGES AND DESC */}

                {/*  //TODO  STARTS RIGHT SIDE INFOS */}

                <div className="block w-full">
                  {data && (
                    <div className="grid grid-cols-1 gap-1 md:gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                      {/* <Button
                        onClick={() => router.push(`/account/${data.user._id}`)}
                      >
                        {data.user?.phone}
                      </Button> */}
                      <UserInfo
                        id={data.user._id}
                        username={data.user?.username}
                        phone={data.user?.phone}
                        avatar=""
                      />
                      <p className="text-xl font-bold col-span-full">
                        Ерөнхий мэдээлэл
                      </p>
                      {data?.filters?.map((p, i) => {
                        if (p.type != null) {
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
                  data={data?.filters?.filter((f) => f.id === 'price')}
                />
              )}
            </Box>
          </Box>
        </Stack>
      </MainContainer>
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
                      <>
                        <option value="location" key={i}>
                          Байршлаар
                        </option>

                        <option value={'map'} key={i + 1}>
                          Газрын зургаар
                        </option>
                      </>
                    );
                  case 'usage':
                    return i !=
                      data?.subCategory?.suggessionType?.length - 1 ? (
                      <option value="usage" key={i}>
                        Зориулалтаар
                      </option>
                    ) : (
                      <>
                        <option value="usage" key={i}>
                          Зориулалтаар
                        </option>

                        <option value={'map'} key={i + 1}>
                          Газрын зургаар
                        </option>
                      </>
                    );
                  case 'room':
                    return i !=
                      data?.subCategory?.suggessionType?.length - 1 ? (
                      <option value="room" key={i}>
                        Өрөөгөөр
                      </option>
                    ) : (
                      (
                        <>
                          <option value="room" key={i}>
                            Өрөөгөөр
                          </option>

                          <option value={'map'} key={i + 1}>
                            Газрын зургаар
                          </option>
                        </>
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
              sData?.map((m, i) => {
                return (
                  <HStack key={i}>
                    <MarkerF
                      position={{
                        lat: parseFloat(m.location?.lat ?? 47.74604),
                        lng: parseFloat(m.location?.lng ?? 107.341515),
                      }}
                      // onMouseOver={() => setMarkerActive(i)}
                      onClick={() => setMarkerActive(i)}
                      animation={google.maps.Animation.DROP}
                    >
                      <InfoWindow
                        position={{
                          lat: parseFloat(m.location?.lat ?? 47.74604),
                          lng: parseFloat(m.location?.lng ?? 107.341515),
                        }} // onLoad={(info) => console.log(info)}
                      >
                        {/* end zasna */}
                        {/* <Image
                          src="/images/logo/404.pmg"
                          alt="map image"
                          className="w-full h-[100px]"
                        /> */}
                        <button
                          onClick={() => router.push(`/product/${m.num}`)}
                        >
                          <div>{m.title}</div>
                        </button>
                      </InfoWindow>
                    </MarkerF>
                  </HStack>
                );
              })}
          </GoogleMap>
        ) : (
          <AdContent data={sData} />
        )}
      </MainContainer>
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
