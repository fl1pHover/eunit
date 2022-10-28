import {
     Avatar,
     Button,
     Grid,
     GridItem,
     Heading,
     Input,
     Select,
     Tab,
     TabList,
     TabPanel,
     TabPanels,
     Tabs,
     Text,
     VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
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
                              <Button>Гарах</Button>
                         </VStack>
                    </TabList>

                    <TabPanels
                         bgColor={"white"}
                         width="full"
                         rounded={10}
                         px={3}
                    >
                         <TabPanel>
                              <Heading variant={"mediumHeading"}>
                                   Хувийн мэдэээлэл
                              </Heading>
                              <Grid
                                   templateColumns={"repeat(2,1fr)"}
                                   gap={5}
                                   mt={5}
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
                         </TabPanel>
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
