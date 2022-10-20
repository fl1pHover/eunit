import {
     Divider,
     Flex,
     Grid,
     GridItem,
     Heading,
     Input,
     Stack,
} from "@chakra-ui/react";
import React from "react";

const EstInput = (type) => {
     return <Input type={type} width="150px" boxShadow={"inner"} />;
};

function Estimator() {
     const [value, setValue] = React.useState(0);
     const handleChange = (value) => setValue(value);

     return (
          <Stack
               bgColor={"white"}
               p={10}
               direction={"column"}
               mt={10}
               gap={3}
               boxShadow="base"
               rounded={10}
          >
               <Flex justifyContent={"space-between"}>
                    <Heading
                         variant={"mediumHeading"}
                         textTransform="uppercase"
                    >
                         Зээлийн тооцоолуур
                    </Heading>
                    <Heading variant={"smallHeading"}>
                         Тооцоог дэлгэрэнгүй харах
                    </Heading>
               </Flex>
               <Divider />
               <Grid
                    templateColumns={{
                         base: "repeat(1,1fr)",
                         lg: "repeat(2,1fr)",
                    }}
                    gap={{ base: 3, lg: 10 }}
               >
                    <GridItem>
                         <Flex
                              justifyContent={"space-between"}
                              alignItems="center"
                         >
                              <Heading variant={"smallHeading"}>
                                   Орон сууцны үнэ
                              </Heading>
                              <EstInput type={"number"} />
                         </Flex>
                         <Flex
                              justifyContent={"space-between"}
                              alignItems="center"
                              my={"10px"}
                         >
                              <Heading variant={"smallHeading"}>
                                   Зээлийн хэмжээ
                              </Heading>
                              <EstInput type={"number"} required />
                         </Flex>
                         <Flex
                              justifyContent={"space-between"}
                              alignItems="center"
                         >
                              <Heading variant={"smallHeading"}>
                                   Зээлийн хэмжээ(жилээр)
                              </Heading>
                              <EstInput type={"number"} />
                         </Flex>
                    </GridItem>
                    <GridItem>
                         <Flex
                              justifyContent={"space-between"}
                              alignItems="center"
                         >
                              <Heading variant={"smallHeading"}>
                                   Урьдчилгаа төлбөр
                              </Heading>
                              <EstInput type={"number"} />
                         </Flex>
                         <Flex
                              justifyContent={"space-between"}
                              alignItems="center"
                              my={"10px"}
                         >
                              <Heading variant={"smallHeading"}>
                                   Зээлийн хугацаа
                              </Heading>
                              <EstInput type={"number"} />
                         </Flex>
                         <Flex
                              justifyContent={"space-between"}
                              alignItems="center"
                              my={"10px"}
                         >
                              <Heading variant={"smallHeading"}>
                                   Зээлийн сарын төлбөр
                              </Heading>
                              <EstInput type={"number"} />
                         </Flex>
                         <Flex
                              justifyContent={"space-between"}
                              alignItems="center"
                              mt={"30px"}
                         >
                              <Heading variant={"smallHeading"}>
                                   Нийт төлөгдөх хэмжээ
                              </Heading>
                              <Heading
                                   variant={"mediumHeading"}
                                   color="mainBlossom"
                              >
                                   $500,000
                              </Heading>
                         </Flex>
                    </GridItem>
               </Grid>
               {/* <Center>
                    <Stack direction={"row"}>
                         <Box>
                              <Heading
                                   variant={"mediumHeading"}
                                   color="mainBlossom"
                              >
                                   $500,000
                              </Heading>
                              <Heading variant={"smallHeading"}>
                                   Нийт төлөгдөх хэмжээ
                              </Heading>
                         </Box>
                    </Stack>
               </Center> */}
          </Stack>
     );
}

export default Estimator;
