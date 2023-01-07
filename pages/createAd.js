import {
  Box,
  Button,
  Center,
  Code,
  Divider,
  Heading,
  HStack,
  Input,
  Select,
  SelectField,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "context/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import urls from "../constants/api";
import { AdTypes } from "../constants/enums";

import MainContainer from "../layout/mainContainer";

export default function CreateAd() {
  const { user, categories, districts, locations } = useAuth();
  const router = useRouter();

  const [select, setSelect] = useState({
    category: "",
    subCategory: "",
  });
  const [selectStatic, setSelectStatic] = useState({
    title: "",
    description: "",
    position: "",
  });
  const [subCategory, setSubCategory] = useState();
  const [filters, setFilters] = useState([]);
  const [adType, setAdType] = useState(AdTypes.sell);

  const createAd = async () => {
    try {
      axios.post(`${urls['test']}/ad`, {
        title: selectStatic.title,
        description: selectStatic.description,
        location: selectStatic.position,
        types: [adType],
        filters: filters,
        subCategory: subCategory._id,
      })
    } catch (error) {
      console.log(error)
    }
  };
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const setFilter = (id, e) => {
    e.preventDefault();

    filters.map((f) => {
      if (f.id == id) {
        f.value = e.target.value;
      }
    });
  };

  useEffect(() => {
    if (select.subCategory && select.category) {
      try {
        categories[select.category].subCategory.filter((f) => {
          if (f.name == select.subCategory) {
            axios
              .get(`${urls["test"]}/category/filters/{id}/true?id=${f._id}`)
              .then((d) => {
                setSubCategory(d.data);
                setFilters(d.data?.filters);
              });
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [select]);

  if (user) {
    return (
      <Box as="section" m={5} id="add__ad">
        <MainContainer>
          <Box bgColor={"white"} px={10} py={5} rounded={10}>
            <Center>
              <Heading variant={"bigHeading"}>Зар оруулах хэсэг</Heading>
            </Center>
            <Code mt={10} textAlign="center">
              Зар оруулах дараагийн хэсэг дараах сонголтыг сонгосны дараа гарч
              ирнэ.
            </Code>
            <Box
              display={"grid"}
              gridTemplateColumns={"repeat(3,1fr)"}
              gap={10}
              mt={4}
            >
              <HStack>
                <Text width={"100%"}>Зарах хөрөнгийн төрөл</Text>
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
                  {categories?.map((c, i) => {
                    return (
                      <option value={i} key={i}>
                        {capitalizeFirst(c.name)}
                      </option>
                    );
                  })}
                </Select>
              </HStack>
              {categories[select.category]?.subCategory && (
                <HStack>
                  <Text width={"100%"}>Дэд төрөл</Text>
                  <Select
                    placeholder="Сонгох"
                    onChange={(e) =>
                      setSelect((select) => ({
                        ...select,
                        subCategory: e.target.value,
                      }))
                    }
                    value={select.subCategory}
                  >
                    {categories[select.category]?.subCategory?.map((t, i) => {
                      return (
                        <option value={t.name} key={i}>
                          {capitalizeFirst(t.name)}
                        </option>
                      );
                    })}
                  </Select>
                </HStack>
              )}
              {select.subCategory && (
                <HStack>
                  <Text width={"100%"}>Борлуулах төрөл</Text>
                  <Select
                    placeholder="Сонгох"
                    onChange={(e) =>
                      setAdType((type) => ({
                        ...type,
                        type: e.target.value,
                      }))
                    }
                    value={adType}
                  >
                    {Object.keys(AdTypes).map((type, key) => {
                      return (
                        <option key={key} value={AdTypes[type].id}>
                          {AdTypes[type].name}
                        </option>
                      );
                    })}
                  </Select>
                </HStack>
              )}
            </Box>
            <VStack gap={5} mt={10}>
              {select.type != "" && subCategory?.filters && (
                <>
                  {subCategory.filters.map((f, i) => {
                    return f.values.length == 0 &&
                      f.name != "Дүүрэг" &&
                      f.name != "Байршил" ? (
                      <Input
                        key={i}
                        onChange={(e) => setFilter(f.id, e)}
                        placeholder={capitalizeFirst(f.name)}
                      ></Input>
                    ) : (
                      <Select
                        placeholder={f.name}
                        onChange={(e) => setFilter(f.id, e)}
                      >
                        {f.name == "Дүүрэг"
                          ? districts?.map((d, ind) => {
                              return (
                                <option value={d._id} key={ind}>
                                  {capitalizeFirst(d.name)}
                                </option>
                              );
                            })
                          : f.name == "Байршил"
                          ? locations?.map((d, ind) => {
                              return (
                                <option value={d.name} key={ind}>
                                  {capitalizeFirst(d.name)}
                                </option>
                              );
                            })
                          : f.values?.map((d, ind) => {
                              return (
                                <option value={d} key={ind}>
                                  {capitalizeFirst(d)}
                                </option>
                              );
                            })}
                      </Select>
                    );
                  })}

                  <Textarea
                    placeholder={"Гарчиг"}
                    type="textarea"
                    height="100px"
                    whiteSpace={"nowrap"}
                    onChange={(e) =>
                      setSelectStatic((selectStatic) => ({
                        ...selectStatic,
                        title: e.target.value,
                      }))
                    }
                    value={selectStatic.title}
                  />
                  <Textarea
                    placeholder={"Дэлгэрэнгүй"}
                    type="textarea"
                    height="100px"
                    whiteSpace={"nowrap"}
                    value={selectStatic.description}
                    onChange={(e) =>
                      setSelectStatic((selectStatic) => ({
                        ...selectStatic,
                        description: e.target.value,
                      }))
                    }
                  />

                  <Input
                    placeholder={"Хаяг"}
                    value={selectStatic.position}
                    onChange={(e) =>
                      setSelectStatic((selectStatic) => ({
                        ...selectStatic,
                        position: e.target.value,
                      }))
                    }
                  />

                  {/* <Center>
                                                                  <Input
                                                                       type={"file"}
                                                                       height="100px"
                                                                  />
                                                             </Center>
                                                       
                                                             <Input type={"file"} /> */}
                  <Button onClick={() => createAd()}>Илгээх</Button>

                  <Divider />
                </>
              )}
            </VStack>
          </Box>
        </MainContainer>
      </Box>
    );
  } else {
    router.push("/login");
  }
}
