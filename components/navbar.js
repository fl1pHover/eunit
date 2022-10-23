import {
     Avatar,
     Box,
     Button,
     Divider,
     Flex,
     Heading,
     HStack,
     Input,
     InputGroup,
     InputRightElement,
     Link,
     Stack,
     Text,
     VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

//TODO Container
import MainContainer from "../layout/mainContainer";

//TODO Icons
import { BsSearch } from "react-icons/bs";
import { categories } from "../data/categories";

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

const DownLink = ({ href, text }) => {
     return (
          <Link
               href={href}
               width="100%"
               _hover={{
                    color: "mainBlossom",
               }}
          >
               <Text>{text}</Text>
          </Link>
     );
};

const Navbar = () => {
     const [sticky, setSticky] = useState(false);
     const [active, setActive] = useState(false);

     const handleClick = (event) => {
          // 👇️ toggle isActive state on click
          setActive((current) => !current);
     };

     useEffect(() => {
          const handleScroll = () => {
               setSticky(window.scrollY > 0);
               // else !setSticky(window.scrollY > 0);
          };
          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
     });

     return (
          <>
               <Box
                    as="header"
                    width={"100%"}
                    bgColor="mainBlue"
                    transition={"0.3s ease"}
                    px={3}
                    color="white"
               >
                    <Text>Welcome to Bom Website</Text>
               </Box>
               <Box
                    id="navbar"
                    as={"section"}
                    pos={sticky ? "sticky" : "relative"}
                    top="0"
                    zIndex={"20"}
               >
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
                                        <InputGroup
                                             height={"40px"}
                                             width="100%"
                                        >
                                             <Input
                                                  placeholder="Хайх.."
                                                  borderColor={"#d9dedc"}
                                                  bgColor={"bgGrey"}
                                                  borderRadius={"10px"}
                                                  focusBorderColor={
                                                       "mainBlossom"
                                                  }
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
                                             {/* <Link href="/wallet">
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
                                             </Link> */}
                                             {/* <NavItem
                                                  text={"Хүсэл"}
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
                                             />{" "}
                                             <NavItem
                                                  text={"Бүртгүүлэх"}
                                                  href={"/register"}
                                                  icon={
                                                       <IoPersonCircleOutline className="icon nav__icon" />
                                                  }
                                             /> */}
                                             <Link href="/wallet">
                                                  <VStack className="animated__wallet">
                                                       <Flex gap={1}>
                                                            <Box
                                                                 width={"25px"}
                                                                 height="25px"
                                                                 className="animated__icon"
                                                            />
                                                            <Box
                                                                 lineHeight={
                                                                      "1"
                                                                 }
                                                            >
                                                                 <Text>
                                                                      Хэтэвч
                                                                 </Text>
                                                                 <Text>
                                                                      0,000₮
                                                                 </Text>
                                                            </Box>
                                                       </Flex>
                                                  </VStack>
                                             </Link>
                                             <Link href="/estimate">
                                                  <VStack className="animated__estimator">
                                                       <Box
                                                            width={"25px"}
                                                            height="25px"
                                                            className="animated__icon"
                                                       />
                                                       <Text mt="0 !important">
                                                            Үнэлгээ
                                                       </Text>
                                                  </VStack>
                                             </Link>
                                             <Link href="/bookmark">
                                                  <VStack className="animated__heart">
                                                       <Box
                                                            width={"25px"}
                                                            height="25px"
                                                            className="animated__icon"
                                                       />
                                                       <Text mt="0 !important">
                                                            Хүсэл
                                                       </Text>
                                                  </VStack>
                                             </Link>
                                             <Link href="/login">
                                                  <VStack className="animated__account">
                                                       <Box
                                                            width={"25px"}
                                                            height="25px"
                                                            className="animated__icon"
                                                       />
                                                       <Text mt="0 !important">
                                                            Бүртгүүлэх
                                                       </Text>
                                                  </VStack>
                                             </Link>

                                             <VStack
                                                  // className="animated__account"
                                                  className="animated__account"
                                                  textAlign={"center"}
                                                  onClick={handleClick}
                                                  pos="relative"
                                             >
                                                  <Box
                                                       width={"25px"}
                                                       height="25px"
                                                       className="animated__icon"
                                                  />
                                                  <Text mt="0 !important">
                                                       Профайл
                                                  </Text>
                                                  <Box
                                                       className={
                                                            active
                                                                 ? "profile__drop-menu"
                                                                 : "profile__drop-menu drop__hidden"
                                                       }
                                                       pos="absolute"
                                                       bottom="-200px"
                                                       right="0"
                                                       onClick={handleClick}
                                                       // boxShadow="xl"
                                                       height="200px"
                                                       width="250px"
                                                       bgColor="white"
                                                       rounded={5}
                                                       p={3}
                                                  >
                                                       <HStack
                                                            alignItems={
                                                                 "center"
                                                            }
                                                       >
                                                            <Avatar
                                                                 src="https://bit.ly/dan-abramov"
                                                                 size={"sm"}
                                                            />
                                                            <VStack
                                                                 alignItems={
                                                                      "flex-start"
                                                                 }
                                                            >
                                                                 <Text
                                                                      fontWeight={
                                                                           "bold"
                                                                      }
                                                                 >
                                                                      Soko
                                                                 </Text>
                                                                 <Text
                                                                      mt={
                                                                           "0 !important"
                                                                      }
                                                                 >
                                                                      soko_bishu@yahoo.com
                                                                 </Text>
                                                            </VStack>
                                                       </HStack>
                                                       <Divider
                                                            orientation="horizontal"
                                                            bgColor={"red"}
                                                            my={3}
                                                       />
                                                       <VStack
                                                            textAlign="left"
                                                            color={"grey"}
                                                       >
                                                            <DownLink
                                                                 href={"/"}
                                                                 text="Хувийн
                                                                 мэдэээлэл"
                                                            />
                                                            <DownLink
                                                                 href={"/"}
                                                                 text="  Миний
                                                            зарууд"
                                                            />

                                                            <DownLink
                                                                 href={"/"}
                                                                 text="Хэтэвч"
                                                            />
                                                            <Divider
                                                                 orientation="horizontal"
                                                                 bgColor={"red"}
                                                                 my={3}
                                                            />
                                                            <DownLink
                                                                 href={"/"}
                                                                 text="Гарах"
                                                            />
                                                       </VStack>
                                                  </Box>
                                             </VStack>
                                        </Flex>
                                   </Flex>
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
                                        {categories.map(
                                             ({ ...props }, index) => {
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
                                                            <Text
                                                                 color={
                                                                      "inherit"
                                                                 }
                                                            >
                                                                 {
                                                                      props.category
                                                                 }
                                                            </Text>
                                                       </Link>
                                                  );
                                             }
                                        )}
                                   </Stack>
                                   <Stack direction={"row"}>
                                        <Link href={"/feedback"}>
                                             <Button variant={"whiteButton"}>
                                                  Санал хүсэлт
                                             </Button>
                                        </Link>

                                        <Link href={"/createAd"}>
                                             <Button variant={"blueButton"}>
                                                  Зар нэмэх
                                             </Button>
                                        </Link>
                                   </Stack>
                              </Stack>
                         </MainContainer>
                    </Box>
               </Box>
          </>
     );
};

export default Navbar;
