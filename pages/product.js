import {
     AspectRatio,
     Box,
     Button,
     Checkbox,
     Flex,
     Grid,
     GridItem,
     Heading,
     HStack,
     IconButton,
     Input,
     Link,
     Select,
     Stack,
     Text,
     useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

// Import Swiper React components
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

import { BsFacebook, BsInstagram } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
const filters = {
     districts: [
          {
               district: "баянгол",
               towns: ["10-р хороолол", "25-р эмийн сан", "3-р хороолол"],
          },
          {
               district: "баянзүрх",
               towns: ["1000 оюутны байр", "13-р хороолол", "1₮-р хороолол"],
          },
     ],
     rooms: ["1", "2", "3", "4", "5", "5+"],
     bathrooms: ["1", "2", "2+"],
     masterBedrooms: ["байхгүй", "1", "2", "2+"],
     window: ["вакум", "модон", "төмөр вакум", "модон вакум"],
     windows: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"],
     doors: ["бүргэд", "төмөр", "мод"],
     balconies: ["1", "2", "3", "4", "5", "5+"],
     floor: ["паркет", "ламинат", "плита", "мод", "чулуу", "бетон", "цемент"],
     garage: ["байгаа", "байхгүй"],
     condition: ["банкны лизингтэй", "хувь лизингтэй", "бэлэн"],
     barter: ["байгаа", "байхгүй"],
};

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
     const [filter, setFilter] = useState({
          district: "",
          location: "",
          room: "",
          barter: "",
          condition: "",
          garage: "",
          floor: "",
          balconies: "",
          doors: "",
          window: "",
          windows: "",
          bathroom: "",
          masterBedroom: "",
     });
     console.log(product);
     return (
          <Box my={5} as="section" id="main__product">
               <ScrollTop />
               <MainContainer>
                    <Stack direction={"row"} py={2} gap={3}>
                         {/* Filter Box */}
                         <Box
                              maxWidth={"20%"}
                              flex="0 0 20%"
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
                                   {/* <AspectRatio ratio={16 / 9}>
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" />
                                   </AspectRatio> */}
                              </FilterStack>
                              <FilterStack
                                   borderBottom={"2px solid "}
                                   borderColor="bgGrey"
                              >
                                   <Heading variant={"smallHeading"}>
                                        Нэмэлт хайлт
                                   </Heading>
                                   {filters && (
                                        <>
                                             {filters.districts && (
                                                  <Select
                                                       placeholder="Дүүрэг"
                                                       variant="outline"
                                                       borderWidth="2px"
                                                       color={"mainBlossom"}
                                                       onChange={(e) =>
                                                            setFilter({
                                                                 ...filter,
                                                                 district:
                                                                      e.target
                                                                           .value,
                                                            })
                                                       }
                                                       value={filter.district}
                                                  >
                                                       {filters.districts.map(
                                                            (d, ind) => {
                                                                 return (
                                                                      <option
                                                                           key={
                                                                                ind
                                                                           }
                                                                           value={ind.toString()}
                                                                      >
                                                                           {
                                                                                d.district
                                                                           }
                                                                      </option>
                                                                 );
                                                            }
                                                       )}
                                                  </Select>
                                             )}

                                             {filter.district != "" && (
                                                  <Select
                                                       placeholder="Байршил"
                                                       variant="outline"
                                                       borderWidth="2px"
                                                       color={"mainBlossom"}
                                                       onChange={(e) =>
                                                            setFilter({
                                                                 ...filter,
                                                                 location:
                                                                      e.target
                                                                           .value,
                                                            })
                                                       }
                                                       value={filter.location}
                                                  >
                                                       {filters.districts[
                                                            parseInt(
                                                                 filter.district
                                                            )
                                                       ].towns &&
                                                            filters.districts[
                                                                 parseInt(
                                                                      filter.district
                                                                 )
                                                            ].towns.map(
                                                                 (d, i) => {
                                                                      return (
                                                                           <option
                                                                                key={
                                                                                     i
                                                                                }
                                                                                value={`${i}`}
                                                                           >
                                                                                {
                                                                                     d
                                                                                }
                                                                           </option>
                                                                      );
                                                                 }
                                                            )}
                                                  </Select>
                                             )}
                                             {filters.rooms && (
                                                  <Select
                                                       placeholder="Өрөөний тоо"
                                                       variant="outline"
                                                       borderWidth="2px"
                                                       color={"mainBlossom"}
                                                       onChange={(e) =>
                                                            setFilter({
                                                                 ...filter,
                                                                 room: e.target
                                                                      .value,
                                                            })
                                                       }
                                                       value={filter.room}
                                                  >
                                                       {filters.rooms.map(
                                                            (d, ind) => {
                                                                 return (
                                                                      <option
                                                                           key={
                                                                                ind
                                                                           }
                                                                           value={ind.toString()}
                                                                      >
                                                                           {d}
                                                                      </option>
                                                                 );
                                                            }
                                                       )}
                                                  </Select>
                                             )}
                                             {filters.masterBedrooms && (
                                                  <Select
                                                       placeholder="Мастер унтлагийн өрөөний тоо"
                                                       variant="outline"
                                                       borderWidth="2px"
                                                       color={"mainBlossom"}
                                                       onChange={(e) =>
                                                            setFilter({
                                                                 ...filter,
                                                                 masterBedroom:
                                                                      e.target
                                                                           .value,
                                                            })
                                                       }
                                                       value={
                                                            filter.masterBedroom
                                                       }
                                                  >
                                                       {filters.masterBedrooms.map(
                                                            (d, ind) => {
                                                                 return (
                                                                      <option
                                                                           key={
                                                                                ind
                                                                           }
                                                                           value={ind.toString()}
                                                                      >
                                                                           {d}
                                                                      </option>
                                                                 );
                                                            }
                                                       )}
                                                  </Select>
                                             )}
                                             {filters.bathrooms && (
                                                  <Select
                                                       placeholder="Угаалгын өрөөний тоо"
                                                       variant="outline"
                                                       borderWidth="2px"
                                                       color={"mainBlossom"}
                                                       onChange={(e) =>
                                                            setFilter({
                                                                 ...filter,
                                                                 bathroom:
                                                                      e.target
                                                                           .value,
                                                            })
                                                       }
                                                       value={filter.bathroom}
                                                  >
                                                       {filters.bathrooms.map(
                                                            (d, ind) => {
                                                                 return (
                                                                      <option
                                                                           key={
                                                                                ind
                                                                           }
                                                                           value={ind.toString()}
                                                                      >
                                                                           {d}
                                                                      </option>
                                                                 );
                                                            }
                                                       )}
                                                  </Select>
                                             )}
                                             {filters.window && (
                                                  <Select
                                                       placeholder="Цонх"
                                                       variant="outline"
                                                       borderWidth="2px"
                                                       color={"mainBlossom"}
                                                       onChange={(e) =>
                                                            setFilter({
                                                                 ...filter,
                                                                 window: e
                                                                      .target
                                                                      .value,
                                                            })
                                                       }
                                                       value={filter.window}
                                                  >
                                                       {filters.window.map(
                                                            (d, ind) => {
                                                                 return (
                                                                      <option
                                                                           key={
                                                                                ind
                                                                           }
                                                                           value={ind.toString()}
                                                                      >
                                                                           {d}
                                                                      </option>
                                                                 );
                                                            }
                                                       )}
                                                  </Select>
                                             )}
                                             {filters.windows && (
                                                  <Select
                                                       placeholder="Цонхны тоо"
                                                       variant="outline"
                                                       borderWidth="2px"
                                                       color={"mainBlossom"}
                                                       onChange={(e) =>
                                                            setFilter({
                                                                 ...filter,
                                                                 windows: e
                                                                      .target
                                                                      .value,
                                                            })
                                                       }
                                                       value={filter.windows}
                                                  >
                                                       {filters.windows.map(
                                                            (d, ind) => {
                                                                 return (
                                                                      <option
                                                                           key={
                                                                                ind
                                                                           }
                                                                           value={ind.toString()}
                                                                      >
                                                                           {d}
                                                                      </option>
                                                                 );
                                                            }
                                                       )}
                                                  </Select>
                                             )}
                                             {filters.doors && (
                                                  <Select
                                                       placeholder="Хаалга"
                                                       variant="outline"
                                                       borderWidth="2px"
                                                       color={"mainBlossom"}
                                                       onChange={(e) =>
                                                            setFilter({
                                                                 ...filter,
                                                                 doors: e.target
                                                                      .value,
                                                            })
                                                       }
                                                       value={filter.doors}
                                                  >
                                                       {filters.doors.map(
                                                            (d, ind) => {
                                                                 return (
                                                                      <option
                                                                           key={
                                                                                ind
                                                                           }
                                                                           value={ind.toString()}
                                                                      >
                                                                           {d}
                                                                      </option>
                                                                 );
                                                            }
                                                       )}
                                                  </Select>
                                             )}
                                             {filters.balconies && (
                                                  <Select
                                                       placeholder="Тагтны тоо"
                                                       variant="outline"
                                                       borderWidth="2px"
                                                       color={"mainBlossom"}
                                                       onChange={(e) =>
                                                            setFilter({
                                                                 ...filter,
                                                                 balconies:
                                                                      e.target
                                                                           .value,
                                                            })
                                                       }
                                                       value={filter.balconies}
                                                  >
                                                       {filters.balconies.map(
                                                            (d, ind) => {
                                                                 return (
                                                                      <option
                                                                           key={
                                                                                ind
                                                                           }
                                                                           value={ind.toString()}
                                                                      >
                                                                           {d}
                                                                      </option>
                                                                 );
                                                            }
                                                       )}
                                                  </Select>
                                             )}
                                             {filters.floor && (
                                                  <Select
                                                       placeholder="Шал"
                                                       variant="outline"
                                                       borderWidth="2px"
                                                       color={"mainBlossom"}
                                                       onChange={(e) =>
                                                            setFilter({
                                                                 ...filter,
                                                                 floor: e.target
                                                                      .value,
                                                            })
                                                       }
                                                       value={filter.floor}
                                                  >
                                                       {filters.floor.map(
                                                            (d, ind) => {
                                                                 return (
                                                                      <option
                                                                           key={
                                                                                ind
                                                                           }
                                                                           value={ind.toString()}
                                                                      >
                                                                           {d}
                                                                      </option>
                                                                 );
                                                            }
                                                       )}
                                                  </Select>
                                             )}
                                             {filters.garage && (
                                                  <Select
                                                       placeholder="Гараж"
                                                       variant="outline"
                                                       borderWidth="2px"
                                                       color={"mainBlossom"}
                                                       onChange={(e) =>
                                                            setFilter({
                                                                 ...filter,
                                                                 garage: e
                                                                      .target
                                                                      .value,
                                                            })
                                                       }
                                                       value={filter.garage}
                                                  >
                                                       {filters.garage.map(
                                                            (d, ind) => {
                                                                 return (
                                                                      <option
                                                                           key={
                                                                                ind
                                                                           }
                                                                           value={ind.toString()}
                                                                      >
                                                                           {d}
                                                                      </option>
                                                                 );
                                                            }
                                                       )}
                                                  </Select>
                                             )}
                                             {filters.condition && (
                                                  <Select
                                                       placeholder="Төлбөрийн нөхцөл"
                                                       variant="outline"
                                                       borderWidth="2px"
                                                       color={"mainBlossom"}
                                                       onChange={(e) =>
                                                            setFilter({
                                                                 ...filter,
                                                                 condition:
                                                                      e.target
                                                                           .value,
                                                            })
                                                       }
                                                       value={filter.condition}
                                                  >
                                                       {filters.condition.map(
                                                            (d, ind) => {
                                                                 return (
                                                                      <option
                                                                           key={
                                                                                ind
                                                                           }
                                                                           value={ind.toString()}
                                                                      >
                                                                           {d}
                                                                      </option>
                                                                 );
                                                            }
                                                       )}
                                                  </Select>
                                             )}
                                             {filters.barter && (
                                                  <Select
                                                       placeholder="Бартер"
                                                       variant="outline"
                                                       borderWidth="2px"
                                                       color={"mainBlossom"}
                                                       onChange={(e) =>
                                                            setFilter({
                                                                 ...filter,
                                                                 barter: e
                                                                      .target
                                                                      .value,
                                                            })
                                                       }
                                                       value={filter.barter}
                                                  >
                                                       {filters.barter.map(
                                                            (d, ind) => {
                                                                 return (
                                                                      <option
                                                                           key={
                                                                                ind
                                                                           }
                                                                           value={ind.toString()}
                                                                      >
                                                                           {d}
                                                                      </option>
                                                                 );
                                                            }
                                                       )}
                                                  </Select>
                                             )}
                                        </>
                                   )}

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
                              {product.title && (
                                   <Heading variant={"mediumHeading"}>
                                        {product.title}
                                   </Heading>
                              )}
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
                                                       Зарын огноо:{" "}
                                                       {product.date}
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
                                        <Box border={"1px solid black"}>
                                             <AspectRatio ratio={1}>
                                                  <ImageGallery
                                                       items={images}
                                                  />
                                             </AspectRatio>
                                        </Box>
                                   </GridItem>
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
                                                       <ProductInfo key={i}>
                                                            <HStack
                                                                 p={2}
                                                                 justifyContent="center"
                                                                 gap={1}
                                                                 borderColor="bgGrey"
                                                                 borderWidth={2}
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
                              </Grid>
                              <Text mt={5}>{product.description}</Text>
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
