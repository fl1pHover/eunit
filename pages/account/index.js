import {
     Avatar,
     Box,
     Button,
     Center,
     Flex,
     Heading,
     Image,
     Link,
     Stack,
     Tab,
     TabList,
     TabPanels,
     Tabs,
     Text,
} from "@chakra-ui/react";
import { useAuth } from "context/auth";

import { useRouter } from "next/router";

import { AiFillCaretRight } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import MainContainer from "../../layout/mainContainer";
import MyAds from "./myAds";
import Profile from "./profile";
import Wallet from "./wallet";
const TabSelecting = ({ title, tab }) => {
     const router = useRouter();
     return (
          <Tab
               _selected={{
                    base: {
                         borderBottom: "3px solid blue",
                         bgColor: "#e2e8f0",
                    },
                    md: {
                         borderLeft: "3px solid blue ",
                         borderBottom: "none !important",
                    },
               }}
               width="full"
               justifyContent={{ base: "center", md: "flex-start" }}
               onClick={() =>
                    router.push(`/account?${tab}`, undefined, {
                         shallow: true,
                    })
               }
          >
               <Text lineHeight={1.3}>{title}</Text>
          </Tab>
     );
};

const LinkSelecting = ({ title, tab, image }) => {
     return (
          <Link href={`/account/menu/${tab}`} mt="0px !important">
               <Flex
                    px={3}
                    py={4}
                    border="#eef0f2 1px solid"
                    justifyContent="space-between"
                    alignItems="center"
               >
                    <Flex gap="15px" alignItems="center">
                         <Image
                              src={`/utils/icons/static/${image}`}
                              width="25px"
                              height="25px"
                              alt="icon"
                         />
                         <Text lineHeight={1.3}>{title}</Text>
                    </Flex>
                    <AiFillCaretRight />
               </Flex>
          </Link>
     );
};

const Account = () => {
     const {user, logout} = useAuth()
     return (
          <MainContainer>
               <Tabs
                    flexDirection={{ base: "column", md: "row" }}
                    my={{ base: 5, md: 10 }}
                    gap={5}
                    display={{ base: "none", md: "flex" }}
               >
                    <TabList
                         width={{ base: "100%", md: "450px" }}
                         height="full"
                         bgColor="white"
                         rounded={10}
                         display="flex"
                         flexDirection={"column"}
                    >
                         <Stack
                              alignItems={"center"}
                              direction={{ base: "row", md: "column" }}
                              width={"full"}
                              justifyContent="space-between"
                              p={(4, 4)}
                         >
                              <Stack direction={"inherit"} alignItems="center">
                                   <Avatar
                                        src="https://bit.ly/dan-abramov"
                                        size={{ base: "lg", md: "2xl" }}
                                   />
                                   <Stack
                                        alignItems={{
                                             base: "flex-start",
                                             md: "center",
                                        }}
                                        m={2}
                                   >
                                        <Heading variant={"smallHeading"}>
                                             {user?.username}
                                        </Heading>
                                        <Text color={"grey"}>
                                             {user?.email}
                                        </Text>
                                   </Stack>
                              </Stack>
                              <Box display={{ base: "block", md: "none" }}>
                                   <Button rightIcon={<FiLogOut />} onClick={() => logout()}>
                                        <Text>Гарах</Text>
                                   </Button>
                              </Box>
                         </Stack>
                         <Stack
                              direction={{ base: "row", md: "column" }}
                              width="full"
                         >
                              <TabSelecting
                                   tab={"profile"}
                                   title="Хувийн мэдэээлэл"
                              />

                              <TabSelecting tab={"ads"} title="Миний зарууд" />

                              <TabSelecting tab={"wallet"} title="Хэтэвч" />
                         </Stack>
                         <Center
                              width={"full"}
                              display={{ base: "none", md: "flex" }}
                              my={3}
                         >
                              <Button width={"60%"} onClick={() => logout()}>Гарах</Button>
                         </Center>
                    </TabList>

                    <TabPanels
                         bgColor={"white"}
                         width="full"
                         height={"full"}
                         rounded={10}
                         px={2}
                    >
                         <Profile />
                         <MyAds />
                         <Wallet />
                    </TabPanels>
               </Tabs>
               <Stack
                    direction={"column"}
                    display={{ base: "flex", md: "none" }}
               >
                    <Stack direction={"column"} alignItems="center" my={8}>
                         <Avatar
                              src="https://bit.ly/dan-abramov"
                              size={{ base: "xl", md: "2xl" }}
                         />
                         <Stack
                              alignItems={{
                                   base: "flex-start",
                                   md: "center",
                              }}
                              m={2}
                         >
                              <Heading variant={"smallHeading"}>
                                   Soko Bishu
                              </Heading>
                              <Text color={"grey"}>Email@email.com</Text>
                         </Stack>
                    </Stack>
                    <Stack direction="column" bgColor="white" gap={0}>
                         <LinkSelecting
                              tab="wallet"
                              title="Хэвэтч"
                              image="wallet.png"
                         />
                         <LinkSelecting
                              tab="bookmark"
                              title="Хүсэл"
                              image="heart.png"
                         />
                         <LinkSelecting
                              tab="profile"
                              title="Хувийн мэдээлэл"
                              image="account.png"
                         />
                         <LinkSelecting
                              tab="myads"
                              title="Миний зарууд"
                              image="ads.png"
                         />
                         <LinkSelecting
                              tab="feedback"
                              title="Тусламж"
                              image="help.png"
                         />

                         <Box
                              height="100px"
                              bgColor="bgGrey"
                              mt="0px !important"
                         />
                         <LinkSelecting
                              tab="leave"
                              title="Гарах"
                              image="logout.png"
                         />
                    </Stack>{" "}
               </Stack>
          </MainContainer>
     );
};

export default Account;
