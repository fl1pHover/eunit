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
  Text,
  Textarea,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

import MainContainer from "../layout/mainContainer";
import Login from "./login";

const firebaseConfig = {
  apiKey: "AIzaSyDrmzxc8MCm7PcO0Ood0MEvliD86e3RBEg",

  authDomain: "bomregistration.firebaseapp.com",

  projectId: "bomregistration",

  storageBucket: "bomregistration.appspot.com",

  messagingSenderId: "567513313511",

  appId: "1:567513313511:web:1d919d03c2334022667242",

  measurementId: "G-T3VWESJ3PF",
};

const app = initializeApp(firebaseConfig);
export default function CreateAd() {
  const auth = getAuth();
  const [user, setUser] = useState({
    status: false,
    profileImg: "",
    username: "",
    email: "",
  });
  const router = useRouter();
  onAuthStateChanged(auth, async (u) => {
    if (u && u.email) {
      console.log(u);
      let res;
      try {
        //     res = await axios.get(`https://bom-location.herokuapp.com/user/${u.email}`)
      } catch (err) {
        console.log(err);
      }

      if (res != undefined) {
        setUser((user) => ({
          ...user,
          username: res.data.username,
          profileImg: res.data.profileImg,
          email: res.data.email,
        }));
        setUser((user) => ({ ...user, status: true }));
      }
    }
    // else {
    //      NextResponse.redirect('http://localhost:3000/login', 301)
    //      setUser((user) => ({...user, username: '', profileImg: '', email: '', status: false}))
    // }
  });

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [position, setPosition] = useState({
    district: [],
    committee: [],
    location: [],
    town: [],
  });
  const [subCategory, setSubCategory] = useState("");
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
  const [filters, setFilters] = useState([]);

  const getData = async () => {
    if (category == "") {
      try {
        await fetch("https://bom-location.herokuapp.com/category")
          .then((d) => d.json())
          .then((r) => setCategory(r));
        await fetch("https://bom-location.herokuapp.com/district")
          .then((d) => d.json())
          .then((r) =>
            setPosition((position) => ({ ...position, district: r }))
          );
      } catch (err) {
        console.log(err);
      }
    }
    if (position.district.length > 0 && select.district != "") {
      try {
        await fetch(
          `https://bom-location.herokuapp.com/committee/${select.district}`
        )
          .then((d) => d.json())
          .then((r) =>
            setPosition((position) => ({ ...position, committee: r }))
          );
        await fetch(
          `https://bom-location.herokuapp.com/location/${select.district}`
        )
          .then((d) => d.json())
          .then((r) =>
            setPosition((position) => ({ ...position, location: r }))
          );
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
          .then((d) => setSubCategory(d))
          .then((a) => console.log(subCategory));
      } catch (error) {
        console.log(error);
      }
    }

    if (
      select.type != "" &&
      select.category != "" &&
      category != "" &&
      subCategory != ""
    ) {
      setFilters(subCategory[select.subCategory].filters);
    }
  };
  const createAd = async () => {
    try {
      await axios
        .post("https://bom-location.herokuapp.com/ad", {
          title: selectStatic.title,
          description: selectStatic.description,
          location: selectStatic.position,
          type: select.type,
          filters: filters.map((f) => {
            return { id: f._id, value: f.value };
          }),
          subCategory: subCategory[select.subCategory]._id,
          positions: {
           
              district_id: select.district,
          
              location_id: select.location,
              committee_id: select.committee,
              town_id: select.town,
            }
        
        })
        .then((s) => {
          setSelect((select) => ({
            ...select,
            category: "",
            committee: "",
            description: "",
            district: "",
            location: "",
            position: "",
            subCategory: "",
            title: "",
            type: "",
          })),
            setPosition((position) => ({
              ...position,
              committee: [],
              district: [],
              location: [],
              town: [],
            })),
            setFilters([]);
        });
    } catch (error) {}
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



  if (user.email == "") {
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
                  {category &&
                    category.map((c, i) => {
                      return (
                        <option value={`${c._id}`} key={i}>
                          {capitalizeFirst(c.name)}
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
                        subCategory: e.target.value,
                      }))
                    }
                    value={select.subCategory}
                  >
                    {subCategory &&
                      subCategory.map((t, i) => {
                        return (
                          <option value={i} key={i}>
                            {capitalizeFirst(t.name)}
                          </option>
                        );
                      })}
                  </Select>
                </HStack>
              )}
              {subCategory.length > 0 && select.subCategory && (
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
                    {subCategory[select.subCategory].types &&
                      subCategory[select.subCategory].types.map((t, i) => {
                        return (
                          <option value={i} key={i}>
                            {capitalizeFirst(t.name)}
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
                  <Select
                    placeholder={"Дүүрэг"}
                    onChange={(e) =>
                      setSelect((select) => ({
                        ...select,
                        district: e.target.value,
                      }))
                    }
                  >
                    {position.district.length > 0 &&
                      position.district.map((d, ind) => {
                        return (
                          <option key={ind} value={d._id}>
                            {capitalizeFirst(d.name)}
                          </option>
                        );
                      })}
                  </Select>
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
                          <Input map={i}
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
    return <Login />;
  }
}
