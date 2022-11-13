import {
     Box,
     Grid,
     GridItem,
     Heading,
     Link,
     Stack,
     Text,
} from "@chakra-ui/react";
import React from "react";

import MainContainer from "../../layout/mainContainer";

import { categories } from "../../data/categories";

const CategorySelect = () => {
     return (
          <Box py={"50px"}>
               <MainContainer>
                    <Grid
                         templateColumns={{
                              base: "repeat(2,1fr)",
                              sm: "repeat(3,1fr)",
                              lg: "repeat(6,1fr)",
                         }}
                         gap={5}
                    >
                         {categories.map(({ ...props }, index) => {
                              return (
                                   <Link
                                        key={index}
                                        href={`/category/${props.id}`}
                                   >
                                        <GridItem
                                             bgColor="white"
                                             py={8}
                                             rounded={20}
                                             boxShadow="md"
                                             transition={"0.3s ease"}
                                             _hover={{
                                                  boxShadow: "xl",
                                             }}
                                             textAlign={"center"}
                                             backgroundImage={props.image}
                                             backgroundPosition={"center"}
                                             backgroundSize="cover"
                                             className="card"
                                             overflow={"hidden"}
                                        >
                                             <Stack
                                                  key={index}
                                                  display={"flex"}
                                                  alignItems={"center"}
                                                  height="100%"
                                                  position={"relative"}
                                                  zIndex={"2"}
                                                  color="white"
                                             >
                                                  {/* <AspectRatio
                                                       width="80%"
                                                       ratio={1 / 1}
                                                  >
                                                       <Image
                                                            src={props.image}
                                                            width="70%"
                                                            borderRadius={"50%"}
                                                       />
                                                  </AspectRatio> */}
                                                  {/* <AiOutlineCar
                                                       fontSize={"50px"}
                                                  /> */}
                                                  <Text fontSize={"50px"}>
                                                       {props.icon}
                                                  </Text>
                                                  <Stack
                                                       mt={"15px !important"}
                                                       direction="column"
                                                       justifyContent={
                                                            "space-between"
                                                       }
                                                       height={"100%"}
                                                  >
                                                       <Heading
                                                            variant={
                                                                 "smallHeading"
                                                            }
                                                            height="40px"
                                                       >
                                                            {props.categoryName}
                                                       </Heading>
                                                  </Stack>
                                             </Stack>
                                        </GridItem>
                                   </Link>
                              );
                         })}
                    </Grid>
               </MainContainer>
          </Box>
     );
};

export default CategorySelect;
