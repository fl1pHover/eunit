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
const CompareItem = () => {
     return (
          <Box
               // boxShadow="md"
               minWidth="300px"
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
                         Lorem ipsum dolor sit amet consectetur adipisicing
                         elit. Distinctio, nesciunt? Magnam consectetur
                         adipisicing elit. Distinctio, nesciunt? Magnam
                    </Heading>
               </Link>
               <Divider my={3} />
               <Heading variant={"smallHeading"}>$100,000</Heading>
               <Divider my={3} />

               <Text overflowY={"scroll"} height="120px" pr="10px">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dicta, unde. Excepturi in maiores possimus soluta aliquid
                    corrupti voluptates accusamus consequatur. Itaque
               </Text>

               <Divider my={3} />
               {compareTitle.map(({ ...props }, index) => {
                    return (
                         <Heading variant={"smallHeading"} key={index}>
                              {props.title}
                              <Divider my={3} />
                         </Heading>
                    );
               })}
          </Box>
     );
};

const Compare = () => {
     return (
          <Box as="section" id="compare" rounded={10}>
               <Container maxW={{ base: "100%", xl: "85%" }} p={0}>
                    <Box
                         bgColor={"white"}
                         m={3}
                         rounded={10}
                         py={6}
                         px={3}
                         boxShadow="base"
                    >
                         <Center>
                              <Heading variant={"bigHeading"}>
                                   Харьцуулах
                              </Heading>
                         </Center>
                         <Stack
                              display={"flex"}
                              id="compare__wrapper"
                              overflow={"hidden"}
                              direction="row"
                              py={5}
                              overflowX="scroll"
                         >
                              {/* //TODO scrolable compare div */}

                              <CompareItem />
                              <CompareItem />
                              <CompareItem />
                              <CompareItem />

                              {/* </Box> */}
                         </Stack>
                    </Box>
               </Container>
          </Box>
     );
};

export default Compare;
