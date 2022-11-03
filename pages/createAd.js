import {
     Box,
     Button,
     Center,
     Code,
     Divider,
     Flex,
     Grid,
     GridItem,
     Heading,
     HStack,
     IconButton,
     Image,
     Input,
     Select,
     Text,
     Textarea,
     useToast,
     VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

import { MdDeleteForever } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";

import MainContainer from "../layout/mainContainer";

const types = ["Зарах"];

export default function CreateAd() {
     const [type, setType] = useState("");
     const [category, setCategory] = useState("");
     const [subCategory, setSubCategory] = useState("");
     const [select, setSelect] = useState({
          category: "",
          subCategory: "",
          type: "",
          title: "",
          description: "",
          location: "",
          position: "",
     });
     const [filters, setFilters] = useState([]);
     const getData = async () => {
          if (category == "") {
               try {
                    await fetch("https://bom-location.herokuapp.com/category")
                         .then((d) => d.json())
                         .then((r) => setCategory(r));
               } catch (err) {
                    console.log(err);
               }
          }
          if (category != "" && select.category != "") {
               try {
                    await fetch(
                         `https://bom-location.herokuapp.com/category/${select.category}`
                    )
                         .then((r) => r.json())
                         .then((d) => setSubCategory(d));
               } catch (error) {
                    console.log(error);
               }
          }
     };
     const createAd = async () => {
          try {
               await axios.post("https://bom-location.herokuapp.com/ad", {
                    title: select.title,
                    description: select.description,
                    location: select.location,
                    filters: filters.map((f) => {
                         return { id: f.id, value: f.value };
                    }),
                    subCategory: subCategory[select.subCategory]._id,
                    positions: ["635e91cf1c1c755b91c2e09f"],
               });
          } catch (error) {}
     };
     const capitalizeFirst = (str) => {
          return str.charAt(0).toUpperCase() + str.slice(1);
     };

     useEffect(() => {
          getData();
     }, [select]);

     // image preview
     const [selectedImages, setSelectedImages] = useState([]);

     const onSelectFile = (event) => {
          const selectedFiles = event.target.files;
          const selectedFilesArray = Array.from(selectedFiles);

          const imagesArray = selectedFilesArray.map((file) => {
               return URL.createObjectURL(file);
          });

          setSelectedImages((previousImages) =>
               previousImages.concat(imagesArray)
          );

          // FOR BUG IN CHROME
          event.target.value = "";
     };

     function deleteHandler(image) {
          setSelectedImages(selectedImages.filter((e) => e !== image));
          URL.revokeObjectURL(image);
     }

     const toast = useToast();
     return (
          <Box as="section" m={5} id="add__ad">
               <MainContainer>
                    <Box bgColor={"white"} px={10} py={5} rounded={10}>
                         <Center>
                              <Heading variant={"bigHeading"}>
                                   Зар оруулах хэсэг
                              </Heading>
                         </Center>
                         <Code mt={10} textAlign="center">
                              Зар оруулах дараагийн хэсэг дараах сонголтыг
                              сонгосны дараа гарч ирнэ.
                         </Code>
                         <Box
                              display={"grid"}
                              gridTemplateColumns={"repeat(3,1fr)"}
                              gap={10}
                              mt={4}
                         >
                              <HStack>
                                   <Text width={"100%"}>
                                        Зарах хөрөнгийн төрөл
                                   </Text>
                                   <Select
                                        placeholder="Сонгох"
                                        onChange={(e) =>
                                             setSelect((select) => ({
                                                  ...select,
                                                  category: e.target.value,
                                             }))
                                        }
                                        value={select.category}
                                   >
                                        {category.length > 0 &&
                                             category.map((c, i) => {
                                                  return (
                                                       <option
                                                            value={`${c._id}`}
                                                            key={i}
                                                       >
                                                            {capitalizeFirst(
                                                                 c.name
                                                            )}
                                                       </option>
                                                  );
                                             })}
                                   </Select>
                              </HStack>
                              {subCategory != "" && (
                                   <HStack>
                                        <Text width={"100%"}>Дэд төрөл</Text>
                                        <Select
                                             placeholder="Сонгох"
                                             onChange={(e) =>
                                                  setSelect((select) => ({
                                                       ...select,
                                                       subCategory:
                                                            e.target.value,
                                                  }))
                                             }
                                             value={select.subCategory}
                                        >
                                             {subCategory.length > 0 &&
                                                  subCategory.map((t, i) => {
                                                       return (
                                                            <option
                                                                 value={i}
                                                                 key={i}
                                                            >
                                                                 {capitalizeFirst(
                                                                      t.name
                                                                 )}
                                                            </option>
                                                       );
                                                  })}
                                        </Select>
                                   </HStack>
                              )}
                              {subCategory.length > 0 && select.subCategory && (
                                   <HStack>
                                        <Text width={"100%"}>
                                             Борлуулах төрөл
                                        </Text>
                                        <Select
                                             placeholder="Сонгох"
                                             onChange={(e) =>
                                                  setSelect((select) => ({
                                                       ...select,
                                                       type: e.target.value,
                                                  }))
                                             }
                                             value={select.type}
                                        >
                                             {subCategory[select.subCategory]
                                                  .types &&
                                                  subCategory[
                                                       select.subCategory
                                                  ].types.map((t, i) => {
                                                       return (
                                                            <option
                                                                 value={i}
                                                                 key={i}
                                                            >
                                                                 {capitalizeFirst(
                                                                      t.name
                                                                 )}
                                                            </option>
                                                       );
                                                  })}
                                        </Select>
                                   </HStack>
                              )}
                         </Box>
                         <VStack gap={5} mt={10}>
                              {select.type != "" && subCategory != "" && (
                                   <>
                                        <Textarea
                                             placeholder={"Гарчиг"}
                                             type="textarea"
                                             height="100px"
                                             whiteSpace={"nowrap"}
                                             onChange={(e) =>
                                                  setSelect((select) => ({
                                                       ...select,
                                                       title: e.target.value,
                                                  }))
                                             }
                                             value={select.title}
                                        />
                                        <Textarea
                                             placeholder={"Дэлгэрэнгүй"}
                                             type="textarea"
                                             height="100px"
                                             whiteSpace={"nowrap"}
                                             value={select.description}
                                             onChange={(e) =>
                                                  setSelect((select) => ({
                                                       ...select,
                                                       description:
                                                            e.target.value,
                                                  }))
                                             }
                                        />
                                        <Input
                                             placeholder={"Хаяг"}
                                             value={select.location}
                                             onChange={(e) =>
                                                  setSelect((select) => ({
                                                       ...select,
                                                       location: e.target.value,
                                                  }))
                                             }
                                        />
                                        <Grid
                                             templateColumns={"repeat(3,1fr)"}
                                             width="full"
                                             rowGap={5}
                                             columnGap={6}
                                        >
                                             {subCategory.length > 0 &&
                                                  subCategory[
                                                       select.subCategory
                                                  ] &&
                                                  subCategory[
                                                       select.subCategory
                                                  ].filters &&
                                                  subCategory[
                                                       select.subCategory
                                                  ].filters.map((s, i) => {
                                                       // console.log(filters)
                                                       // console.log(s)

                                                       return (
                                                            <GridItem key={i}>
                                                                 <Select
                                                                      placeholder={
                                                                           s.name
                                                                      }
                                                                      value={
                                                                           filters[
                                                                                i
                                                                           ]
                                                                                ? filters[
                                                                                       i
                                                                                  ]
                                                                                       .value
                                                                                : ""
                                                                      }
                                                                      onChange={(
                                                                           e
                                                                      ) =>
                                                                           setFilters(
                                                                                (
                                                                                     filters
                                                                                ) => [
                                                                                     ...filters,
                                                                                     {
                                                                                          value: e
                                                                                               .target
                                                                                               .value,
                                                                                          key: i,
                                                                                          id: s._id,
                                                                                     },
                                                                                ]
                                                                           )
                                                                      }
                                                                 >
                                                                      {s.choices &&
                                                                           s.choices.map(
                                                                                (
                                                                                     s,
                                                                                     i
                                                                                ) => {
                                                                                     return (
                                                                                          <option
                                                                                               value={
                                                                                                    s
                                                                                               }
                                                                                               key={
                                                                                                    i
                                                                                               }
                                                                                          >
                                                                                               {
                                                                                                    s
                                                                                               }
                                                                                          </option>
                                                                                     );
                                                                                }
                                                                           )}
                                                                 </Select>
                                                            </GridItem>
                                                       );
                                                  })}
                                        </Grid>
                                        <Grid
                                             id="upload__image"
                                             templateColumns={{
                                                  base: "repeat(1,1fr)",
                                                  lg: "repeat(4,1fr)",
                                             }}
                                             gap={3}
                                             rounded={10}
                                             width="100%"
                                             height={{
                                                  base: "400px",
                                                  base: "300px",
                                                  lg: "250px",
                                             }}
                                             border={"1px dashed grey"}
                                        >
                                             <GridItem
                                                  colSpan={{ base: 4, lg: 1 }}
                                                  height="100%"
                                                  width={"100%"}
                                                  position={"relative"}
                                                  bgColor={"bgGrey"}
                                                  _hover={{
                                                       Button: {
                                                            bgColor: "mainBlossom",
                                                       },
                                                  }}
                                             >
                                                  <Input
                                                       type={"file"}
                                                       height="100%"
                                                       width={"100%"}
                                                       accept="image/png, image/jpg, image/jpeg"
                                                       borderStyle={"dashed"}
                                                       multiple
                                                       opacity="0"
                                                       cursor="pointer"
                                                       zIndex="10"
                                                       onChange={onSelectFile}
                                                  />

                                                  <Flex
                                                       position={"absolute"}
                                                       direction={{
                                                            base: "row",
                                                            lg: "column",
                                                       }}
                                                       gap={{
                                                            base: 4,
                                                            lg: 0,
                                                       }}
                                                       top="50%"
                                                       left={"50%"}
                                                       transform="translate(-50%,-50%)"
                                                       textAlign={"center"}
                                                       zIndex="9"
                                                       justifyContent={"center"}
                                                       alignItems={"center"}
                                                  >
                                                       <RiImageAddLine
                                                            fontSize={"5em"}
                                                            display="none !important"
                                                       />
                                                       <Heading
                                                            variant={
                                                                 "smallHeading"
                                                            }
                                                       ></Heading>
                                                       <Button
                                                            variant={
                                                                 "blueButton"
                                                            }
                                                            mt={5}
                                                       >
                                                            План зураг нэмэх
                                                       </Button>
                                                       <Text
                                                            mt={1}
                                                            display={{
                                                                 base: "none",
                                                                 lg: "block",
                                                            }}
                                                       >
                                                            эсвэл зургийг
                                                            буулгах
                                                       </Text>
                                                  </Flex>
                                             </GridItem>
                                             <GridItem
                                                  colSpan={3}
                                                  display={"flex"}
                                                  flexDirection="row"
                                                  height={"100%"}
                                                  flexWrap={"wrap"}
                                                  gap={{ base: 1, md: 3 }}
                                                  alignItems="center"
                                                  justifyContent={"center"}
                                             >
                                                  {selectedImages &&
                                                       selectedImages.map(
                                                            (image, index) => {
                                                                 return (
                                                                      <Box
                                                                           position={
                                                                                "relative"
                                                                           }
                                                                           key={
                                                                                image
                                                                           }
                                                                           className="image"
                                                                           width={{
                                                                                base: "50px",
                                                                                md: "75px",
                                                                                lg: "100px",
                                                                           }}
                                                                           height={{
                                                                                base: "50px",
                                                                                md: "75px",
                                                                                lg: "100px",
                                                                           }}
                                                                           p={1}
                                                                           border="2px solid"
                                                                           borderColor={
                                                                                "bgGrey"
                                                                           }
                                                                      >
                                                                           <Image
                                                                                src={
                                                                                     image
                                                                                }
                                                                                height="100%"
                                                                                width={
                                                                                     "100%"
                                                                                }
                                                                                alt="upload"
                                                                                objectFit="cover"
                                                                           />
                                                                           <IconButton
                                                                                position={
                                                                                     "absolute"
                                                                                }
                                                                                top="-5px"
                                                                                right="-5px"
                                                                                colorScheme="red"
                                                                                size="xs"
                                                                                icon={
                                                                                     <MdDeleteForever />
                                                                                }
                                                                                p={
                                                                                     2
                                                                                }
                                                                                onClick={() =>
                                                                                     deleteHandler(
                                                                                          image
                                                                                     )
                                                                                }
                                                                           />
                                                                      </Box>
                                                                 );
                                                            }
                                                       )}
                                             </GridItem>
                                        </Grid>

                                        {/* <Input type={"file"} /> */}
                                        <Button onClick={() => createAd()}>
                                             Илгээх
                                        </Button>
                                        <Divider />
                                   </>
                              )}
                         </VStack>
                    </Box>
               </MainContainer>
          </Box>
     );
}
