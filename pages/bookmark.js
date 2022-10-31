import { Box, Grid, Heading, Select, Stack } from "@chakra-ui/react";
import React from "react";
import MainContainer from "../layout/mainContainer";
import ProductCard from "../util/productCard";

const Bookmark = () => {
     return (
          <Box as="section" id="bookmark">
               <MainContainer>
                    <Stack direction={"row"} py={2} gap={3} position="relative">
                         {/* //TODO Filter Box */}
                         {/* <FilterLayout /> */}
                         <Box
                              maxWidth={"25%"}
                              flex="0 0 25%"
                              bgColor={"white"}
                              p={5}
                              rounded={10}
                              boxShadow="base"
                              position={"sticky"}
                              top="0"
                         >
                              <Select
                                   placeholder="Өрөөний тоо"
                                   variant="outline"
                                   borderWidth="2px"
                                   color={"mainBlossom"}
                              >
                                   <option value={"option1"}>asd</option>
                              </Select>
                         </Box>

                         {/* //TODO Filter box end */}

                         {/* //TODO Main product */}
                         <Box
                              maxWidth={"75%"}
                              flex="0 0 75%"
                              borderRadius="5px"
                         >
                              {/* <SwiperHeader /> */}

                              <Heading variant={"mediumHeading"} my={3}>
                                   Онцгой зар
                              </Heading>
                              <Grid
                                   direction={"row"}
                                   templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                                   rowGap={5}
                                   gap={3}
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
                              </Grid>
                         </Box>
                    </Stack>
               </MainContainer>
          </Box>
     );
};

export default Bookmark;
