import {
     AspectRatio,
     Box,
     Grid,
     GridItem,
     Heading,
     Image,
     Stack,
     Text,
     Link,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

import MainContainer from "../../layout/mainContainer";

const categoryCardData = [
     {
          image: "./images/HeaderSlider/1.jpg",
          categoryName: "Үл хөдлөх хөрөнгө",
          href: "/real-state",
          itemCount: "105",
     },
     {
          image: "./images/HeaderSlider/1.jpg",
          categoryName: "Тээврийн хэрэгсэл",
          href: "/vehicle",

          itemCount: "105",
     },
     {
          image: "./images/HeaderSlider/1.jpg",
          categoryName: "Компьютер",
          href: "/computer",
          itemCount: "105",
     },
     {
          image: "./images/HeaderSlider/1.jpg",
          categoryName: "Гар утас",
          href: "phone",
          itemCount: "105",
     },
     {
          image: "./images/HeaderSlider/1.jpg",
          categoryName: "Цахилгаан бараа",
          href: "electronic",
          itemCount: "105",
     },
     {
          image: "./images/HeaderSlider/1.jpg",
          categoryName: "Гэр ахуйн бараа",
          href: "household-items",
          itemCount: "105",
     },
];

const CategorySelect = () => {
     return (
          <Box py={"50px"}>
               <MainContainer>
                    <Grid
                         templateColumns={{
                              base: "repeat(3,1fr)",
                              lg: "repeat(6,1fr)",
                         }}
                         gap={5}
                    >
                         {categoryCardData.map(({ ...props }, index) => {
                              return (
                                   <NextLink
                                        key={index}
                                        href={props.href}
                                        passHref
                                   >
                                        <Link>
                                             <GridItem
                                                  bgColor="white"
                                                  p={4}
                                                  borderRadius={"10px"}
                                                  boxShadow="md"
                                                  transition={"0.3s ease"}
                                                  _hover={{
                                                       boxShadow: "xl",
                                                  }}
                                                  textAlign={"center"}
                                             >
                                                  <Stack
                                                       key={index}
                                                       display={"flex"}
                                                       alignItems={"center"}
                                                       height="100%"
                                                  >
                                                       <AspectRatio
                                                            width="80%"
                                                            ratio={1 / 1}
                                                       >
                                                            <Image
                                                                 src={
                                                                      props.image
                                                                 }
                                                                 width="70%"
                                                                 borderRadius={
                                                                      "50%"
                                                                 }
                                                            />
                                                       </AspectRatio>

                                                       <Stack
                                                            mt={
                                                                 "15px !important"
                                                            }
                                                            direction="column"
                                                            justifyContent={
                                                                 "space-between"
                                                            }
                                                            height={"100%"}
                                                       >
                                                            <Heading
                                                                 variant={
                                                                      "smallHeading"
                                                                 }
                                                                 height="40px"
                                                            >
                                                                 {
                                                                      props.categoryName
                                                                 }
                                                            </Heading>
                                                       </Stack>
                                                  </Stack>
                                             </GridItem>
                                        </Link>
                                   </NextLink>
                              );
                         })}
                    </Grid>
               </MainContainer>
          </Box>
     );
};

export default CategorySelect;
