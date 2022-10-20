import {
     AspectRatio,
     Box,
     Button,
     Checkbox,
     Flex,
     Grid,
     GridItem,
     Heading,
     IconButton,
     Image,
     Input,
     Link,
     Select,
     Stack,
     Text,
     useToast,
} from "@chakra-ui/react";
import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
// import "swiper/css";

import MainContainer from "../layout/mainContainer";
import ProductCard from "../util/productCard";

import { FaHeart } from "react-icons/fa";
const array = [...Array(700)];

import { categories } from "../data/categories";
import ScrollTop from "../util/scrollTop";

const FilterStack = ({ children }) => {
     return (
          <Stack borderBottom={"2px solid "} borderColor="bgGrey" py={5}>
               {children}
          </Stack>
     );
};

const ProductInfo = () => {
     return (
          <GridItem className="product__info">
               <Stack
                    direction={"row"}
                    p={2}
                    borderColor="bgGrey"
                    borderWidth={2}
                    borderRadius={5}
               >
                    <Text>Lorem: </Text>
                    <Text fontWeight={"bold"}>Lorem, ipsum.</Text>
               </Stack>
          </GridItem>
     );
};

const Product = () => {
     const toast = useToast();
     return (
          <Box my={5} as="section" id="main__product">
               <ScrollTop />
               <MainContainer>
                    <Stack direction={"row"} py={2} gap={3}>
                         {/* Filter Box */}
                         <Box
                              maxWidth={"25%"}
                              flex="0 0 25%"
                              bgColor={"white"}
                              p={5}
                              borderRadius="5px"
                         >
                              <FilterStack>
                                   <Heading variant={"smallHeading"} mb={2}>
                                        Lorem, ipsum dolor.
                                   </Heading>
                                   {categories.map(({ ...props }, id) => {
                                        return (
                                             <Link
                                                  href={props.href}
                                                  key={props.id}
                                             >
                                                  <Text>{props.category}</Text>
                                             </Link>
                                        );
                                   })}
                              </FilterStack>

                              <FilterStack>
                                   <Heading variant={"smallHeading"} mb={2}>
                                        Зарах & Түрээслүүлэх
                                   </Heading>
                                   <Checkbox
                                        borderColor={"mainBlue"}
                                        defaultChecked
                                   >
                                        Зарна
                                   </Checkbox>
                                   <Checkbox>Түрээслүүлнэ</Checkbox>
                              </FilterStack>
                              <FilterStack>
                                   <Heading variant={"smallHeading"} mb={2}>
                                        Байршлаар
                                   </Heading>
                                   <AspectRatio ratio={16 / 9}>
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" />
                                   </AspectRatio>
                              </FilterStack>
                              <FilterStack
                                   borderBottom={"2px solid "}
                                   borderColor="bgGrey"
                              >
                                   <Heading variant={"smallHeading"}>
                                        Нэмэлт хайлт
                                   </Heading>
                                   <Select
                                        placeholder="Дүүрэг"
                                        variant="outline"
                                        borderWidth="2px"
                                        color={"mainBlossom"}
                                   >
                                        <option value="option1">
                                             Option 1
                                        </option>
                                        <option value="option2">
                                             Option 2
                                        </option>
                                        <option value="option3">
                                             Option 3
                                        </option>
                                   </Select>
                                   <Flex alignItems={"center"} gap={2}>
                                        <Input
                                             type="number"
                                             placeholder="Дээд"
                                             variant="outline"
                                             borderWidth="2px"
                                        />
                                        <Text>-</Text>
                                        <Input
                                             type="number"
                                             placeholder="Доод"
                                             variant="outline"
                                             borderWidth="2px"
                                        />
                                   </Flex>
                                   <Flex alignItems={"center"} gap={2}>
                                        <Input
                                             type="number"
                                             placeholder="Дээд"
                                             variant="outline"
                                             borderWidth="2px"
                                        />
                                        <Text>-</Text>
                                        <Input
                                             type="number"
                                             placeholder="Доод"
                                             variant="outline"
                                             borderWidth="2px"
                                        />
                                   </Flex>
                                   <Button variant={"blueButton"} mx={4}>
                                        Хайх
                                   </Button>
                              </FilterStack>
                         </Box>
                         {/* <Estimator /> */}

                         {/* Main product */}
                         <Box
                              maxWidth={"75%"}
                              flex="0 0 75%"
                              bgColor={"white"}
                              px={10}
                              py={5}
                              borderRadius="5px"
                         >
                              {/*Product */}
                              <Heading variant={"mediumHeading"}>
                                   Академи хотхон 3 өрөө байр зарна.
                              </Heading>
                              <Grid
                                   className="product__content-wrapper"
                                   templateColumns="repeat(2,1fr)"
                                   gap={10}
                                   mt={5}
                              >
                                   {/* Image and desription */}
                                   <GridItem className="product__image-wrapper">
                                        <Stack
                                             direction={"row"}
                                             justifyContent="space-between"
                                             alignItems={"center"}
                                             mb={2}
                                        >
                                             <Stack direction={"row"}>
                                                  <Text>
                                                       Зарын огноо: 2022.09.21
                                                       15:53
                                                  </Text>
                                                  <Text>Зарын дугаар: 1</Text>
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
                                        <AspectRatio ratio={1 / 1}>
                                             <Image src="./images/404.png" />
                                        </AspectRatio>
                                        <Swiper
                                             spaceBetween={50}
                                             slidesPerView={3}
                                             onSlideChange={() =>
                                                  console.log("slide change")
                                             }
                                             onSwiper={(swiper) =>
                                                  console.log(swiper)
                                             }
                                        >
                                             <SwiperSlide>Slide 1</SwiperSlide>
                                             <SwiperSlide>Slide 2</SwiperSlide>
                                             <SwiperSlide>Slide 3</SwiperSlide>
                                             <SwiperSlide>Slide 4</SwiperSlide>
                                             ...
                                        </Swiper>
                                   </GridItem>
                                   <GridItem>
                                        <Grid
                                             templateColumns="repeat(2, 1fr)"
                                             gap={3}
                                        >
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                             <ProductInfo />
                                        </Grid>
                                   </GridItem>
                              </Grid>
                              <Text mt={5}>
                                   Lorem ipsum dolor sit amet consectetur
                                   adipisicing elit. Recusandae, doloremque.
                              </Text>
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
                         <ProductCard />
                         <ProductCard />
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
