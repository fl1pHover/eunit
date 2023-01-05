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
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "context/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import urls from "../constants/api";
import { AdTypes } from "../constants/enums";

import MainContainer from "../layout/mainContainer";



export default function CreateAd() {
  const {user, categories} = useAuth()
  const router = useRouter();

  const [position, setPosition] = useState({
    district: [],
    committee: [],
    location: [],
    town: [],
  });
  const [select, setSelect] = useState({
    category: "",
    subCategory: "",
    type: "",
    location: "",
    
    district: "",
    committee: "",
  });
  const [selectStatic, setSelectStatic] = useState({
    title: "",
    description: "",
    position: "",
  })
  const [subCategory, setSubCategory] = useState() 
  const [filters, setFilters] = useState([]);
  const [adType, setAdType] = useState(AdTypes.sell)
  
  const createAd = async () => {
    
    
  };
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const setFilter = (e, index) => {
    e.preventDefault();
    let filter = [...filters];
    let f = { ...filters[index] };
    f.value = e.target.value;
    filter[index] = f;
    setFilters(filter);
  };

  useEffect(() => {
    if(select.subCategory) {
      try {
        axios.get(`${urls['test']}/category/filters/{id}?id=${categories[select.category]?.subCategory[select.subCategory]._id}`).then((d) => {
          setSubCategory(d.data)
          console.log(d.data)
        })
      } catch(e) {
        console.log(e)
      }
    }
  }, [select])

  if (user ) {
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
                  {
                    categories?.map((c, i) => {
                      return (
                        <option value={i} key={i}>
                          {capitalizeFirst(c.name)}
                        </option>
                      );
                    })}
                </Select>
              </HStack>
              { categories[select.category]?.subCategory && (
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
                    {
                      categories[select.category]?.subCategory?.map((t, i) => {
                        return (
                          <option value={i} key={i}>
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
                      setSelect((select) => ({
                        ...select,
                        type: e.target.value,
                      }))
                    }
                    value={select.type}
                  >
                    {Object.keys(AdTypes).map((type, key) => {
                      return <option key={key} value={AdTypes[type].id}>{AdTypes[type].name}</option>
                    })}
                  </Select>
                </HStack>
              )}
            </Box>
            <VStack gap={5} mt={10}>
              {select.type != "" && subCategory?.filters && (
                <>
                  {
                    subCategory.filters.map((f) => {
                      return (
                        <Select
                    placeholder={f.name}
                    onChange={(e) =>
                      setSelect((select) => ({
                        ...select,
                        location: e.target.value,
                      }))
                    }
                  >
                    {
                      f.values?.map((d, ind) => {
                        return (
                          <option value={ind} key={ind}>
                            {capitalizeFirst(d)}
                          </option>
                        );
                      })}
                  </Select>
                      );
                    })
                  }
                  <Select
                    placeholder={"Хороолол"}
                    onChange={(e) =>
                      setSelect((select) => ({
                        ...select,
                        location: e.target.value,
                      }))
                    }
                  >
                    {position.location.length > 0 &&
                      position.location.map((d, ind) => {
                        return (
                          <option value={d._id} key={ind}>
                            {capitalizeFirst(d.name)}
                          </option>
                        );
                      })}
                  </Select>
                  <Select
                    placeholder={"Хороо"}
                    onChange={(e) =>
                      setSelect((select) => ({
                        ...select,
                        committee: e.target.value,
                      }))
                    }
                  >
                    {position.committee.length > 0 &&
                      position.committee.map((d, ind) => {
                        return (
                          <option key={ind}>{capitalizeFirst(d.name)}</option>
                        );
                      })}
                  </Select>
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
                  {subCategory.length > 0 &&
                    subCategory[select.subCategory] &&
                    subCategory[select.subCategory].filters &&
                    subCategory[select.subCategory].filters.map((s, i) => {
                      // console.log(filters)
                      if (s.type == "dropdown" && s.type) {
                        return (
                          <Select
                            placeholder={capitalizeFirst(s.name)}
                            onChange={(e) => setFilter(e, i)}
                            key={i}
                          >
                            {s.choices &&
                              s.choices.map((c, ind) => {
                                return (
                                  <option key={ind}>
                                    {capitalizeFirst(c.value)}
                                  </option>
                                );
                              })}
                          </Select>
                        );
                      }
                      if (s.type == "inputText" && s.type) {
                        return (
                          <Input key={i}
                            onChange={(e) => setFilter(e, i)}
                            placeholder={capitalizeFirst(s.name)}
                          ></Input>
                        );
                      }
                    })}

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
    router.push('/login')
  }
}
