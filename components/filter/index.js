import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Heading,
  Input,
  Link,
  Select,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import urls from "../../constants/api";
import { useAuth } from "../../context/auth";
import { categories } from "../../data/categories";
import FilterStack from "../../util/filterStack";

const FilterLayout = ({ data }) => {
  const [filter, setFilter] = useState();
  const { districts, locations } = useAuth();
  const [subCategory, setSubCategory] = useState();
  const [positions, setPositions] = useState({
    district_id: "",
    location_id: "",
  });
  const [adType, setAdType] = useState({
    rent: false,
    sell: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  useEffect(() => {
    if (data) {
      try {
        axios
          .get(`${urls["test"]}/category/filters/{id}/false?id=${data}`, {})
          .then((d) => {
            setSubCategory(d.data);
            setFilter(d.data?.filters);
            console.log(d.data?.filters);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);
  const filterAd = async () => {
    try {
      let types = [];
      if (adType.rent) {
        types.push("rent");
      }
      if (adType.sell) types.push("sell");

      axios
        .post(`${urls["test"]}/ad/filter`, {
          filters: filter,
          adTypes: types,
          positions: positions,
        })
        .then((d) => console.log(d));
    } catch (e) {
      console.log(e);
    }
  };
  const setFilters = (id, e, isMaxValue) => {
    e.preventDefault();

    filter.map((f) => {
      if (f.id == id) {
        if (f.values.length == 0) {
          if (isMaxValue) {
            f.maxValue = e.target.value;
          } else {
            f.value = e.target.value;
          }
        } else {
          f.value = e.target.value;
        }
      }
    });
    console.log(filter);
  };
  return (
    <>
      <Box
        maxWidth={"20%"}
        flex="0 0 20%"
        bgColor={"white"}
        p={5}
        rounded={10}
        boxShadow="base"
        display={{ base: "none", md: "block" }}
      >
        <FilterStack>
          <Heading variant={"smallHeading"} mb={2}>
            Үл хөдлах хөрөнгө
          </Heading>
          {categories.slice(0, 1).map(({ ...props }, id) => {
            return (
              <>
                {props.submenu &&
                  props.submenu.map((sub, i) => {
                    return (
                      <Link
                        key={i}
                        href={`/category/${props.id}/${sub.href}`}
                        p={1}
                        mt={0}
                      >
                        <Text>{sub.category}</Text>
                      </Link>
                    );
                  })}
              </>

              // <Link href={props.href} key={props.id}>
              //      <Text>{props.category}</Text>
              // </Link>
            );
          })}
        </FilterStack>

        <FilterStack>
          <Heading variant={"smallHeading"} mb={2}>
            Зарах & Түрээслүүлэх
          </Heading>
          <Checkbox
            borderColor={"mainBlue"}
            defaultChecked
            onChange={(e) =>
              setAdType((adType) => ({ ...adType, sell: e.target.checked }))
            }
          >
            Зарна.
          </Checkbox>
          <Checkbox
            onChange={(e) =>
              setAdType((adType) => ({ ...adType, rent: e.target.checked }))
            }
          >
            Түрээслүүлнэ
          </Checkbox>
        </FilterStack>
        <FilterStack>
          <Heading variant={"smallHeading"} mb={2}>
            Байршлаар
          </Heading>
          {/* <AspectRatio ratio={16 / 9}>
                              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" />
                         </AspectRatio> */}
        </FilterStack>

        <FilterStack borderBottom={"2px solid "} borderColor="bgGrey">
          <Heading variant={"smallHeading"}>Нэмэлт хайлт</Heading>
          <Select
            placeholder={"Дүүрэг"}
            variant="outline"
            borderWidth="2px"
            color={"mainBlossom"}
            onChange={(e) =>
              setPositions((positions) => ({
                ...positions,
                district_id: e.target.value,
              }))
            }
          >
            {districts?.map((item, i) => {
              return (
                <option key={i} value={item._id}>
                  {item.name}
                </option>
              );
            })}
          </Select>
          {positions.district_id && (
            <Select
              placeholder={"Байршил"}
              variant="outline"
              borderWidth="2px"
              color={"mainBlossom"}
              onChange={(e) =>
                setPositions((positions) => ({
                  ...positions,
                  location_id: e.target.value,
                }))
              }
            >
              {locations?.map((item, i) => {
                if (positions.district_id == item.district_id)
                  return (
                    <option key={i} value={item._id}>
                      {item.name}
                    </option>
                  );
              })}
            </Select>
          )}
          {filter?.map((f, i) => {
            return f.values.length == 0 ? (
              <VStack flex key={i}>
                <Heading variant={"smallHeading"}>{f.name}</Heading>
                <Flex alignItems={"center"} gap={2}>
                  <Input
                    type="number"
                    placeholder="Доод"
                    variant="outline"
                    borderWidth="2px"
                    onChange={(e) => setFilters(f.id, e, false)}
                  />
                  <Text>-</Text>
                  <Input
                    type="number"
                    placeholder="Дээд"
                    variant="outline"
                    borderWidth="2px"
                    onChange={(e) => setFilters(f.id, e, true)}
                  />
                </Flex>
              </VStack>
            ) : (
              <Select
                key={i}
                placeholder={f.name}
                variant="outline"
                borderWidth="2px"
                color={"mainBlossom"}
                onChange={(e) => setFilters(f.id, e, true)}
              >
                {f.values.map((item, i) => {
                  return (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  );
                })}
              </Select>
            );
          })}

          <Button variant={"blueButton"} mx={4} onClick={() => filterAd()}>
            Хайх
          </Button>
        </FilterStack>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <FilterStack>
              <Heading variant={"smallHeading"} mb={2}>
                Зарах & Түрээслүүлэх
              </Heading>
              <Checkbox borderColor={"mainBlue"} defaultChecked>
                Зарна
              </Checkbox>
              <Checkbox>Түрээслүүлнэ</Checkbox>
            </FilterStack>
            <FilterStack>
              <Heading variant={"smallHeading"} mb={2}>
                Байршлаар
              </Heading>
              {/* <AspectRatio ratio={16 / 9}>
                              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" />
                         </AspectRatio> */}
            </FilterStack>

            <FilterStack borderBottom={"2px solid "} borderColor="bgGrey">
              <Heading variant={"smallHeading"}>Нэмэлт хайлт</Heading>
            </FilterStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant={"blueButton"} width="full" mx={4}>
              Хайх
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterLayout;
