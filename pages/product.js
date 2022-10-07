import {
     AspectRatio,
     Box,
     Checkbox,
     Flex,
     Grid,
     GridItem,
     Heading,
     IconButton,
     Image,
     Input,
     Select,
     Stack,
     Text,
} from "@chakra-ui/react";
import React from "react";

import MainContainer from "./layout/mainContainer";
import ProductCard from "./util/productCard";

import { FaRegHeart } from "react-icons/fa";
const array = [...Array(700)];

const FilterStack = ({ children }) => {
     return (
          <Stack borderBottom={"2px solid "} borderColor="bgGrey" py={5}>
               {children}
          </Stack>
     );
};

const ProductInfo = () => {
     return (
          <GridItem>
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
     return (
          <Box my={5} as="section" id="main__product">
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
                                   <Text>asdasd</Text>
                              </FilterStack>

                              <FilterStack>
                                   <Heading variant={"smallHeading"} mb={2}>
                                        Зарах & Түрээслүүлэх
                                   </Heading>
                                   <Checkbox colorScheme={"red"} defaultChecked>
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
                                   <Select placeholder="Дүүрэг">
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
                                   <Flex>
                                        <Input
                                             type="number"
                                             variant="outline"
                                             borderColor={"bgGrey"}
                                             borderWidth="2px"
                                        />
                                        <Input
                                             type="number"
                                             variant="outline"
                                             borderColor={"bgGrey"}
                                             borderWidth="2px"
                                        />
                                   </Flex>
                                   <Flex>
                                        <Input
                                             placeholder="Дээд"
                                             variant="outline"
                                             borderWidth="2px"
                                             type="number"
                                        />
                                        <Input
                                             placeholder="Доод"
                                             variant="outline"
                                             borderColor={"bgGrey"}
                                             borderWidth="2px"
                                             type="number"
                                        />
                                   </Flex>
                              </FilterStack>
                         </Box>

                         {/* Main product */}
                         <Box
                              maxWidth={"75%"}
                              flex="0 0 75%"
                              bgColor={"white"}
                              p={10}
                              borderRadius="5px"
                         >
                              <Heading variant={"mediumHeading"}>
                                   Академи хотхон 3 өрөө байр зарна.
                              </Heading>

                              {/*Product */}
                              <Grid
                                   templateColumns="repeat(2,1fr)"
                                   gap={10}
                                   mt={5}
                              >
                                   {/* Image and desription */}
                                   <GridItem>
                                        <Stack
                                             direction={"row"}
                                             justifyContent="space-between"
                                             alignItems={"center"}
                                        >
                                             <Text>
                                                  Зарын огноо: 2022.09.21 15:53
                                             </Text>
                                             <Text>
                                                  <IconButton
                                                       aria-label="Search database"
                                                       icon={<FaRegHeart />}
                                                       _hover={{
                                                            color: "red",
                                                       }}
                                                  />
                                                  {/* Хандалт: lorem */}
                                             </Text>
                                        </Stack>
                                        <AspectRatio ratio={1 / 1}>
                                             <Image src="./images/HeaderSlider/1.jpg" />
                                        </AspectRatio>
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
                    <Heading variant="smallHeader" mb={5}>
                         Санал болгох зарууд
                    </Heading>
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
