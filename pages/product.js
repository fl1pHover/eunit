import {
     AspectRatio,
     Box,
     Grid,
     GridItem,
     Heading,
     HStack,
     IconButton,
     Link,
     Select,
     Stack,
     Text,
     useToast,
} from "@chakra-ui/react";
import React from "react";

// Import Swiper React components
// Import Swiper styles
// import "swiper/css";

import FilterLayout from "../components/filter";
import MainContainer from "../layout/mainContainer";
import Estimator from "../util/estimator";
import ProductCard from "../util/productCard";

import { FaHeart } from "react-icons/fa";
const array = [...Array(700)];

import ScrollTop from "../util/scrollTop";

// Icons
import { BsFacebook, BsInstagram } from "react-icons/bs";

// Image Swiper Gallery
import ImageGallery from "react-image-gallery";

const images = [
     {
          original: "/images/HeaderSlider/1.jpg",
          thumbnail: "/images/HeaderSlider/1.jpg",
     },
     {
          original: "/images/404.png",
          thumbnail: "/images/404.png",
     },
     {
          original: "/images/HeaderSlider/1.jpg",
          thumbnail: "/images/HeaderSlider/1.jpg",
     },
     {
          original: "/images/HeaderSlider/1.jpg",
          thumbnail: "/images/HeaderSlider/1.jpg",
     },

     {
          original: "/images/HeaderSlider/1.jpg",
          thumbnail: "/images/HeaderSlider/1.jpg",
     },
     {
          original: "/images/HeaderSlider/1.jpg",
          thumbnail: "/images/HeaderSlider/1.jpg",
     },
     {
          original: "/images/HeaderSlider/1.jpg",
          thumbnail: "/images/HeaderSlider/1.jpg",
     },
     {
          original: "images/HeaderSlider/1.jpg",
          thumbnail: "images/HeaderSlider/1.jpg",
     },

     {
          original: "images/HeaderSlider/1.jpg",
          thumbnail: "images/HeaderSlider/1.jpg",
     },
     {
          original: "images/HeaderSlider/1.jpg",
          thumbnail: "images/HeaderSlider/1.jpg",
     },
];

