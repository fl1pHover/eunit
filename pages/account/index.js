import {
     Avatar,
     Button,
     Heading,
     Tab,
     TabList,
     TabPanel,
     TabPanels,
     Tabs,
     VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import MainContainer from "../../layout/mainContainer";
import Personal from "./personal";

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
                              <Button>Гарах</Button>
                         </VStack>
                    </TabList>

                    <TabPanels
                         bgColor={"white"}
                         width="full"
                         rounded={10}
                         px={3}
                    >
                         <Personal />
                         <TabPanel>
                              <Heading variant={"mediumHeading"}>
                                   Миний зарууд
                              </Heading>
                         </TabPanel>
                         <TabPanel>
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
