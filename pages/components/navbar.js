import {
     Box,
     Button,
     Flex,
     Heading,
     Input,
     InputGroup,
     InputRightElement,
     Link,
     Stack,
     Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

//TODO Container
import MainContainer from "../layout/mainContainer";

//TODO Icons
import { BiWallet } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineCalculator } from "react-icons/hi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { categories } from "../../data/categories";

const NavItem = ({ text, icon, href }) => {
     return (
          <Link href={href}>
               <Stack
                    alignItems={"center"}
                    className="nav__item"
                    py={3}
                    px={3}
                    borderRadius="20px"
               >
                    {icon}
                    <Text
                         marginTop={"3px !important"}
                         textStyle={""}
                         lineHeight={1}
                    >
                         {text}
                    </Text>
               </Stack>
          </Link>
     );
};

const Navbar = () => {
     const [sticky, setSticky] = useState(false);

     useEffect(() => {
          const handleScroll = () => {
               setSticky(window.scrollY > 0);
               // else !setSticky(window.scrollY > 0);
          };
          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
     });

     return (
          <Box
               id="navbar"
               as={"section"}
               pos={sticky ? "sticky" : "relative"}
               top="0"
               zIndex={"20"}
          >
               <Box
                    width={"100%"}
                    bgColor="mainBlue"
                    transition={"0.3s ease"}
                    p={!sticky ? 3 : 0}
               ></Box>
               <Box
                    bgColor={"white"}
                    boxShadow="md"
                    as={"article"}
                    px={"-100px"}
                    position="sticky"
                    zIndex={"20"}
               >
                    <MainContainer>
                         <Stack
                              direction={"row"}
                              py={2}
                              width={"full"}
                              alignItems="center"
                              justifyContent={"space-between"}
                         >
                              <Link href="/">
                                   <Heading>BOM</Heading>
                              </Link>

                              <Flex
                                   width={"100%"}
                                   mx={"50px !important"}
                                   ml={{ xl: "150px !important" }}
                              >
                                   <InputGroup height={"40px"} width="100%">
                                        <Input
                                             placeholder="Хайх.."
                                             borderColor={"#d9dedc"}
                                             bgColor={"bgGrey"}
                                             borderRadius={"10px"}
                                             focusBorderColor={"mainBlossom"}
                                             height={"100%"}
                                             _hover={{
                                                  background: "white",
                                             }}
                                        />
                                        <InputRightElement
                                             height={"100%"}
                                             bgColor="mainBlossom"
                                             borderRightRadius="10px"
                                        >
                                             <Button
                                                  size={"xl"}
                                                  width={"full"}
                                                  height={"full"}
                                                  fontSize={"20px"}
                                                  background={"none"}
                                                  _hover={{
                                                       opacity: "0.8",
                                                  }}
                                             >
                                                  <BsSearch className="white__icon" />
                                             </Button>
                                        </InputRightElement>
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
                                        // borderColor={"bgGrey"}
                                        // borderWidth={"2px"}
                                        // borderRadius="20px"
                                        height={"full"}
                                        alignItems={"center"}
                                        px={10}
                                        py={1}
                                        gap={5}
                                        // className="navbar__item"
                                   >
                                        <Link href="/wallet">
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
                                        </Link>

                                        <NavItem
                                             text={"Bookmark"}
                                             href={"/bookmark"}
                                             icon={
                                                  <FaRegHeart className="icon nav__icon" />
                                             }
                                        />
                                        <NavItem
                                             text={"Үнэлгээ"}
                                             href={"/estimate"}
                                             icon={
                                                  <HiOutlineCalculator className="icon nav__icon" />
                                             }
                                        />
                                        <NavItem
                                             text={"Бүртгүүлэх"}
                                             href={"/register"}
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
               <Box
                    bgColor={"mainBlossom"}
                    as="article"
                    id="nav__category"
                    className={sticky ? "wrap" : "unwrap"}
                    position="sticky"
                    zIndex={"19"}
               >
                    <MainContainer>
                         <Stack
                              direction={"row"}
                              display={"flex"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              py={1}
                         >
                              <Stack
                                   direction={"row"}
                                   borderColor="mainBlossom"
                                   borderWidth={1}
                              >
                                   {categories.map(({ ...props }, index) => {
                                        return (
                                             <Link
                                                  href={props.href}
                                                  key={index}
                                                  py={3}
                                                  px={4}
                                                  color="white"
                                                  _hover={{
                                                       bgColor: "white",
                                                       color: "mainBlossom",
                                                  }}
                                             >
                                                  <Text color={"inherit"}>
                                                       {props.category}
                                                  </Text>
                                             </Link>
                                        );
                                   })}
                              </Stack>
                              <Stack direction={"row"}>
                                   <Link href={"/feedback"}>
                                        <Button variant={"whiteButton"}>
                                             Санал хүсэлт
                                        </Button>
                                   </Link>

                                   <Link href={"/premium"}>
                                        <Button variant={"blueButton"}>
                                             Premium
                                        </Button>
                                   </Link>
                              </Stack>
                         </Stack>
                    </MainContainer>
               </Box>
          </Box>
     );
};

export default Navbar;
