// import Input from '@/lib/Input';
import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import urls from '../../constants/api';
import { useAuth } from '../../context/auth';
// import Select from '@/lib/Select';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { MdFilterList } from 'react-icons/md';
import FilterStack from '../../util/filterStack';

const FilterLayout = ({ data, isOpenMap }) => {
  const [filter, setFilter] = useState();
  const { districts, locations, categories, setAds } = useAuth();
  const [subCategory, setSubCategory] = useState();

  const [positions, setPositions] = useState({
    district_id: '',
    location_id: '',
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
          .get(`${urls['test']}/category/filters/${data}/true`, {})
          .then((d) => {
            setSubCategory(d.data?.subCategory);
            setFilter(d.data?.filters);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [data]);
  const filterAd = async () => {
    try {
      let types = [];
      if (adType.rent) {
        types.push('rent');
      }
      if (adType.sell) types.push('sell');

      axios
        .post(`${urls['test']}/ad/filter`, {
          filters: filter,
          adTypes: types,
          positions: positions,
          subCategory: subCategory._id,
        })
        .then((d) => {
          setAds(d.data);
          console.log(d.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const setFilters = (id, e, isMaxValue) => {
    e.preventDefault();

    filter.map((f, i) => {
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
  const [value, setValue] = useState('');
  return (
    <>
      <button
        ref={btnRef}
        colorscheme="teal"
        onClick={onOpen}
        className={mergeNames(
          ' bg-blue-600 rounded-md text-white font-bold h-[50px]',
          STYLES.flexCenter,
          'relative ',
          // 'sticky top-[100px] left-[0] z-30',
          'px-5 ',
          'flex gap-2 items-center'
        )}
      >
        Шүүлтүүр
        <MdFilterList />
      </button>

      <Drawer
        isOpen={isOpen}
        // placement={{ base: 'bottom', md: 'left' }}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody
          // className="text-white bg-mainBlossom"
          >
            <FilterStack>
              <Heading variant={'smallHeading'} mb={2}>
                Үл хөдлөх хөрөнгө
              </Heading>
              {categories?.map((c, i) => {
                return (
                  <RadioGroup
                    onChange={setValue}
                    value={value}
                    key={i}
                    className="flex flex-col gap-2"
                  >
                    {c.subCategory.map(({ href, name }, id) => {
                      return (
                        // <Link
                        //   key={id}
                        //   href={`/category/${href}`}
                        //   p="2px"
                        //   mt={0}
                        //   fontWeight={data == href ? 'bold' : 'medium'}
                        // >
                        //   <Text>{name}</Text>
                        // </Link>

                        // Eniig inspectdeer neg haraarai aldaatai bolood bn
                        <Radio
                          value={name}
                          key={id}
                          _selected={{ font: 'bold' }}
                        >
                          <Text>{name}</Text>
                        </Radio>
                      );
                    })}
                  </RadioGroup>
                );
              })}
            </FilterStack>

            <FilterStack>
              <Heading variant={'smallHeading'} mb={2}>
                Зарах & Түрээслүүлэх
              </Heading>
              <Checkbox
                borderColor={'mainBlue'}
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
              <Heading variant={'smallHeading'} mb={2}>
                Байршлаар
              </Heading>

              <button className="relative z-10 w-full h-32 overflow-hidden border-g ray-200 border-1 rounded-2xl">
                {/* end map gargana */}
                <div onClick={isOpenMap} className="relative z-0 h-full" />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng"
                  className="absolute top-0 left-0 h-full -z-10"
                  disabled
                />
              </button>
            </FilterStack>

            <FilterStack borderBottom={'2px solid '} borderColor="bgGrey">
              <Heading variant={'smallHeading'}>Нэмэлт хайлт</Heading>
              {/* <Select></Select> */}
              <Select
                placeholder={'Дүүрэг'}
                className="border-1  border-blue-400 rounded-full text-[14px]"
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
                  placeholder={'Байршил'}
                  className="border-b rounded-full lue-400 border-1"
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
                    <Heading variant={'smallHeading'}>{f.name}</Heading>
                    <Flex alignItems={'center'} gap={2}>
                      <Input
                        type="number"
                        placeholder="Доод"
                        className="border-b rounded-full lue-400 border-1"
                        onChange={(e) => setFilters(f.id, e, false)}
                      />
                      <Text>-</Text>
                      <Input
                        type="number"
                        placeholder="Дээд"
                        className="border-b rounded-full lue-400 border-1 focus:outline-none"
                        onChange={(e) => setFilters(f.id, e, true)}
                      />
                    </Flex>
                  </VStack>
                ) : (
                  <Select
                    key={i}
                    placeholder={f.name}
                    className="border-b rounded-full lue-400 border-1"
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

              <Button variant={'blueButton'} mx={4} onClick={() => filterAd()}>
                Хайх
              </Button>
            </FilterStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterLayout;
