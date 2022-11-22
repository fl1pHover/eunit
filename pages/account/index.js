import {
     Avatar,
     Box,
     Button,
     Center,
     Heading,
     Stack,
     Tab,
     TabList,
     TabPanels,
     Tabs,
     Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

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

const Account = () => {
     return (
          <MainContainer>
               <Tabs
                    display={"flex"}
                    flexDirection={{ base: "column", md: "row" }}
                    my={{ base: 5, md: 10 }}
                    gap={5}
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
                                             Soko Bishu
                                        </Heading>
                                        <Text color={"grey"}>
                                             Email@email.com
                                        </Text>
                                   </Stack>
                              </Stack>
                              <Box display={{ base: "block", md: "none" }}>
                                   <Button rightIcon={<FiLogOut />}>
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
                              <Button width={"60%"}>Гарах</Button>
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
          </MainContainer>
     );
};

export default Account;
