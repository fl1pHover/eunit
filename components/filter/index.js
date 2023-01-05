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
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { categories } from '../../data/categories';
import FilterStack from '../../util/filterStack';

const filters = {
  districts: [
    {
      district: 'Баянгол',
      towns: ['10-р хороолол', '25-р эмийн сан', '3-р хороолол'],
    },
    {
      district: 'Баянзүрх',
      towns: ['1000 оюутны байр', '13-р хороолол', '1₮-р хороолол'],
    },
  ],
  rooms: ['1', '2', '3', '4', '5', '5+'],
  bathrooms: ['1', '2', '2+'],
  masterBedrooms: ['0', '1', '2', '2+'],
  window: ['Вакум', 'Модон', 'Төмөр вакум', 'Модон вакум'],
  windows: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10+'],
  doors: ['Бүргэд', 'Төмөр', 'Мод'],
  balconies: ['1', '2', '3', '4', '5', '5+'],
  floor: ['Паркет', 'Ламинат', 'Плита', 'Мод', 'Чулуу', 'Бетон', 'Цемент'],
  garage: ['Байгаа', 'Байхгүй'],
  condition: ['Банкны лизингтэй', 'Хувь лизингтэй', 'Бэлэн'],
  barter: ['Байгаа', 'Байхгүй'],
};

// const categories = [
//      {
//           category: "Орон сууц",
//           categories: [
//                {
//                     category: "Газар",
//                     filters: [
//                          "Зарын гарчиг... 100 тэмдэгтэд багтаан бичнэ үү. ",
//                          "Газрын зориулалт",
//                          "Эзэмшлийн хэлбэр",
//                          "Утас",
//                          "Үнэ",
//                          "Талбай",
//                          "Нэгж талбайн үнэ",
//                          "Дүүрэг",
//                          "Хороо",
//                          "Байршил",
//                          "Гэрчилгээ олгосон он",
//                          "Хүчинтэй хугацаа (жил)",
//                          "Бартер",
//                          "Төлбөрийн нөхцөл",
//                          "Газрын зурагт байршил сонго",
//                          "Хөрөнгийн зураг",
//                          "Кадастрын зураг",
//                          "Зарын дэлгэрэнгүй... 10000 тэмдэгтэд багтаан бичнэ үү.",
//                     ],
//                },
//                {
//                     category: "Оффис",

//                     filters: [
//                          "Зарын гарчиг... 100 тэмдэгтэд багтаан бичнэ үү. ",
//                          "Утас",
//                          "Үнэ",
//                          "Талбай",
//                          "Нэгж талбайн үнэ",
//                          "Дүүрэг",
//                          "Хороо",
//                          "Байршил",
//                          "Оффисын нэр",
//                          "Ашиглалтад орсон он",
//                          "Барилгын давхар",
//                          "Хэдэн давхарт",
//                          "Бартер",
//                          "Төлбөрийн нөхцөл",
//                          "Газрын зурагт байршил сонго",
//                          "Хөрөнгийн зураг",
//                          "План зураг",
//                          "Зарын дэлгэрэнгүй... 10000 тэмдэгтэд багтаан бичнэ үү.",
//                     ],
//                },
//           ],
//      },
//      {
//           category: "Үл хөдлөх хөрөнгө",
//           categories: [{ category: "Газар" }, { category: "Оффис" }],
//      },
//      {
//           category: "Оффис",
//           categories: [{ category: "Газар" }, { category: "Оффис" }],
//      },
//      {
//           category: "Худалдаа үйлчилгээний талбай",
//           categories: [{ category: "Газар" }, { category: "Оффис" }],
//      },
//      {
//           category: "Үйлдвэр, агуулах",
//           categories: [{ category: "Газар" }, { category: "Оффис" }],
//      },
//      {
//           category: "Хашаа байшин",
//           categories: [{ category: "Газар" }, { category: "Оффис" }],
//      },
//      {
//           category: "Хаус, зуслангийн байшин",
//           categories: [{ category: "Газар" }, { category: "Оффис" }],
//      },
//      {
//           category: "Гараж",
//           categories: [{ category: "Газар" }, { category: "Оффис" }],
//      },
//      {
//           category: "Контейнер, зөөврийн сууц",
//           categories: [{ category: "Газар" }, { category: "Оффис" }],
//      },
// ];

