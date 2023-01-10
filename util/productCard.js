import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';

import { BiArea, BiDoorOpen, BiGitCompare } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { FiCamera } from 'react-icons/fi';
import { IoBedOutline } from 'react-icons/io5';
import { TbBath } from 'react-icons/tb';

const cardData = [
  {
    href: '/product',
    image: '/images/HeaderSlider/1.jpg',
    logo: 'asdasd',
    gallery: '5',
    title: 'Рокмон бюлдинг оффис',
    address: 'Баруун 4-н зам',
    room: '5',
    bedroom: '3',
    bathroom: '2',
    space: '5',
    price: '₮15,000,000',
  },
  {
    href: '/product',
    image: '/images/HeaderSlider/1.jpg',
    logo: 'asdasd',
    gallery: '5',
    title: 'Рокмон бюлдинг оффис',
    address: 'Баруун 4-н зам',
    room: '5',
    bedroom: '3',
    bathroom: '2',
    space: '5',
    price: '₮15,000,000',
  },
  {
    href: '/product',
    image: '/images/HeaderSlider/1.jpg',
    logo: 'asdasd',
    gallery: '5',
    title: 'Рокмон бюлдинг оффис',
    address: 'Баруун 4-н зам',
    room: '5',
    bedroom: '3',
    bathroom: '2',
    space: '5',
    price: '₮15,000,000',
  },
];

const ProductCard = ({ data, tlc }) => {
  const toast = useToast();

  return (
    <>
      {data &&
        data.map(({ ...props }, index) => {
          if (index < 4)
            return (
              <Box
                key={index}
                pos="relative"
                bgColor={'white'}
                borderRadius="5px"
                overflow={'hidden'}
                transition="0.3s ease"
                flexShrink="1"
                boxShadow="base"
                _hover={{
                  transform: 'scale(1.05)',
                  boxShadow: 'md',
                  zIndex: '10',
                }}
              >
                <Box>
                  <Box position={'relative'}>
                    <Link href={`/product/${props._id}`} target="_blank">
                      <AspectRatio ratio={5 / 4}>
                        <Image
                          src={
                            props.image
                              ? props.image
                              : '/images/HeaderSlider/1.jpg'
                          }
                          width="70%"
                        />
                      </AspectRatio>{' '}
                    </Link>
                    <Stack
                      direction={'row'}
                      pos={'absolute'}
                      bottom="5px"
                      right={'5px'}
                    >
                      <Tooltip label="Хадгалах">
                        <IconButton
                          aria-label="Bookmark"
                          icon={<FaHeart />}
                          _hover={{
                            color: 'red',
                          }}
                          p={1}
                          onClick={() =>
                            toast({
                              title: 'Хүсэл рүү нэмэгдлээ.',
                              status: 'success',
                              duration: 9000,
                              isClosable: true,
                            })
                          }
                        />
                      </Tooltip>
                      <Tooltip label="Харьцуулах">
                        <IconButton
                          aria-label="Bookmark"
                          icon={<BiGitCompare />}
                          _hover={{
                            color: 'mainBlue',
                          }}
                        />
                      </Tooltip>
                    </Stack>
                  </Box>
                  <Stack
                    direction="row"
                    display={'flex'}
                    left="2%"
                    justifyContent={'space-between'}
                    pos="absolute"
                    top="2%"
                    width="90%"
                  >
                    <Text bgColor={'white'} px={2} py={1} borderRadius="5px">
                      Logo
                    </Text>
                    <Flex
                      bgColor={'mainBlossom'}
                      px={2}
                      py={1}
                      borderRadius="5px"
                      color="white"
                      fontWeight={'bold'}
                      gap={1}
                      alignItems="center"
                    >
                      <FiCamera />
                      <Text>{props.gallery}</Text>
                    </Flex>
                  </Stack>
                </Box>
                <Stack p={3}>
                  <Heading variant={'smallHeading'} flexWrap="nowrap">
                    {props.title}
                  </Heading>
                  <Text>{props.description}</Text>
                  <Stack
                    direction={'row'}
                    gap={2}
                    justifyContent="space-around"
                  >
                    {props.filters &&
                      props.filters.map((p, i) => {
                        // console.log(p)
                        return (
                          <Box key={i}>
                            {' '}
                            {p.id && tlc(p.id.name) == 'өрөө' && p.value && (
                              <Flex alignItems={'center'} gap={1}>
                                <BiDoorOpen className="info__icon" />
                                <Heading
                                  variant={'smallHeading'}
                                  fontWeight="normal"
                                >
                                  {tlc(p.value) == 'байхгүй' ? 0 : p.value}
                                </Heading>
                              </Flex>
                            )}
                            {p.id &&
                              tlc(p.id.name) == 'мастер унтлагын өрөө' &&
                              p.value && (
                                <Flex alignItems={'center'} gap={1}>
                                  <IoBedOutline className="info__icon" />
                                  <Heading
                                    variant={'smallHeading'}
                                    fontWeight="normal"
                                  >
                                    {tlc(p.value) == 'байхгүй' ? 0 : p.value}
                                  </Heading>
                                </Flex>
                              )}
                            {p.id &&
                              tlc(p.id.name) == 'угаалгын өрөөний тоо' &&
                              p.value && (
                                <Flex alignItems={'center'} gap={1}>
                                  <TbBath className="info__icon" />
                                  <Heading
                                    variant={'smallHeading'}
                                    fontWeight="normal"
                                  >
                                    {tlc(p.value) == 'байхгүй' ? 0 : p.value}
                                  </Heading>
                                </Flex>
                              )}
                            {p.id && tlc(p.id.name) == 'талбай' && (
                              <Flex alignItems={'center'} gap={1}>
                                <BiArea className="info__icon" />
                                <Heading
                                  variant={'smallHeading'}
                                  fontWeight="normal"
                                >
                                  {tlc(p.value) == 'байхгүй' ? 0 : p.value}м.кв
                                </Heading>
                              </Flex>
                            )}
                          </Box>
                        );
                      })}
                  </Stack>
                  {/* <Grid
               templateColumns={{
                    base: "repeat(4,1fr)",
                    // lg: "repeat(4,2fr)",
               }}
               gap={2}
          >
               <GridItem>
                    <Flex alignItems={"center"} gap={1}>
                         <BiDoorOpen className="info__icon" />
                         <Text variant={"smallHeading"}>5</Text>
                    </Flex>
               </GridItem>
               <GridItem>
                    <Flex alignItems={"center"} gap={1}>
                         <IoBedOutline className="info__icon" />
                         <Text variant={"smallHeading"}>3</Text>
                    </Flex>
               </GridItem>
               <GridItem>
                    <Flex alignItems={"center"} gap={1}>
                         <TbBath className="info__icon" />
                         <Text variant={"smallHeading"}>2</Text>
                    </Flex>
               </GridItem>
               <GridItem>
                    <Flex alignItems={"center"} gap={1}>
                         <BiArea className="info__icon" />
                         <Text variant={"smallHeading"}>5м.кв</Text>
                    </Flex>
               </GridItem>
          </Grid> */}
                  <Heading variant={'smallHeading'}>{props.price}</Heading>
                </Stack>
              </Box>
            );
        })}
    </>
  );
};

export default ProductCard;
