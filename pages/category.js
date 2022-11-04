import { Box, Grid, Heading, Image, Stack } from "@chakra-ui/react";
import React from "react";
import MainContainer from "../layout/mainContainer";

import FilterLayout from "../components/filter";

const Category = () => {
     return (
          <Box my={5} as="section" id="category">
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
                              {/* <SwiperHeader /> */}
                              <Image
                                   src="/images/HeaderSlider/1.jpg"
                                   height={"400px"}
                                   width="100%"
                                   objectFit={"cover"}
                                   alt="image"
                              />
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
                              ></Grid>
                         </Box>
                    </Stack>
               </MainContainer>
          </Box>
     );
};

export default Category;
