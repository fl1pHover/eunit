import {
  AspectRatio,
  Box,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

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
import axios from 'axios';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import ImageGallery from 'react-image-gallery';
import urls from '../../constants/api';
import { useAuth } from '../../context/auth';

const images = [
  {
    original: '/images/HeaderSlider/1.jpg',
    thumbnail: '/images/HeaderSlider/1.jpg',
  },
  {
    original: '/images/404.png',
    thumbnail: '/images/404.png',
  },
  {
    original: '/images/HeaderSlider/1.jpg',
    thumbnail: '/images/HeaderSlider/1.jpg',
  },
  {
    original: '/images/HeaderSlider/1.jpg',
    thumbnail: '/images/HeaderSlider/1.jpg',
  },

  {
    original: '/images/HeaderSlider/1.jpg',
    thumbnail: '/images/HeaderSlider/1.jpg',
  },
  {
    original: '/images/HeaderSlider/1.jpg',
    thumbnail: '/images/HeaderSlider/1.jpg',
  },
  {
    original: '/images/HeaderSlider/1.jpg',
    thumbnail: '/images/HeaderSlider/1.jpg',
  },
  {
    original: 'images/HeaderSlider/1.jpg',
    thumbnail: 'images/HeaderSlider/1.jpg',
  },

  {
    original: 'images/HeaderSlider/1.jpg',
    thumbnail: 'images/HeaderSlider/1.jpg',
  },
  {
    original: 'images/HeaderSlider/1.jpg',
    thumbnail: 'images/HeaderSlider/1.jpg',
  },
];

const ProductInfo = ({ title, value, children, key }) => {
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
          <Text textTransform={'capitalize'} fontWeight={'bold'}>
            {value}
          </Text>
        </Stack>
      )}
    </GridItem>
  );
};
const product = {
  title: 'Академи хотхон 3 өрөө байр зарна.',
  date: '2022.09.21 15:53',
  description: 'Академи 2 хотхонд 3-н өрөө бүрэн тавилгатай орон сууц зарна.',
  info: [
    { Утас: '9599-2333' },
    { '': '' },
    { Үнэ: '350.0 сая' },
    { Талбай: '70 м2' },
    { 'Нэгж талбайн үнэ': '5.0 сая' },
    { Дүүрэг: 'Хан-Уул' },
    { Хороо: '4-р хороо' },
    { Байршид: 'Оргил' },
    { Хотхон: 'Академи 2' },
    { 'Ашиглалтад орсон он': '2021' },
    { 'Барилгын давхар': '25' },
    { 'Хэдэн давхар': '18' },
    { Өрөө: '3' },
    { 'Угаалгын өрөө': '1' },
    { 'Mac/Унтлгаын өрөө': 'Байхгүй' },
    { Цонх: 'Вакум' },
    { 'Цонхны тоо': '4' },
    { Хаалга: 'Бүргэд' },
    { Шал: 'Паркет' },
    { Гараж: 'Байгаа' },
    { 'Тагтны тоо': '1' },
    { Бартер: 'Байхгүй' },
    { 'Төлбөрийн нөхцөл': 'Бэлэн' },
  ],
  socials: {
    facebook: 'https://www.facebook.com/sokobishu',
  },
};
const Product = () => {
  const toast = useToast();
  const { districts, locations } = useAuth();
  const router = useRouter();
  const [data, setData] = useState('');
  const [suggestion, setSuggestion] = useState('location');
  const [sData, setsData] = useState([]);
  const getSuggestion = async () => {
    if (data) {
      try {
        await axios
          .post(`${urls['test']}/ad/suggestion`, {
            suggestion:
              suggestion == 'location'
                ? data?.positions?.district_id
                : suggestion == 'room'
                ? data?.filters.filter((f) => f.id == 'room')[0].value
                : null,
            type: suggestion,
          })
          .then((d) => console.log(d));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getData = async () => {
    try {
      let district_id;
      await fetch(`${urls['test']}/ad/{id}?id=${router.query.slug}`)
        .then((r) => r.json())
        .then(async (d) => {
          setData(d), (district_id = d.positions.district_id);
          try {
            await axios
              .post(`${urls['test']}/ad/suggesstion`, {
                suggestion:
                  suggestion == 'location'
                    ? d?.positions?.district_id
                    : suggestion == 'room'
                    ? data?.filters.filter((f) => f.id == 'room')[0].value
                    : null,
                type: suggestion,
              })
              .then((s) => {
                setsData(s.data);
              });
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (router.query.slug) {
      getData();
    }
  }, [router.query]);

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
                    <AspectRatio ratio={1}>
                      <ImageGallery items={images} />
                    </AspectRatio>
                  </Box>
                  <Text mt={5}>{data.description}</Text>
                </div>

                {/*  //TODO  ENDING LEFT SIDE IMAGES AND DESC */}

                {/*  //TODO  STARTS RIGHT SIDE INFOS */}

                <div>
                  <div className="grid-cols-2 gap-3">
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

                    {data?.positions?.location_id &&
                      locations?.map((l, i) => {
                        return l._id == data.positions.location_id ? (
                          <ProductInfo
                            key={i}
                            title={'Хороолол'}
                            value={l.name}
                          />
                        ) : (
                          ''
                        );
                      })}

                    {
                      // <ProductInfo
                      //       key={data.positions.location_id._id}
                      //       title={'Хороолол'}
                      //       value={data.positions.location_id.name}
                      //     />
                      //   return (
                      //        <ProductInfo
                      //             key={i}
                      //        >
                      //             <HStack
                      //                  p={2}
                      //                  justifyContent="center"
                      //                  gap={1}
                      //                  borderColor="bgGrey"
                      //                  borderWidth={
                      //                       2
                      //                  }
                      //                  borderRadius={
                      //                       5
                      //                  }
                      //             >
                      //                  {product
                      //                       .socials
                      //                       .facebook && (
                      //                       <Link
                      //                            target={
                      //                                 "_blank"
                      //                            }
                      //                            href={
                      //                                 product
                      //                                      .socials
                      //                                      .facebook
                      //                            }
                      //                       >
                      //                            <BsFacebook />
                      //                       </Link>
                      //                  )}
                      //                  {product
                      //                       .socials
                      //                       .instagram && (
                      //                       <Link>
                      //                            <BsInstagram />
                      //                       </Link>
                      //                  )}
                      //             </HStack>
                      //        </ProductInfo>
                      //   );
                    }
                    {data?.filters?.map((p, i) => {
                      if (p.id != null) {
                        return (
                          <ProductInfo key={i} title={p.name} value={p.value} />
                        );
                      }

                      //   return (
                      //        <ProductInfo
                      //             key={i}
                      //        >
                      //             <HStack
                      //                  p={2}
                      //                  justifyContent="center"
                      //                  gap={1}
                      //                  borderColor="bgGrey"
                      //                  borderWidth={
                      //                       2
                      //                  }
                      //                  borderRadius={
                      //                       5
                      //                  }
                      //             >
                      //                  {product
                      //                       .socials
                      //                       .facebook && (
                      //                       <Link
                      //                            target={
                      //                                 "_blank"
                      //                            }
                      //                            href={
                      //                                 product
                      //                                      .socials
                      //                                      .facebook
                      //                            }
                      //                       >
                      //                            <BsFacebook />
                      //                       </Link>
                      //                  )}
                      //                  {product
                      //                       .socials
                      //                       .instagram && (
                      //                       <Link>
                      //                            <BsInstagram />
                      //                       </Link>
                      //                  )}
                      //             </HStack>
                      //        </ProductInfo>
                      //   );
                    })}
                  </div>
                </div>
                {/*  //TODO  ENDING RIGHT SIDE INFOS */}
              </div>
            </Box>

            <Box>
              {/* <Estimator /> */}
              <ECalculator />
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
            <Select className="border-2 border-blue-400 rounded-full">
              <option value="location">Байршлаар</option>
              <option value="room">Өрөөгөөр</option>
            </Select>
          </Box>
        </div>

        <Grid
          direction={'row'}
          templateColumns="repeat(auto-fill, minmax(230px, 1fr))"
          className="justify-center w-full gap-5"
        >
          <AdContent data={sData} />
        </Grid>
      </MainContainer>
    </Box>
  );
};

export default Product;
