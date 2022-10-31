import {
     Box,
     Button,
     Center,
     Code,
     Divider,
     Grid,
     GridItem,
     Heading,
     HStack,
     Input,
     Select,
     Text,
     Textarea,
     useToast,
     VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

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

                                        <Center>
                                             <Input
                                                  type={"image"}
                                                  height="100px"
                                             />
                                        </Center>

                                        <Input type={"file"} />
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
