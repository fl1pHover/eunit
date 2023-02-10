import {
  Box,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

// Import Swiper React components
// Import Swiper styles
// import "swiper/css";

import { FaHeart } from 'react-icons/fa';
import MainContainer from '../../layout/mainContainer';
import ECalculator from '../calculator';

import ScrollTop from '../../lib/ScrollTop';
// Icons

// Image Swiper Gallery
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
import currency from 'currency.js';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import urls from '../../constants/api';
import { useAuth } from '../../context/auth';
const ProductInfo = ({
  title,
  value,
  id,
  children,
  key = 0,
  tt = 'capitalize',
}) => {
  return (
    <GridItem className="product__info" key={key}>
      {children ? (
        children
      ) : (
        <Stack
          direction={'row'}
          p={2}
          borderColor="bgGrey"
          borderWidth={2}
          borderRadius={5}
        >
          <Text textTransform={'capitalize'}>{title}: </Text>
          <Text textTransform={tt} fontWeight={'bold'}>
            {id === 'price' || id === 'unitPrice'
              ? currency(value, { separator: ',', symbol: '' })
                  .format()
                  .toString()
              : value}
          </Text>
        </Stack>
      )}
    </GridItem>
  );
};
const Product = ({ propAds }) => {
  const toast = useToast();
  const { districts, locations } = useAuth();
  const router = useRouter();
  const [data, setData] = useState('');
  const [suggestion, setSuggestion] = useState('location');
  const [sData, setsData] = useState([]);
  const libraries = useMemo(() => ['places'], []);
  const [markerActive, setMarkerActive] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC2u2OzBNo53GxJJdN3Oc_W6Yc42OmdZcE',
    libraries: libraries,
  });
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      // clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );
  const mapCenter = useMemo(() => data?.location, [data]);
  const getSuggestion = async (suggest) => {
    if (data && suggest != 'map') {
      try {
        await axios
          .post(`${urls['test']}/ad/suggesstion`, {
            suggestion:
              suggest == 'location'
                ? data?.positions?.district_id
                : suggest == 'room'
                ? data?.filters.filter((f) => f.id == 'room')[0].value
                : null,
            type: suggest,
          })
          .then((d) => {
            setsData([]);
            setsData(d.data.filter((sd) => sd._id != data._id));
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getData = async () => {
    setData(propAds);
    console.log(propAds);
    if (suggestion != 'map') {
      try {
        await axios
          .post(`${urls['test']}/ad/suggesstion`, {
            suggestion:
              suggestion == 'location'
                ? propAds?.positions?.district_id
                : suggestion == 'room'
                ? `${data?.filters.filter((f) => f.id == 'room')[0].value}`
                : null,
            type: suggestion,
          })
          .then((s) => {
            setsData(s.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (propAds) {
      getData();
    }
  }, [propAds]);

  return (
    <Box my={5} as="section" id="main__product">
      <ScrollTop />
      <MainContainer>
        <Stack direction={'row'} py={2} gap={3}>
          {/* //TODO Filter Box */}
          {/* {data?.subCategory && <FilterLayout data={data.subCategory}/>} */}

          {/* //TODO Filter box end */}

          {/* //TODO Main product */}
          <Box maxWidth={'100%'} flex="0 0 100%" borderRadius="5px">
            {/* <Box maxWidth={'75%'} flex="0 0 75%" borderRadius="5px"> */}
            <Box bgColor={'white'} p={10} rounded={10} boxShadow="base">
              {/*Product */}
              {data.title && (
                <Heading variant={'mediumHeading'} mb={5}>
                  {data.title}
                </Heading>
              )}

              {/* product image and information */}
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 product__content-wrapper">
                {/*  //TODO LEFT SIDE IMAGES AND DESC */}

                <div className="product__image-wrapper">
                  <Stack
                    className={mergeNames(STYLES.flexBetween, 'flex-row mb-2')}
                  >
                    <Stack direction={'row'}>
                      <Text>
                        Зарын огноо:
                        {moment(data.createdAt).format('lll')}
                      </Text>
                      <Text>Зарын дугаар: {data.num}</Text>
                    </Stack>
                    <Text>
                      <IconButton
                        aria-label="Search database"
                        icon={<FaHeart />}
                        _hover={{
                          color: 'red',
                        }}
                        size="lg"
                        onClick={() =>
                          toast({
                            title: 'Зар хадгалагдлаа.',
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                          })
                        }
                      />
                      {/* Хандалт: lorem */}
                    </Text>
                  </Stack>
                  <Box
                    className={mergeNames(
                      'product__image',
                      'border-2 rounded-4 mb-[120px] shadow-md'
                    )}
                  >
                    {/* {data?.images && (
                      <AspectRatio ratio={1}>
                       <ImageGallery items={
                          
                        } /> 
                      </AspectRatio>
                    )} */}
                  </Box>
                  <Text mt={5}>{data.description}</Text>
                </div>

                {/*  //TODO  ENDING LEFT SIDE IMAGES AND DESC */}

                {/*  //TODO  STARTS RIGHT SIDE INFOS */}

                <div>
                  <div className="grid grid-cols-2 gap-3">
                    {
                      // data?.positions?.location_id  &&
                      data?.positions?.district_id &&
                        districts?.map((d, i) => {
                          return d._id == data.positions.district_id ? (
                            <ProductInfo
                              key={i}
                              title={'Дүүрэг'}
                              value={d.name}
                            />
                          ) : (
                            ''
                          );
                        })
                    }

                    {data?.positions?.location_id && (
                      <ProductInfo
                        title={'Хороолол'}
                        value={data?.positions?.location_id}
                      />
                    )}
                    {data?.positions?.committee_id && (
                      <ProductInfo
                        title={'Хороо'}
                        tt="lowercase"
                        value={data?.positions?.committee_id}
                      />
                    )}
                    {data?.positions?.town && (
                      <ProductInfo
                        title={'Хотхон'}
                        value={data?.positions?.town.value}
                      />
                    )}

                    {data?.filters?.map((p, i) => {
                      if (p.id != null) {
                        return (
                          <ProductInfo
                            key={i}
                            title={p.name}
                            id={p.id}
                            value={p.value}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
                {/*  //TODO  ENDING RIGHT SIDE INFOS */}
              </div>
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
              className="border-2 border-blue-400 rounded-full"
              onChange={async (e) => {
                setSuggestion(e.target.value);
                {
                  suggestion != 'map'
                    ? getSuggestion(e.target.value)
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

                        <option value={'map'}>Газрын зургаар</option>
                      </>
                    );
                  case 'room':
                    return i !=
                      data?.subCategory?.suggessionType?.length - 1 ? (
                      <option value="room" key={i}>
                        Өрөөгөөр
                      </option>
                    ) : (
                      <>
                        <option value="room" key={i}>
                          Өрөөгөөр
                        </option>

                        <option value={'map'}>Газрын зургаар</option>
                      </>
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
                      onClick={() => setMarkerActive(i)}
                      animation={google.maps.Animation.DROP}
                    >
                      <InfoWindow
                        position={{
                          lat: parseFloat(m.location?.lat ?? 47.74604),
                          lng: parseFloat(m.location?.lng ?? 107.341515),
                        }}
                        // onLoad={(info) => console.log(info)}
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
  const res = await fetch(`${urls['test']}/ad/${slug}`);
  const ads = await res.json();
  return {
    props: {
      propAds: ads,
    },
  };
}
