import {
     Avatar,
     Button,
     Flex,
     Grid,
     GridItem,
     Heading,
     Input,
     Select,
     Stack,
     Text,
     VStack,
} from "@chakra-ui/react";

const Profile = () => {
     return (
          <>
               <Stack
                    direction={"row"}
                    alignItems="center"
                    p="20px"
                    bgColor="white"
               >
                    <Avatar src="https://bit.ly/dan-abramov" size="xl" />
                    <Stack
                         alignItems={{
                              base: "flex-start",
                              md: "center",
                         }}
                         ml={2}
                    >
                         <Heading variant={"smallHeading"}>Soko Bishu</Heading>
                         <Text color={"grey"}>Email@email.com</Text>
                    </Stack>
               </Stack>
               <VStack display="block" m="10px" p="20px" bgColor="white">
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
                    <Flex>
                         <Button variant={"blueButton"} mt="30px" width="100%">
                              Мэдээлэл хадгалах
                         </Button>
                    </Flex>
               </VStack>{" "}
          </>
     );
};

export default Profile;
