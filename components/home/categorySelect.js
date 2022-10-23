import {
     Box,
     Grid,
     GridItem,
     Heading,
     Link,
     Stack,
     Text,
} from "@chakra-ui/react";
import React from "react";

import { AiOutlineCar } from "react-icons/ai";
import { BsBuilding, BsPhone } from "react-icons/bs";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { MdComputer } from "react-icons/md";
import { RiHomeSmile2Line } from "react-icons/ri";
import MainContainer from "../../layout/mainContainer";

const categoryCardData = [
     {
          image: "./images/HeaderSlider/1.jpg",
          icon: <BsBuilding />,
          categoryName: "Үл хөдлөх хөрөнгө",
          href: "/category",
          itemCount: "105",
     },
     {
          image: "./images/category/car.jpg",
          icon: <AiOutlineCar />,
          categoryName: "Тээврийн хэрэгсэл",
          href: "/vehicle",

          itemCount: "105",
     },
     {
          image: "./images/category/computer.jpg",
          icon: <MdComputer />,
          categoryName: "Компьютер",
          href: "/computer",
          itemCount: "105",
     },
     {
          image: "./images/category/phone.jpg",
          icon: <BsPhone />,
          categoryName: "Гар утас",
          href: "phone",
          itemCount: "105",
     },
     {
          image: "./images/category/electronic.jpg",
          icon: <CgSmartHomeWashMachine />,
          categoryName: "Цахилгаан бараа",
          href: "electronic",
          itemCount: "105",
     },
     {
          image: "./images/category/home.jpg",
          icon: <RiHomeSmile2Line />,
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
                              base: "repeat(2,1fr)",
                              sm: "repeat(3,1fr)",
                              lg: "repeat(6,1fr)",
                         }}
                         gap={5}
                    >
                         {categoryCardData.map(({ ...props }, index) => {
                              return (
                                   <Link key={index} href={props.href}>
                                        <GridItem
                                             bgColor="white"
                                             py={8}
                                             rounded={20}
                                             boxShadow="md"
                                             transition={"0.3s ease"}
                                             _hover={{
                                                  boxShadow: "xl",
                                             }}
                                             textAlign={"center"}
                                             backgroundImage={props.image}
                                             backgroundPosition={"center"}
                                             backgroundSize="cover"
                                             className="card"
                                             overflow={"hidden"}
                                        >
                                             <Stack
                                                  key={index}
                                                  display={"flex"}
                                                  alignItems={"center"}
                                                  height="100%"
                                                  position={"relative"}
                                                  zIndex={"2"}
                                                  color="white"
                                             >
                                                  {/* <AspectRatio
                                                       width="80%"
                                                       ratio={1 / 1}
                                                  >
                                                       <Image
                                                            src={props.image}
                                                            width="70%"
                                                            borderRadius={"50%"}
                                                       />
                                                  </AspectRatio> */}
                                                  {/* <AiOutlineCar
                                                       fontSize={"50px"}
                                                  /> */}
                                                  <Text fontSize={"50px"}>
                                                       {props.icon}
                                                  </Text>
                                                  <Stack
                                                       mt={"15px !important"}
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
                                                            {props.categoryName}
                                                       </Heading>
                                                  </Stack>
                                             </Stack>
                                        </GridItem>
                                   </Link>
                              );
                         })}
                    </Grid>
               </MainContainer>
          </Box>
     );
};

export default CategorySelect;
