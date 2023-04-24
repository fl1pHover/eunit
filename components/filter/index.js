// import Input from '@/lib/Input';
import { categories } from '@/data/categories';
import Select from '@/lib/Select';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import useFilter from '@/util/useFilter';
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
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { MdFilterList } from 'react-icons/md';
import urls from '../../constants/api';
import FilterStack from '../../util/filterStack';

const FilterLayout = ({ data, isOpenMap, setDefaultAds, setSpecialAds }) => {
  const [subCategory, setSubCategory] = useState();
  const router = useRouter();
  const [value, setValue] = useState('');
  const [adType, setAdType] = useState([0]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [values, handle, typeId, min, max, clear] = useFilter();
  const getItems = async (data) => {
    try {
      await axios
        .get(`${urls['test']}/category/filters/${data}`, {})
        .then((d) => {
          setSubCategory(d.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (data) {
      getItems(data);
      setValue(data);
    }
  }, [data]);
  const filterAd = async () => {
    try {
      // let types = [];
      // adType.map((a) => {
      //   switch (a) {
      //     case 0:
      //       types.push("sell");
      //       break;
      //     case 1:
      //       types.push("rent");
      //       break;
      //     case 2:
      //       types.push("sellRent");
      //       break;
      //   }
      // });
      const filters = [];
      subCategory.steps.map((s) => {
        s.values.map((v) => {
          if (values[v.type] != undefined)
            filters.push({
              id: v.type,
              value: values[v.type],
            });
          if (min[v.type] != undefined && max[v.type] != undefined)
            filters.push({
              id: v.type,
              min: min[v.type],
              max: max[v.type],
            });
        });
      });
      await axios
        .post(`${urls['test']}/ad/filter/1`, {
          items: filters,
        })
        .then((d) => {
          setDefaultAds(d.data?.defaultAds);
          setSpecialAds(d.data?.specialAds);
          clear();
          onClose();
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <button
        ref={btnRef}
        color="teal"
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
                    {(router?.query?.slug == c.id ||
                      c.submenu.findIndex(
                        (s) => s.href == router?.query?.slug
                      ) > -1) &&
                      c.submenu.map(({ href, category }, id) => {
                        return (
                          <Radio
                            value={href}
                            key={id}
                            onChange={(e) => {
                              getItems(e.target.value);
                            }}
                            _selected={{ font: 'bold' }}
                          >
                            <Text>{category}</Text>
                          </Radio>
                        );
                      })}
                  </RadioGroup>
                );
              })}
            </FilterStack>

            <FilterStack>
              <Heading variant={'smallHeading'} mb={2}>
                Борлуулах төрөл
              </Heading>
              {['Зарна', 'Түрээслэнэ', 'Зарах & түрээслэнэ'].map((s, i) => {
                return (
                  <Checkbox
                    key={i}
                    borderColor={'mainBlue'}
                    defaultChecked={adType.find((a) => a == i) != undefined}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAdType((prev) => [...prev, i]);
                      } else {
                        setAdType(adType.filter((a) => a != i));
                      }
                    }}
                  >
                    {s}.
                  </Checkbox>
                );
              })}
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

              {subCategory?.steps?.map((f) => {
                return f.values?.map((v, i) => {
                  return v.isSearch && v.value.length > 0 ? (
                    <Select
                      requirement={false}
                      label={v.name}
                      width="large"
                      data={
                        typeId[v.parentId] != null
                          ? v.value.filter(
                              (vv) => typeId[vv.parent] == vv.parentId
                            )
                          : v.value
                      }
                      key={i}
                      Item={({ data, onClick, id, ...props }) => {
                        return (
                          <button
                            {...props}
                            onClick={() => {
                              handle(v.type, data, id);
                              onClick();
                            }}
                          >
                            {data}
                            {props.children}
                          </button>
                        );
                      }}
                      placeholder={f.name}
                    >
                      {v.value.map((item, i) => {
                        return (
                          <option key={i} value={item.value}>
                            {item.value}
                          </option>
                        );
                      })}
                    </Select>
                  ) : (
                    v.isSearch && (
                      <VStack flex key={i}>
                        <Heading variant={'smallHeading'}>{v.name}</Heading>
                        <Flex alignItems={'center'} gap={2}>
                          <Input
                            type="number"
                            placeholder="Доод"
                            className="border-blue-400 rounded-full lue-400 border-1"
                            onChange={(e) =>
                              handle(v.type, e.target.value, '', 'true')
                            }
                          />
                          <Text>-</Text>
                          <Input
                            type="number"
                            placeholder="Дээд"
                            className="border-blue-400 rounded-full lue-400 border-1 focus:outline-none"
                            onChange={(e) =>
                              handle(v.type, e.target.value, '', 'false')
                            }
                          />
                        </Flex>
                      </VStack>
                    )
                  );
                });
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

// 310

export default FilterLayout;