const FilterLayout = () => {
  const [filter, setFilter] = useState({
    district: '',
    location: '',
    room: '',
    barter: '',
    condition: '',
    garage: '',
    floor: '',
    balconies: '',
    doors: '',
    window: '',
    windows: '',
    bathroom: '',
    masterBedroom: '',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <Box
        maxWidth={'20%'}
        flex="0 0 20%"
        bgColor={'white'}
        p={5}
        rounded={10}
        boxShadow="base"
        display={{ base: 'none', md: 'block' }}
      >
        <FilterStack>
          <Heading variant={'smallHeading'} mb={2}>
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
          <Heading variant={'smallHeading'} mb={2}>
            Зарах & Түрээслүүлэх
          </Heading>
          <Checkbox borderColor={'mainBlue'} defaultChecked>
            Зарна
          </Checkbox>
          <Checkbox>Түрээслүүлнэ</Checkbox>
        </FilterStack>
        <FilterStack>
          <Heading variant={'smallHeading'} mb={2}>
            Байршлаар
          </Heading>
          {/* <AspectRatio ratio={16 / 9}>
                              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" />
                         </AspectRatio> */}
        </FilterStack>

        <FilterStack borderBottom={'2px solid '} borderColor="bgGrey">
          <Heading variant={'smallHeading'}>Нэмэлт хайлт</Heading>
          {filters && (
            <>
              {filters.districts && (
                <Select
                  placeholder="Дүүрэг"
                  variant="outline"
                  borderWidth="2px"
                  color={'mainBlossom'}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      district: e.target.value,
                    })
                  }
                  value={filter.district}
                >
                  {filters.districts.map((d, ind) => {
                    return (
                      <option key={ind} value={ind.toString()}>
                        {d.district}
                      </option>
                    );
                  })}
                </Select>
              )}

              {filter.district != '' && (
                <Select
                  placeholder="Байршил"
                  variant="outline"
                  borderWidth="2px"
                  color={'mainBlossom'}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      location: e.target.value,
                    })
                  }
                  value={filter.location}
                >
                  {filters.districts[parseInt(filter.district)].towns &&
                    filters.districts[parseInt(filter.district)].towns.map(
                      (d, i) => {
                        return (
                          <option key={i} value={`${i}`}>
                            {d}
                          </option>
                        );
                      }
                    )}
                </Select>
              )}
              {filters.rooms && (
                <Select
                  placeholder="Өрөөний тоо"
                  variant="outline"
                  borderWidth="2px"
                  color={'mainBlossom'}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      room: e.target.value,
                    })
                  }
                  value={filter.room}
                >
                  {filters.rooms.map((d, ind) => {
                    return (
                      <option key={ind} value={ind.toString()}>
                        {d}
                      </option>
                    );
                  })}
                </Select>
              )}
              {filters.masterBedrooms && (
                <Select
                  placeholder="Мастер унтлагийн өрөөний тоо"
                  variant="outline"
                  borderWidth="2px"
                  color={'mainBlossom'}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      masterBedroom: e.target.value,
                    })
                  }
                  value={filter.masterBedroom}
                >
                  {filters.masterBedrooms.map((d, ind) => {
                    return (
                      <option key={ind} value={ind.toString()}>
                        {d}
                      </option>
                    );
                  })}
                </Select>
              )}
              {filters.bathrooms && (
                <Select
                  placeholder="Угаалгын өрөөний тоо"
                  variant="outline"
                  borderWidth="2px"
                  color={'mainBlossom'}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      bathroom: e.target.value,
                    })
                  }
                  value={filter.bathroom}
                >
                  {filters.bathrooms.map((d, ind) => {
                    return (
                      <option key={ind} value={ind.toString()}>
                        {d}
                      </option>
                    );
                  })}
                </Select>
              )}
              {/* {filters.window && (
                                        <Select
                                             placeholder="Цонх"
                                             variant="outline"
                                             borderWidth="2px"
                                             color={"mainBlossom"}
                                             onChange={(e) =>
                                                  setFilter({
                                                       ...filter,
                                                       window: e.target.value,
                                                  })
                                             }
                                             value={filter.window}
                                        >
                                             {filters.window.map((d, ind) => {
                                                  return (
                                                       <option
                                                            key={ind}
                                                            value={ind.toString()}
                                                       >
                                                            {d}
                                                       </option>
                                                  );
                                             })}
                                        </Select>
                                   )}
                                   {filters.windows && (
                                        <Select
                                             placeholder="Цонхны тоо"
                                             variant="outline"
                                             borderWidth="2px"
                                             color={"mainBlossom"}
                                             onChange={(e) =>
                                                  setFilter({
                                                       ...filter,
                                                       windows: e.target.value,
                                                  })
                                             }
                                             value={filter.windows}
                                        >
                                             {filters.windows.map((d, ind) => {
                                                  return (
                                                       <option
                                                            key={ind}
                                                            value={ind.toString()}
                                                       >
                                                            {d}
                                                       </option>
                                                  );
                                             })}
                                        </Select>
                                   )}
                                   {filters.doors && (
                                        <Select
                                             placeholder="Хаалга"
                                             variant="outline"
                                             borderWidth="2px"
                                             color={"mainBlossom"}
                                             onChange={(e) =>
                                                  setFilter({
                                                       ...filter,
                                                       doors: e.target.value,
                                                  })
                                             }
                                             value={filter.doors}
                                        >
                                             {filters.doors.map((d, ind) => {
                                                  return (
                                                       <option
                                                            key={ind}
                                                            value={ind.toString()}
                                                       >
                                                            {d}
                                                       </option>
                                                  );
                                             })}
                                        </Select>
                                   )}
                                   {filters.balconies && (
                                        <Select
                                             placeholder="Тагтны тоо"
                                             variant="outline"
                                             borderWidth="2px"
                                             color={"mainBlossom"}
                                             onChange={(e) =>
                                                  setFilter({
                                                       ...filter,
                                                       balconies:
                                                            e.target.value,
                                                  })
                                             }
                                             value={filter.balconies}
                                        >
                                             {filters.balconies.map(
                                                  (d, ind) => {
                                                       return (
                                                            <option
                                                                 key={ind}
                                                                 value={ind.toString()}
                                                            >
                                                                 {d}
                                                            </option>
                                                       );
                                                  }
                                             )}
                                        </Select>
                                   )}
                                   {filters.floor && (
                                        <Select
                                             placeholder="Шал"
                                             variant="outline"
                                             borderWidth="2px"
                                             color={"mainBlossom"}
                                             onChange={(e) =>
                                                  setFilter({
                                                       ...filter,
                                                       floor: e.target.value,
                                                  })
                                             }
                                             value={filter.floor}
                                        >
                                             {filters.floor.map((d, ind) => {
                                                  return (
                                                       <option
                                                            key={ind}
                                                            value={ind.toString()}
                                                       >
                                                            {d}
                                                       </option>
                                                  );
                                             })}
                                        </Select>
                                   )}
                                   {filters.garage && (
                                        <Select
                                             placeholder="Гараж"
                                             variant="outline"
                                             borderWidth="2px"
                                             color={"mainBlossom"}
                                             onChange={(e) =>
                                                  setFilter({
                                                       ...filter,
                                                       garage: e.target.value,
                                                  })
                                             }
                                             value={filter.garage}
                                        >
                                             {filters.garage.map((d, ind) => {
                                                  return (
                                                       <option
                                                            key={ind}
                                                            value={ind.toString()}
                                                       >
                                                            {d}
                                                       </option>
                                                  );
                                             })}
                                        </Select>
                                   )} */}
              {filters.condition && (
                <Select
                  placeholder="Төлбөрийн нөхцөл"
                  variant="outline"
                  borderWidth="2px"
                  color={'mainBlossom'}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      condition: e.target.value,
                    })
                  }
                  value={filter.condition}
                >
                  {filters.condition.map((d, ind) => {
                    return (
                      <option key={ind} value={ind.toString()}>
                        {d}
                      </option>
                    );
                  })}
                </Select>
              )}
              {filters.barter && (
                <Select
                  placeholder="Бартер"
                  variant="outline"
                  borderWidth="2px"
                  color={'mainBlossom'}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      barter: e.target.value,
                    })
                  }
                  value={filter.barter}
                >
                  {filters.barter.map((d, ind) => {
                    return (
                      <option key={ind} value={ind.toString()}>
                        {d}
                      </option>
                    );
                  })}
                </Select>
              )}
            </>
          )}
          <VStack>
            <Heading variant={'smallHeading'}>Үнэ</Heading>
            <Flex alignItems={'center'} gap={2}>
              <Input
                type="number"
                placeholder="Доод"
                variant="outline"
                borderWidth="2px"
              />
              <Text>-</Text>
              <Input
                type="number"
                placeholder="Дээд"
                variant="outline"
                borderWidth="2px"
              />
            </Flex>
          </VStack>
          <VStack flex>
            <Heading variant={'smallHeading'}>Талбайн хэмжээ</Heading>
            <Flex alignItems={'center'} gap={2}>
              <Input
                type="number"
                placeholder="Доод"
                variant="outline"
                borderWidth="2px"
              />
              <Text>-</Text>
              <Input
                type="number"
                placeholder="Дээд"
                variant="outline"
                borderWidth="2px"
              />
            </Flex>
          </VStack>

          <Button variant={'blueButton'} mx={4}>
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
              <Heading variant={'smallHeading'} mb={2}>
                Зарах & Түрээслүүлэх
              </Heading>
              <Checkbox borderColor={'mainBlue'} defaultChecked>
                Зарна
              </Checkbox>
              <Checkbox>Түрээслүүлнэ</Checkbox>
            </FilterStack>
            <FilterStack>
              <Heading variant={'smallHeading'} mb={2}>
                Байршлаар
              </Heading>
              {/* <AspectRatio ratio={16 / 9}>
                              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" />
                         </AspectRatio> */}
            </FilterStack>

            <FilterStack borderBottom={'2px solid '} borderColor="bgGrey">
              <Heading variant={'smallHeading'}>Нэмэлт хайлт</Heading>
              {filters && (
                <>
                  {filters.districts && (
                    <Select
                      placeholder="Дүүрэг"
                      variant="outline"
                      borderWidth="2px"
                      color={'mainBlossom'}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          district: e.target.value,
                        })
                      }
                      value={filter.district}
                    >
                      {filters.districts.map((d, ind) => {
                        return (
                          <option key={ind} value={ind.toString()}>
                            {d.district}
                          </option>
                        );
                      })}
                    </Select>
                  )}

                  {filter.district != '' && (
                    <Select
                      placeholder="Байршил"
                      variant="outline"
                      borderWidth="2px"
                      color={'mainBlossom'}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          location: e.target.value,
                        })
                      }
                      value={filter.location}
                    >
                      {filters.districts[parseInt(filter.district)].towns &&
                        filters.districts[parseInt(filter.district)].towns.map(
                          (d, i) => {
                            return (
                              <option key={i} value={`${i}`}>
                                {d}
                              </option>
                            );
                          }
                        )}
                    </Select>
                  )}
                  {filters.rooms && (
                    <Select
                      placeholder="Өрөөний тоо"
                      variant="outline"
                      borderWidth="2px"
                      color={'mainBlossom'}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          room: e.target.value,
                        })
                      }
                      value={filter.room}
                    >
                      {filters.rooms.map((d, ind) => {
                        return (
                          <option key={ind} value={ind.toString()}>
                            {d}
                          </option>
                        );
                      })}
                    </Select>
                  )}
                  {filters.masterBedrooms && (
                    <Select
                      placeholder="Мастер унтлагийн өрөөний тоо"
                      variant="outline"
                      borderWidth="2px"
                      color={'mainBlossom'}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          masterBedroom: e.target.value,
                        })
                      }
                      value={filter.masterBedroom}
                    >
                      {filters.masterBedrooms.map((d, ind) => {
                        return (
                          <option key={ind} value={ind.toString()}>
                            {d}
                          </option>
                        );
                      })}
                    </Select>
                  )}
                  {filters.bathrooms && (
                    <Select
                      placeholder="Угаалгын өрөөний тоо"
                      variant="outline"
                      borderWidth="2px"
                      color={'mainBlossom'}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          bathroom: e.target.value,
                        })
                      }
                      value={filter.bathroom}
                    >
                      {filters.bathrooms.map((d, ind) => {
                        return (
                          <option key={ind} value={ind.toString()}>
                            {d}
                          </option>
                        );
                      })}
                    </Select>
                  )}
                  {/* {filters.window && (
                                        <Select
                                             placeholder="Цонх"
                                             variant="outline"
                                             borderWidth="2px"
                                             color={"mainBlossom"}
                                             onChange={(e) =>
                                                  setFilter({
                                                       ...filter,
                                                       window: e.target.value,
                                                  })
                                             }
                                             value={filter.window}
                                        >
                                             {filters.window.map((d, ind) => {
                                                  return (
                                                       <option
                                                            key={ind}
                                                            value={ind.toString()}
                                                       >
                                                            {d}
                                                       </option>
                                                  );
                                             })}
                                        </Select>
                                   )}
                                   {filters.windows && (
                                        <Select
                                             placeholder="Цонхны тоо"
                                             variant="outline"
                                             borderWidth="2px"
                                             color={"mainBlossom"}
                                             onChange={(e) =>
                                                  setFilter({
                                                       ...filter,
                                                       windows: e.target.value,
                                                  })
                                             }
                                             value={filter.windows}
                                        >
                                             {filters.windows.map((d, ind) => {
                                                  return (
                                                       <option
                                                            key={ind}
                                                            value={ind.toString()}
                                                       >
                                                            {d}
                                                       </option>
                                                  );
                                             })}
                                        </Select>
                                   )}
                                   {filters.doors && (
                                        <Select
                                             placeholder="Хаалга"
                                             variant="outline"
                                             borderWidth="2px"
                                             color={"mainBlossom"}
                                             onChange={(e) =>
                                                  setFilter({
                                                       ...filter,
                                                       doors: e.target.value,
                                                  })
                                             }
                                             value={filter.doors}
                                        >
                                             {filters.doors.map((d, ind) => {
                                                  return (
                                                       <option
                                                            key={ind}
                                                            value={ind.toString()}
                                                       >
                                                            {d}
                                                       </option>
                                                  );
                                             })}
                                        </Select>
                                   )}
                                   {filters.balconies && (
                                        <Select
                                             placeholder="Тагтны тоо"
                                             variant="outline"
                                             borderWidth="2px"
                                             color={"mainBlossom"}
                                             onChange={(e) =>
                                                  setFilter({
                                                       ...filter,
                                                       balconies:
                                                            e.target.value,
                                                  })
                                             }
                                             value={filter.balconies}
                                        >
                                             {filters.balconies.map(
                                                  (d, ind) => {
                                                       return (
                                                            <option
                                                                 key={ind}
                                                                 value={ind.toString()}
                                                            >
                                                                 {d}
                                                            </option>
                                                       );
                                                  }
                                             )}
                                        </Select>
                                   )}
                                   {filters.floor && (
                                        <Select
                                             placeholder="Шал"
                                             variant="outline"
                                             borderWidth="2px"
                                             color={"mainBlossom"}
                                             onChange={(e) =>
                                                  setFilter({
                                                       ...filter,
                                                       floor: e.target.value,
                                                  })
                                             }
                                             value={filter.floor}
                                        >
                                             {filters.floor.map((d, ind) => {
                                                  return (
                                                       <option
                                                            key={ind}
                                                            value={ind.toString()}
                                                       >
                                                            {d}
                                                       </option>
                                                  );
                                             })}
                                        </Select>
                                   )}
                                   {filters.garage && (
                                        <Select
                                             placeholder="Гараж"
                                             variant="outline"
                                             borderWidth="2px"
                                             color={"mainBlossom"}
                                             onChange={(e) =>
                                                  setFilter({
                                                       ...filter,
                                                       garage: e.target.value,
                                                  })
                                             }
                                             value={filter.garage}
                                        >
                                             {filters.garage.map((d, ind) => {
                                                  return (
                                                       <option
                                                            key={ind}
                                                            value={ind.toString()}
                                                       >
                                                            {d}
                                                       </option>
                                                  );
                                             })}
                                        </Select>
                                   )} */}
                  {filters.condition && (
                    <Select
                      placeholder="Төлбөрийн нөхцөл"
                      variant="outline"
                      borderWidth="2px"
                      color={'mainBlossom'}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          condition: e.target.value,
                        })
                      }
                      value={filter.condition}
                    >
                      {filters.condition.map((d, ind) => {
                        return (
                          <option key={ind} value={ind.toString()}>
                            {d}
                          </option>
                        );
                      })}
                    </Select>
                  )}
                  {filters.barter && (
                    <Select
                      placeholder="Бартер"
                      variant="outline"
                      borderWidth="2px"
                      color={'mainBlossom'}
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          barter: e.target.value,
                        })
                      }
                      value={filter.barter}
                    >
                      {filters.barter.map((d, ind) => {
                        return (
                          <option key={ind} value={ind.toString()}>
                            {d}
                          </option>
                        );
                      })}
                    </Select>
                  )}
                </>
              )}
              <VStack>
                <Heading variant={'smallHeading'}>Үнэ</Heading>
                <Flex alignItems={'center'} gap={2}>
                  <Input
                    type="number"
                    placeholder="Доод"
                    variant="outline"
                    borderWidth="2px"
                  />
                  <Text>-</Text>
                  <Input
                    type="number"
                    placeholder="Дээд"
                    variant="outline"
                    borderWidth="2px"
                  />
                </Flex>
              </VStack>
              <VStack flex>
                <Heading variant={'smallHeading'}>Талбайн хэмжээ</Heading>
                <Flex alignItems={'center'} gap={2}>
                  <Input
                    type="number"
                    placeholder="Доод"
                    variant="outline"
                    borderWidth="2px"
                  />
                  <Text>-</Text>
                  <Input
                    type="number"
                    placeholder="Дээд"
                    variant="outline"
                    borderWidth="2px"
                  />
                </Flex>
              </VStack>
            </FilterStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant={'blueButton'} width="full" mx={4}>
              Хайх
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterLayout;
