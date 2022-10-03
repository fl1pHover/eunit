import {
     Box,
     Button,
     Center,
     Divider,
     Flex,
     Grid,
     GridItem,
     Heading,
     Icon,
     Input,
     InputGroup,
     InputRightElement,
     Link,
     Select,
     Stack,
     Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

import { AiOutlineTwitter } from "react-icons/ai";
import MainContainer from "../layout/mainContainer";
import { BsSearch } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineCalculator } from "react-icons/hi";
import { IoPersonCircleOutline } from "react-icons/io5";
import ChakraLink from "../util/nextLink";

const NavItem = ({ text, icon }) => {
     return (
          <ChakraLink href={"bookmark"}>
               <Stack
                    alignItems={"center"}
                    className="nav__item"
                    py={3}
                    px={3}
                    borderRadius="20px"
               >
                    {icon}
                    <Text marginTop={"0px !important"} lineHeight={1}>
                         {text}
                    </Text>
               </Stack>
          </ChakraLink>
     );
};

const navCategoryData = [
     {
          categoryName: "Үл хөдлөх хөрөнгө",
          href: "/real-state",
     },
     {
          categoryName: "Тээврийн хэрэгсэл",
          href: "/vehicle",
     },
     {
          categoryName: "Компьютер",
          href: "/computer",
     },
     {
          categoryName: "Гар утас",
          href: "phone",
     },
     {
          categoryName: "Цахилгаан бараа",
          href: "electronic",
     },
     {
          categoryName: "Гэр ахуйн бараа",
          href: "household-items",
     },
];

const Navbar = () => {
     return (
          <>
               <Box bgColor={"white"} as={"section"} id="navbar" px={"-100px"}>
                    <MainContainer>
                         <Stack
                              direction={"row"}
                              py={3}
                              width={"full"}
                              alignItems="center"
                              justifyContent={"space-between"}
                         >
                              <NextLink href="/" passHref>
                                   <Link>
                                        <Heading>BOM</Heading>
                                   </Link>
                              </NextLink>

                              <Flex width={"100%"} mx={"50px !important"}>
                                   <InputGroup height={"40px"} width="100%">
                                        <Input
                                             placeholder="Зараа хайх.."
                                             borderColor={"#d9dedc"}
                                             bgColor={"bgGrey"}
                                             borderRadius={"10px"}
                                             focusBorderColor={"mainBlossom"}
                                             height={"100%"}
                                        />
                                        <InputRightElement
                                             children={
                                                  <Button
                                                       size={"xl"}
                                                       width={"full"}
                                                       height={"full"}
                                                       fontSize={"20px"}
                                                  >
                                                       <BsSearch className="white__icon" />
                                                  </Button>
                                             }
                                             height={"100%"}
                                             bgColor="mainBlossom"
                                             borderRightRadius="10px"
                                        />
                                   </InputGroup>
                                   {/* <Box display={"flex"} flexDirection={"row"}>
                                   <Input
                                        type="search"
                                        borderColor={"bgGrey"}
                                   />
                                   <Center>
                                        <BsSearch />
                                   </Center>
                              </Box> */}
                              </Flex>

                              {/* NAVBAR RIGHT */}
                              <Flex float={"right"}>
                                   <Flex
                                        borderColor={"bgGrey"}
                                        borderWidth={"2px"}
                                        borderRadius="20px"
                                        height={"full"}
                                        alignItems={"center"}
                                        px={10}
                                        py={1}
                                        gap={5}
                                        // className="navbar__item"
                                   >
                                        <ChakraLink href={"/wallet"}>
                                             <>
                                                  <Flex
                                                       alignItems={"center"}
                                                       gap={1}
                                                       className="nav__item"
                                                  >
                                                       <BiWallet className="icon nav__icon" />
                                                       <Box lineHeight={"1"}>
                                                            <Text>Хэтэвч</Text>
                                                            <Text>15000</Text>
                                                       </Box>
                                                  </Flex>
                                             </>
                                        </ChakraLink>
                                        <NavItem
                                             text={"Bookmark"}
                                             icon={
                                                  <FaRegHeart className="icon nav__icon" />
                                             }
                                        />
                                        <NavItem
                                             text={"Үнэлгээ"}
                                             icon={
                                                  <HiOutlineCalculator className="icon nav__icon" />
                                             }
                                        />
                                        <NavItem
                                             text={"Бүртгүүлэх"}
                                             icon={
                                                  <IoPersonCircleOutline className="icon nav__icon" />
                                             }
                                        />
                                        {/* <Select
                                        placeholder="MN"
                                        bg={"mainBlossom"}
                                        p={"5px   "}
                                   >
                                        <option
                                             value="option2"
                                             bgColor="white"
                                             width="50% !inmportant"
                                        >
                                             English
                                        </option>
                                   </Select> */}
                                   </Flex>
                              </Flex>
                              {/* <GridItem w="100%" h="10" bg="blue.500"></GridItem>
                    <GridItem w="100%" h="10" bg="blue.500"></GridItem>
                    <GridItem w="100%" h="10" bg="blue.500"></GridItem> */}
                         </Stack>
                    </MainContainer>
               </Box>
               <Box bgColor={"mainBlossom"} as="article" id="nav__category">
                    <MainContainer>
                         <Stack
                              direction={"row"}
                              display={"flex"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              py="5px"
                         >
                              <Stack direction={"row"} py={1}>
                                   {navCategoryData.map(
                                        ({ ...props }, index) => {
                                             return (
                                                  <NextLink
                                                       href={props.href}
                                                       key={index}
                                                       passHref
                                                  >
                                                       <Link
                                                            py={2}
                                                            px={4}
                                                            color="white"
                                                            _hover={{
                                                                 bgColor: "white",
                                                                 color: "mainBlossom",
                                                            }}
                                                            borderRadius="2px"
                                                       >
                                                            <Text
                                                                 color={
                                                                      "inherit"
                                                                 }
                                                            >
                                                                 {
                                                                      props.categoryName
                                                                 }
                                                            </Text>
                                                       </Link>
                                                  </NextLink>
                                             );
                                        }
                                   )}
                              </Stack>
                              <Stack direction={"row"}>
                                   <NextLink href={"/feedback"} passHref>
                                        <Link>
                                             <Button variant={"whiteButton"}>
                                                  Санал хүсэлт
                                             </Button>
                                        </Link>
                                   </NextLink>
                                   <NextLink href={"/premium"} passHref>
                                        <Link>
                                             <Button variant={"blackButton"}>
                                                  Premium
                                             </Button>
                                        </Link>
                                   </NextLink>
                              </Stack>
                         </Stack>
                    </MainContainer>
               </Box>
          </>
     );
};

export default Navbar;
