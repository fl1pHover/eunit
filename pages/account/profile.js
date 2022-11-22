import {
     Button,
     Flex,
     Grid,
     GridItem,
     Heading,
     Input,
     Select,
     TabPanel,
     Text,
} from "@chakra-ui/react";

const Profile = () => {
     return (
          <>
               <TabPanel>
                    <Heading variant={"mediumHeading"}>
                         Хувийн мэдэээлэл
                    </Heading>
                    <Grid
                         templateColumns={{
                              base: "repeat(1,1fr)",
                              md: "repeat(2,1fr)",
                         }}
                         gap={{ base: 2, md: 5 }}
                         mt={5}
                    >
                         <GridItem>
                              <Text fontWeight={"bold"} mb={2}>
                                   Нэр
                              </Text>
                              <Input type={"text"} placeholder="Нэр" />
                         </GridItem>
                         <GridItem>
                              <Text fontWeight={"bold"} mb={2}>
                                   Овог
                              </Text>
                              <Input type={"text"} placeholder="Овог" />
                         </GridItem>
                         <GridItem>
                              <Text fontWeight={"bold"} mb={2}>
                                   Хүйс
                              </Text>
                              <Select variant="outline">
                                   <option value="option1">Эрэгтэй</option>
                                   <option value="option2">Эмэгтэй</option>
                              </Select>
                         </GridItem>
                         <GridItem>
                              <Text fontWeight={"bold"} mb={2}>
                                   Төрсөн өдөр
                              </Text>

                              <Input type={"date"} placeholder="yyyy/mm/dd" />
                         </GridItem>
                    </Grid>
                    <Flex float={"right"} my={5}>
                         <Button variant={"blueButton"}>
                              Мэдээлэл хадгалах
                         </Button>
                    </Flex>
               </TabPanel>
          </>
     );
};

export default Profile;
