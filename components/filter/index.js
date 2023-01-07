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
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import urls from '../../constants/api';
import { useAuth } from '../../context/auth';
import { categories } from '../../data/categories';
import FilterStack from '../../util/filterStack';


const FilterLayout = ({data}) => {
  const [filter, setFilter] = useState();
  const {districts, locations} = useAuth()
  const [subCategory, setSubCategory] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  useEffect(() => {
   
    if(data) {
      try {

            axios
              .get(`${urls["test"]}/category/filters/{id}/false?id=${'63b2ba0ca0b0b2d7ed9d4684'}`, {

              })
              .then((d) => {
                setSubCategory(d.data);
                setFilter(d.data?.filters);
                console.log(d.data?.filters)
              });
          
  
      } catch (e) {
        console.log(e);
      }
    }
   
  }, [])
  const filterAd = async () => {
    try {

    } catch(e) {
      console.log(e)
    }
  }
  const setFilters = (id, e, isMaxValue) => {
    e.preventDefault();

    filter.map((f) => {
      if (f.id == id) {
        if(f.values.length == 0 && f.name != 'Дүүрэг' && f.name != 'Байршил') {
          if(isMaxValue) {

            f.maxValue = e.target.value
          }else {
            
            f.value = e.target.value;
          }
        } else {
          f.value = e.target.value;
        }
      }
    });
    console.log(filter)
  };
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

              {filter?.map((f, i) => {
                return (f.values.length == 0 && f.name != 'Дүүрэг' && f.name != 'Байршил') ? (
                  <VStack flex>
            <Heading variant={'smallHeading'}>{f.name}</Heading>
            <Flex alignItems={'center'} gap={2}>
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
                placeholder={f.name}
                variant="outline"
                borderWidth="2px"
                color={'mainBlossom'}
                onChange={(e) => setFilters(f.id, e, true)}
              >
                
                  (
                     {f.name == 'Дүүрэг' ? districts.map((item, i) => {
                       return (
                        <option key={i} value={item._id}>
                          {item.name}
                    </option>
                      )
                     }) : f.name == 'Байршил' ?  locations?.map((item, i) => {
                      return (
                       <option key={i} value={item._id}>
                         {item.name}
                   </option>
                     )
                    }) : f.values.map((item, i) => {
                      return (
                       <option key={i} value={item}>
                         {item}
                   </option>
                     )
                    }) }
                  );
                
              </Select>
                ) 
              })}


        
          

          <Button variant={'blueButton'} mx={4} onClick={() => filterAd()}>
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
