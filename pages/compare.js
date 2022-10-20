import {
     Box,
     Center,
     Container,
     Divider,
     Heading,
     Image,
     Link,
     Stack,
     Text,
} from "@chakra-ui/react";
import React from "react";

const compareTitle = [
     {
          title: "Талбай",
     },
     {
          title: "Нэгж талбайн үнэ",
     },
     {
          title: "Дүүрэг",
     },
     {
          title: "Хороо",
     },
     {
          title: "Хотхон",
     },
     {
          title: "Ашиглалтад орсон он",
     },
     {
          title: "Барилгын давхар",
     },
     {
          title: "Хэдэн давхар",
     },
     {
          title: "Өрөө",
     },
     {
          title: "Угаалгын өрөө",
     },
     {
          title: "Мас/унтлагын өрөө",
     },
     {
          title: "Цонх",
     },
     {
          title: "Цонхны тоо",
     },
     {
          title: "Хаалга",
     },
     {
          title: "Шал",
     },
     {
          title: "Гараж",
     },
     {
          title: "Бартер",
     },
     {
          title: "Төлбөрийн нөхцөл",
     },
];

const Compare = () => {
     return (
          <Box as="section" id="compare">
               <Container maxW={{ base: "100%", xl: "70%" }} p={0}>
                    <Box bgColor={"white"} m={3} rounded={4} py={5}>
                         <Center>
                              <Heading variant={"bigHeading"}>
                                   Харьцуулах
                              </Heading>
                         </Center>
                         <Stack direction="row" py={5}>
                              <Box width={"300px"} p={3}>
                                   <Box height={"150px"} mb={4} />
                                   <Heading
                                        variant={"smallHeading"}
                                        height={"100px"}
                                   >
                                        Зарын гарчиг
                                   </Heading>
                                   <Divider my={3} />
                                   <Heading variant={"smallHeading"}>
                                        Үнэ
                                   </Heading>
                                   <Divider my={3} />
                                   <Heading
                                        variant={"smallHeading"}
                                        height="120px"
                                   >
                                        Тайлбар
                                   </Heading>
                                   <Divider my={3} />
                                   {compareTitle.map(({ ...props }, index) => {
                                        return (
                                             <Heading
                                                  variant={"smallHeading"}
                                                  key={index}
                                             >
                                                  {props.title}
                                                  <Divider my={3} />
                                             </Heading>
                                        );
                                   })}
                              </Box>

                              {/* //TODO scrolable compare div */}
                              <Box
                                   direction="row"
                                   display={"block ruby"}
                                   overflowX="scroll"
                                   // flexWrap={""}
                                   pb={"50px"}
                              >
                                   <Box
                                        // boxShadow="md"
                                        width="300px"
                                        height={"500px"}
                                        p={3}
                                   >
                                        <Link href="/">
                                             <Image
                                                  src="./images/HeaderSlider/1.jpg"
                                                  alt="Image"
                                                  mb={4}
                                                  height="150px"
                                                  rounded={6}
                                             />
                                             <Heading
                                                  variant={"smallHeading"}
                                                  height={"100px"}
                                                  overflowY={"scroll"}
                                                  pr="10px"
                                             >
                                                  Lorem ipsum dolor sit amet
                                                  consectetur adipisicing elit.
                                                  Distinctio, nesciunt? Magnam
                                                  consectetur adipisicing elit.
                                                  Distinctio, nesciunt? Magnam
                                             </Heading>
                                        </Link>
                                        <Divider my={3} />
                                        <Heading variant={"smallHeading"}>
                                             $100,000
                                        </Heading>
                                        <Divider my={3} />

                                        <Text
                                             overflowY={"scroll"}
                                             height="120px"
                                             pr="10px"
                                        >
                                             Lorem ipsum, dolor sit amet
                                             consectetur adipisicing elit.
                                             Dicta, unde. Excepturi in maiores
                                             possimus soluta aliquid corrupti
                                             voluptates accusamus consequatur.
                                             Itaque
                                        </Text>

                                        <Divider my={3} />
                                        {compareTitle.map(
                                             ({ ...props }, index) => {
                                                  return (
                                                       <Heading
                                                            variant={
                                                                 "smallHeading"
                                                            }
                                                            key={index}
                                                       >
                                                            {props.title}
                                                            <Divider my={3} />
                                                       </Heading>
                                                  );
                                             }
                                        )}
                                   </Box>
                                   <Box
                                        // boxShadow="md"
                                        maxWidth="300px"
                                        height={"500px"}
                                        p={3}
                                   >
                                        <Link href="/">
                                             <Image
                                                  src="./images/HeaderSlider/1.jpg"
                                                  alt="Image"
                                                  mb={4}
                                                  height="150px"
                                                  rounded={6}
                                             />
                                             <Heading
                                                  variant={"smallHeading"}
                                                  height={"100px"}
                                                  overflowY={"scroll"}
                                                  pr="10px"
                                             >
                                                  Lorem ipsum dolor sit amet
                                                  consectetur adipisicing elit.
                                                  Distinctio, nesciunt? Magnam
                                                  consectetur adipisicing elit.
                                                  Distinctio, nesciunt? Magnam
                                             </Heading>
                                        </Link>
                                        <Divider my={3} />
                                        <Heading variant={"smallHeading"}>
                                             $100,000
                                        </Heading>
                                        <Divider my={3} />

                                        <Text
                                             overflowY={"scroll"}
                                             height="120px"
                                             pr="10px"
                                        >
                                             Lorem ipsum, dolor sit amet
                                             consectetur adipisicing elit.
                                             Dicta, unde. Excepturi in maiores
                                             possimus soluta aliquid corrupti
                                             voluptates accusamus consequatur.
                                             Itaque
                                        </Text>

                                        <Divider my={3} />
                                        {compareTitle.map(
                                             ({ ...props }, index) => {
                                                  return (
                                                       <Heading
                                                            variant={
                                                                 "smallHeading"
                                                            }
                                                            key={index}
                                                       >
                                                            {props.title}
                                                            <Divider my={3} />
                                                       </Heading>
                                                  );
                                             }
                                        )}
                                   </Box>
                                   <Box
                                        // boxShadow="md"
                                        maxWidth="300px"
                                        height={"500px"}
                                        p={3}
                                   >
                                        <Link href="/">
                                             <Image
                                                  src="./images/HeaderSlider/1.jpg"
                                                  alt="Image"
                                                  mb={4}
                                                  height="150px"
                                                  rounded={6}
                                             />
                                             <Heading
                                                  variant={"smallHeading"}
                                                  height={"100px"}
                                                  overflowY={"scroll"}
                                                  pr="10px"
                                             >
                                                  Lorem ipsum dolor sit amet
                                                  consectetur adipisicing elit.
                                                  Distinctio, nesciunt? Magnam
                                                  consectetur adipisicing elit.
                                                  Distinctio, nesciunt? Magnam
                                             </Heading>
                                        </Link>
                                        <Divider my={3} />
                                        <Heading variant={"smallHeading"}>
                                             $100,000
                                        </Heading>
                                        <Divider my={3} />

                                        <Text
                                             overflowY={"scroll"}
                                             height="120px"
                                             pr="10px"
                                        >
                                             Lorem ipsum, dolor sit amet
                                             consectetur adipisicing elit.
                                             Dicta, unde. Excepturi in maiores
                                             possimus soluta aliquid corrupti
                                             voluptates accusamus consequatur.
                                             Itaque
                                        </Text>

                                        <Divider my={3} />
                                        {compareTitle.map(
                                             ({ ...props }, index) => {
                                                  return (
                                                       <Heading
                                                            variant={
                                                                 "smallHeading"
                                                            }
                                                            key={index}
                                                       >
                                                            {props.title}
                                                            <Divider my={3} />
                                                       </Heading>
                                                  );
                                             }
                                        )}
                                   </Box>
                                   <Box
                                        // boxShadow="md"
                                        maxWidth="300px"
                                        height={"500px"}
                                        p={3}
                                   >
                                        <Link href="/">
                                             <Image
                                                  src="./images/HeaderSlider/1.jpg"
                                                  alt="Image"
                                                  mb={4}
                                                  height="150px"
                                                  rounded={6}
                                             />
                                             <Heading
                                                  variant={"smallHeading"}
                                                  height={"100px"}
                                                  overflowY={"scroll"}
                                                  pr="10px"
                                             >
                                                  Lorem ipsum dolor sit amet
                                                  consectetur adipisicing elit.
                                                  Distinctio, nesciunt? Magnam
                                                  consectetur adipisicing elit.
                                                  Distinctio, nesciunt? Magnam
                                             </Heading>
                                        </Link>
                                        <Divider my={3} />
                                        <Heading variant={"smallHeading"}>
                                             $100,000
                                        </Heading>
                                        <Divider my={3} />
                                        <Text
                                             overflowY={"scroll"}
                                             height="120px"
                                             pr="10px"
                                        >
                                             Lorem ipsum, dolor sit amet
                                             consectetur adipisicing elit.
                                             Dicta, unde. Excepturi in maiores
                                             possimus soluta aliquid corrupti
                                             voluptates accusamus consequatur.
                                             Itaque
                                        </Text>
                                        <Divider my={3} />
                                        {compareTitle.map(
                                             ({ ...props }, index) => {
                                                  return (
                                                       <Heading
                                                            variant={
                                                                 "smallHeading"
                                                            }
                                                            key={index}
                                                       >
                                                            {props.title}
                                                            <Divider my={3} />
                                                       </Heading>
                                                  );
                                             }
                                        )}
                                   </Box>
                              </Box>
                         </Stack>
                    </Box>
               </Container>
          </Box>
     );
};

export default Compare;