const ProductInfo = ({ title, value, children, key }) => {
     return (
          <GridItem className="product__info" key={key}>
               {children ? (
                    children
               ) : (
                    <Stack
                         direction={"row"}
                         p={2}
                         borderColor="bgGrey"
                         borderWidth={2}
                         borderRadius={5}
                    >
                         <Text>{title}: </Text>
                         <Text fontWeight={"bold"}>{value}</Text>
                    </Stack>
               )}
          </GridItem>
     );
};
const product = {
     title: "Академи хотхон 3 өрөө байр зарна.",
     date: "2022.09.21 15:53",
     description:
          "Академи 2 хотхонд 3-н өрөө бүрэн тавилгатай орон сууц зарна.",
     info: [
          { Утас: "9599-2333" },
          { "": "" },
          { Үнэ: "350.0 сая" },
          { Талбай: "70 м2" },
          { "Нэгж талбайн үнэ": "5.0 сая" },
          { Дүүрэг: "Хан-Уул дүүрэг" },
          { Хороо: "4-р хороо" },
          { Байршид: "Оргил" },
          { Хотхон: "Академи 2" },
          { "Ашиглалтад орсон он": "2021" },
          { "Барилгын давхар": "25" },
          { "хэдэн давхар": "18" },
          { өрөө: "3" },
          { "угаалгын өрөө": "1" },
          { "Mac/унтлгаын өрөө": "Байхгүй" },
          { цонх: "Вакум" },
          { "цонхны тоо": "4" },
          { хаалга: "Бүргэд" },
          { шал: "Паркет" },
          { гараж: "Байгаа" },
          { "тагтны тоо": "1" },
          { бартер: "Байхгүй" },
          { "Төлбөрийн нөхцөл": "Бэлэн" },
     ],
     socials: {
          facebook: "https://www.facebook.com/sokobishu",
     },
};
const Product = () => {
     const toast = useToast();

     console.log(product);
     return (
          <Box my={5} as="section" id="main__product">
               <ScrollTop />
               <MainContainer>
                    <Stack direction={"row"} py={2} gap={3}>
                         {/* //TODO Filter Box */}
                         <FilterLayout />

                         {/* //TODO Filter box end */}

                         {/* //TODO Main product */}
                         <Box
                              maxWidth={"75%"}
                              flex="0 0 75%"
                              borderRadius="5px"
                         >
                              <Box
                                   bgColor={"white"}
                                   p={10}
                                   rounded={10}
                                   boxShadow="base"
                              >
                                   {/*Product */}
                                   {product.title && (
                                        <Heading
                                             variant={"mediumHeading"}
                                             mb={5}
                                        >
                                             {product.title}
                                        </Heading>
                                   )}
                                   <Grid
                                        className="product__content-wrapper"
                                        templateColumns="repeat(2,1fr)"
                                        gap={10}
                                   >
                                        {/*  //TODO LEFT SIDE IMAGES AND DESC */}

                                        <GridItem className="product__image-wrapper">
                                             <Stack
                                                  direction={"row"}
                                                  justifyContent="space-between"
                                                  alignItems={"center"}
                                                  mb={2}
                                             >
                                                  <Stack direction={"row"}>
                                                       <Text>
                                                            Зарын огноо:{" "}
                                                            {product.date}
                                                       </Text>
                                                       <Text>
                                                            Зарын дугаар: 1
                                                       </Text>
                                                  </Stack>
                                                  <Text>
                                                       <IconButton
                                                            aria-label="Search database"
                                                            icon={<FaHeart />}
                                                            _hover={{
                                                                 color: "red",
                                                            }}
                                                            size="lg"
                                                            onClick={() =>
                                                                 toast({
                                                                      title: "Зар хадгалагдлаа.",
                                                                      status: "success",
                                                                      duration: 9000,
                                                                      isClosable: true,
                                                                 })
                                                            }
                                                       />
                                                       {/* Хандалт: lorem */}
                                                  </Text>
                                             </Stack>
                                             <Box
                                                  boxShadow={"xs"}
                                                  borderWidth="2px"
                                                  rounded={4}
                                                  mb="120px"
                                                  className="product__image"
                                             >
                                                  <AspectRatio ratio={1}>
                                                       <ImageGallery
                                                            items={images}
                                                       />
                                                  </AspectRatio>
                                             </Box>
                                             <Text mt={5}>
                                                  {product.description}
                                             </Text>
                                        </GridItem>

                                        {/*  //TODO  ENDING LEFT SIDE IMAGES AND DESC */}

                                        {/*  //TODO  STARTS RIGHT SIDE INFOS */}

                                        <GridItem>
                                             <Grid
                                                  templateColumns="repeat(2, 1fr)"
                                                  gap={3}
                                             >
                                                  {product.info.map((p, i) => {
                                                       if (i != 1) {
                                                            return (
                                                                 <ProductInfo
                                                                      key={i}
                                                                      title={
                                                                           Object.keys(
                                                                                p
                                                                           )[0]
                                                                      }
                                                                      value={
                                                                           Object.values(
                                                                                p
                                                                           )[0]
                                                                      }
                                                                 />
                                                            );
                                                       }
                                                       return (
                                                            <ProductInfo
                                                                 key={i}
                                                            >
                                                                 <HStack
                                                                      p={2}
                                                                      justifyContent="center"
                                                                      gap={1}
                                                                      borderColor="bgGrey"
                                                                      borderWidth={
                                                                           2
                                                                      }
                                                                      borderRadius={
                                                                           5
                                                                      }
                                                                 >
                                                                      {product
                                                                           .socials
                                                                           .facebook && (
                                                                           <Link
                                                                                target={
                                                                                     "_blank"
                                                                                }
                                                                                href={
                                                                                     product
                                                                                          .socials
                                                                                          .facebook
                                                                                }
                                                                           >
                                                                                <BsFacebook />
                                                                           </Link>
                                                                      )}
                                                                      {product
                                                                           .socials
                                                                           .instagram && (
                                                                           <Link>
                                                                                <BsInstagram />
                                                                           </Link>
                                                                      )}
                                                                 </HStack>
                                                            </ProductInfo>
                                                       );
                                                  })}
                                             </Grid>
                                        </GridItem>
                                        {/*  //TODO  ENDING RIGHT SIDE INFOS */}
                                   </Grid>
                              </Box>

                              <Box>
                                   <Estimator />
                              </Box>
                         </Box>
                    </Stack>
               </MainContainer>
               <MainContainer py={"50px"}>
                    <Stack
                         direction={"row"}
                         display={"flex"}
                         justifyContent={"space-between"}
                    >
                         <Heading variant="smallHeader" mb={5}>
                              Санал болгох зарууд
                         </Heading>
                         <Box>
                              <Select
                                   placeholder="Өрөөгөөр"
                                   variant="outline"
                                   borderWidth="2px"
                                   color={"mainBlossom"}
                              >
                                   <option value="option1">Байршлаар</option>
                              </Select>
                         </Box>
                    </Stack>

                    <Grid
                         direction={"row"}
                         templateColumns="repeat(auto-fill, minmax(230px, 1fr))"
                         rowGap={5}
                         gap="5"
                         width="100%"
                         justifyContent={"center"}
                    >
                         <ProductCard />
                         <ProductCard />
                         <ProductCard />
                         <ProductCard />
                         <ProductCard />
                         <ProductCard />
                    </Grid>
               </MainContainer>
          </Box>
     );
};

export default Product;
