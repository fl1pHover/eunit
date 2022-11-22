import {
     AspectRatio,
     Avatar,
     Box,
     Button,
     Center,
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
     Tab,
     TabList,
     TabPanel,
     TabPanels,
     Tabs,
     Text,
     Tooltip,
     VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BiArea, BiDoorOpen, BiGitCompare } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import MainContainer from "../../layout/mainContainer";

const Profile = () => {
     const router = useRouter();

     return (
          <MainContainer>
               <Tabs display={"flex"} my={10} gap={5}>
                    <TabList
                         width={"450px"}
                         bgColor="white"
                         py={7}
                         rounded={10}
                    >
                         <VStack width={"full"} alignItems="flex-start">
                              <VStack width={"full"}>
                                   <Avatar
                                        src="https://bit.ly/dan-abramov"
                                        size={"2xl"}
                                        mb={3}
                                   />
                                   <Heading variant={"smallHeading"}>
                                        Soko Bishu
                                   </Heading>
                              </VStack>
                              <Tab
                                   _selected={{
                                        borderLeft: "3px solid blue",
                                   }}
                                   width="full"
                                   justifyContent={"flex-start"}
                                   onClick={() =>
                                        router.push(
                                             "/account?profile",
                                             undefined,
                                             { shallow: true }
                                        )
                                   }
                              >
                                   Хувийн мэдэээлэл
                              </Tab>
                              <Tab
                                   _selected={{
                                        borderLeft: "3px solid blue",
                                   }}
                                   width="full"
                                   justifyContent={"flex-start"}
                                   onClick={() =>
                                        router.push("/account?ads", undefined, {
                                             shallow: true,
                                        })
                                   }
                              >
                                   Миний зарууд
                              </Tab>
                              <Tab
                                   _selected={{
                                        borderLeft: "3px solid blue",
                                   }}
                                   width="full"
                                   justifyContent={"flex-start"}
                                   onClick={() =>
                                        router.push(
                                             "/account?wallet",
                                             undefined,
                                             {
                                                  shallow: true,
                                             }
                                        )
                                   }
                              >
                                   Хэтэвч
                              </Tab>
                              <Flex width="full">
                                   <Button
                                        variant={"darkButton"}
                                        width="full"
                                        mx="3em"
                                   >
                                        Гарах
                                   </Button>
                              </Flex>
                         </VStack>
                    </TabList>

                    <TabPanels
                         bgColor={"white"}
                         height={"full"}
                         rounded={10}
                         p={6}
                    >
                         <TabPanel p={0}>
                              <Heading variant={"mediumHeading"}>
                                   Хувийн мэдэээлэл
                              </Heading>
                              <Grid
                                   templateColumns={"repeat(2,1fr)"}
                                   gap={5}
                                   my={3}
                              >
                                   <GridItem>
                                        <Text fontWeight={"bold"} mb={2}>
                                             Нэр
                                        </Text>
                                        <Input
                                             type={"text"}
                                             placeholder="Нэр"
                                        />
                                   </GridItem>
                                   <GridItem>
                                        <Text fontWeight={"bold"} mb={2}>
                                             Овог
                                        </Text>
                                        <Input
                                             type={"text"}
                                             placeholder="Овог"
                                        />
                                   </GridItem>
                                   <GridItem>
                                        <Text fontWeight={"bold"} mb={2}>
                                             Хүйс
                                        </Text>
                                        <Select variant="outline">
                                             <option value="option1">
                                                  Эрэгтэй
                                             </option>
                                             <option value="option2">
                                                  Эмэгтэй
                                             </option>
                                        </Select>
                                   </GridItem>
                                   <GridItem>
                                        <Text fontWeight={"bold"} mb={2}>
                                             Төрсөн өдөр
                                        </Text>

                                        <Input
                                             type={"date"}
                                             placeholder="yyyy/mm/dd"
                                        />
                                   </GridItem>
                              </Grid>
                              <Flex float={"right"}>
                                   <Button
                                        variant="blueButton"
                                        _hover={{ bgColor: "mainBlossom" }}
                                   >
                                        Мэдээлэл хадгалах
                                   </Button>
                              </Flex>
                         </TabPanel>
                         <TabPanel p={0}>
                              <Heading variant={"mediumHeading"} mb={4}>
                                   Миний зарууд
                              </Heading>
                              <Center height="full">
                                   <Text fontSize={"16px"}>
                                        Зар байхгүй байна
                                        <Box
                                             pos="relative"
                                             bgColor={"white"}
                                             borderRadius="5px"
                                             overflow={"hidden"}
                                             transition="0.3s ease"
                                             flexShrink="1"
                                             boxShadow="base"
                                             _hover={{
                                                  transform: "scale(1.05)",
                                                  boxShadow: "md",
                                                  zIndex: "10",
                                             }}
                                        >
                                             <Box>
                                                  <Box position={"relative"}>
                                                       <Link
                                                            // href={`/product/${props._id}`}
                                                            href="/"
                                                            target="_blank"
                                                       >
                                                            <AspectRatio
                                                                 ratio={5 / 4}
                                                            >
                                                                 <Image
                                                                      src={
                                                                           "/images/HeaderSlider/1.jpg"
                                                                      }
                                                                      width="70%"
                                                                 />
                                                            </AspectRatio>{" "}
                                                       </Link>
                                                       <Stack
                                                            direction={"row"}
                                                            pos={"absolute"}
                                                            bottom="5px"
                                                            right={"5px"}
                                                       >
                                                            <Tooltip label="Хадгалах">
                                                                 <IconButton
                                                                      aria-label="Bookmark"
                                                                      icon={
                                                                           <FaHeart />
                                                                      }
                                                                      _hover={{
                                                                           color: "red",
                                                                      }}
                                                                      p={1}
                                                                      onClick={() =>
                                                                           toast(
                                                                                {
                                                                                     title: "Хүсэл рүү нэмэгдлээ.",
                                                                                     status: "success",
                                                                                     duration: 9000,
                                                                                     isClosable: true,
                                                                                }
                                                                           )
                                                                      }
                                                                 />
                                                            </Tooltip>
                                                            <Tooltip label="Харьцуулах">
                                                                 <IconButton
                                                                      aria-label="Bookmark"
                                                                      icon={
                                                                           <BiGitCompare />
                                                                      }
                                                                      _hover={{
                                                                           color: "mainBlue",
                                                                      }}
                                                                 />
                                                            </Tooltip>
                                                       </Stack>
                                                  </Box>
                                                  <Stack
                                                       direction="row"
                                                       display={"flex"}
                                                       left="2%"
                                                       justifyContent={
                                                            "space-between"
                                                       }
                                                       pos="absolute"
                                                       top="2%"
                                                       width="90%"
                                                  >
                                                       <Text
                                                            bgColor={"white"}
                                                            px={2}
                                                            py={1}
                                                            borderRadius="5px"
                                                       >
                                                            Logo
                                                       </Text>
                                                       <Flex
                                                            bgColor={
                                                                 "mainBlossom"
                                                            }
                                                            px={2}
                                                            py={1}
                                                            borderRadius="5px"
                                                            color="white"
                                                            fontWeight={"bold"}
                                                            gap={1}
                                                            alignItems="center"
                                                       >
                                                            <FiCamera />
                                                            <Text>asd</Text>
                                                       </Flex>
                                                  </Stack>
                                             </Box>
                                             <Stack p={3}>
                                                  <Heading
                                                       variant={"smallHeading"}
                                                       flexWrap="nowrap"
                                                  >
                                                       adsa
                                                  </Heading>
                                                  <Text>asd</Text>
                                                  <Stack
                                                       direction={"row"}
                                                       gap={2}
                                                       justifyContent="space-around"
                                                  >
                                                       <Flex
                                                            alignItems={
                                                                 "center"
                                                            }
                                                            gap={1}
                                                       >
                                                            <BiDoorOpen className="info__icon" />
                                                            <Heading
                                                                 variant={
                                                                      "smallHeading"
                                                                 }
                                                                 fontWeight="normal"
                                                            >
                                                                 {/* {tlc(p.value) == 'байхгүй' ? 0 : p.value} */}
                                                                 asd
                                                            </Heading>
                                                       </Flex>

                                                       <Flex
                                                            alignItems={
                                                                 "center"
                                                            }
                                                            gap={1}
                                                       >
                                                            <IoBedOutline className="info__icon" />
                                                            <Heading
                                                                 variant={
                                                                      "smallHeading"
                                                                 }
                                                                 fontWeight="normal"
                                                            >
                                                                 {/* {tlc(p.value) == 'байхгүй' ? 0 : p.value} */}
                                                                 asd
                                                            </Heading>
                                                       </Flex>

                                                       <Flex
                                                            alignItems={
                                                                 "center"
                                                            }
                                                            gap={1}
                                                       >
                                                            <TbBath className="info__icon" />
                                                            <Heading
                                                                 variant={
                                                                      "smallHeading"
                                                                 }
                                                                 fontWeight="normal"
                                                            >
                                                                 {/* {tlc(p.value) == 'байхгүй' ? 0 : p.value} */}
                                                                 asd
                                                            </Heading>
                                                       </Flex>

                                                       <Flex
                                                            alignItems={
                                                                 "center"
                                                            }
                                                            gap={1}
                                                       >
                                                            <BiArea className="info__icon" />
                                                            <Heading
                                                                 variant={
                                                                      "smallHeading"
                                                                 }
                                                                 fontWeight="normal"
                                                            >
                                                                 123 м.кв
                                                            </Heading>
                                                       </Flex>
                                                  </Stack>
                                                  {/* <Grid
               templateColumns={{
                    base: "repeat(4,1fr)",
                    // lg: "repeat(4,2fr)",
               }}
               gap={2}
          >
               <GridItem>
                    <Flex alignItems={"center"} gap={1}>
                         <BiDoorOpen className="info__icon" />
                         <Text variant={"smallHeading"}>5</Text>
                    </Flex>
               </GridItem>
               <GridItem>
                    <Flex alignItems={"center"} gap={1}>
                         <IoBedOutline className="info__icon" />
                         <Text variant={"smallHeading"}>3</Text>
                    </Flex>
               </GridItem>
               <GridItem>
                    <Flex alignItems={"center"} gap={1}>
                         <TbBath className="info__icon" />
                         <Text variant={"smallHeading"}>2</Text>
                    </Flex>
               </GridItem>
               <GridItem>
                    <Flex alignItems={"center"} gap={1}>
                         <BiArea className="info__icon" />
                         <Text variant={"smallHeading"}>5м.кв</Text>
                    </Flex>
               </GridItem>
          </Grid> */}
                                                  <Heading
                                                       variant={"smallHeading"}
                                                  >
                                                       asd
                                                  </Heading>
                                             </Stack>
                                        </Box>
                                   </Text>
                              </Center>

                              {/* <Grid templateColumns={"repeat(5,1fr)"}>
                  <GridItem>
                      asd
                  </GridItem>
               </Grid> */}
                         </TabPanel>
                         <TabPanel p={0}>
                              <Heading variant={"mediumHeading"}>
                                   Хэтэвч
                              </Heading>
                         </TabPanel>
                    </TabPanels>
               </Tabs>
          </MainContainer>
     );
};

export default Profile;
