import {
     AspectRatio,
     Box,
     Flex,
     Heading,
     IconButton,
     Image,
     Link,
     Stack,
     Text,
     Tooltip,
     useToast,
} from "@chakra-ui/react";
import React from "react";

import { BiArea, BiDoorOpen, BiGitCompare } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";

const ProductCard = () => {
     const toast = useToast();
     return (
          <Box
               pos="relative"
               bgColor={"white"}
               borderRadius="5px"
               overflow={"hidden"}
               transition="0.3s ease"
               flexShrink="1"
               _hover={{
                    transform: "scale(1.05)",
                    boxShadow: "md",
                    zIndex: "10",
               }}
          >
               <Box>
                    <Box position={"relative"}>
                         <Link href="/product">
                              <AspectRatio ratio={5 / 4}>
                                   <Image
                                        src="./images/HeaderSlider/1.jpg"
                                        width="70%"
                                   />
                              </AspectRatio>{" "}
                         </Link>
                         <Stack
                              direction={"row"}
                              pos={"absolute"}
                              bottom="5px"
                              right={"5px"}
                         >
                              <Tooltip label="Хадгалах">
                                   <IconButton
                                        aria-label="Bookmark"
                                        icon={<FaHeart />}
                                        _hover={{
                                             color: "red",
                                        }}
                                        p={1}
                                        onClick={() =>
                                             toast({
                                                  title: "Зар хадгалагдлаа.",
                                                  status: "success",
                                                  duration: 9000,
                                                  isClosable: true,
                                             })
                                        }
                                   />
                              </Tooltip>
                              <Tooltip label="Харьцуулах">
                                   <IconButton
                                        aria-label="Bookmark"
                                        icon={<BiGitCompare />}
                                        _hover={{
                                             color: "mainBlue",
                                        }}
                                   />
                              </Tooltip>
                         </Stack>
                    </Box>
                    <Stack
                         direction="row"
                         display={"flex"}
                         left="2%"
                         justifyContent={"space-between"}
                         pos="absolute"
                         top="2%"
                         width="90%"
                    >
                         <Text
                              bgColor={"white"}
                              px={2}
                              py={1}
                              borderRadius="5px"
                         >
                              Logo
                         </Text>
                         <Flex
                              bgColor={"mainBlossom"}
                              px={2}
                              py={1}
                              borderRadius="5px"
                              color="white"
                              fontWeight={"bold"}
                              gap={1}
                              alignItems="center"
                         >
                              <FiCamera />
                              <Text>5</Text>
                         </Flex>
                    </Stack>
               </Box>
               <Stack p={3}>
                    <Heading variant={"smallHeading"} flexWrap="nowrap">
                         Рокмон бюлдинг оффис
                    </Heading>
                    <Text>Баруун 4-н зам</Text>
                    <Stack
                         direction={"row"}
                         gap={2}
                         justifyContent="space-around"
                    >
                         <Flex alignItems={"center"} gap={1}>
                              <BiDoorOpen className="info__icon" />
                              <Text variant={"smallHeading"}>5</Text>
                         </Flex>
                         <Flex alignItems={"center"} gap={1}>
                              <IoBedOutline className="info__icon" />
                              <Text variant={"smallHeading"}>3</Text>
                         </Flex>
                         <Flex alignItems={"center"} gap={1}>
                              <TbBath className="info__icon" />
                              <Text variant={"smallHeading"}>2</Text>
                         </Flex>
                         <Flex alignItems={"center"} gap={1}>
                              <BiArea className="info__icon" />
                              <Text variant={"smallHeading"}>5м.кв</Text>
                         </Flex>
                    </Stack>
                    <Heading variant={"smallHeading"}>15,000,000.00</Heading>
               </Stack>
          </Box>
     );
};

export default ProductCard;
