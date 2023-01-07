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
  IconButton,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from 'context/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import urls from '../constants/api';
import { AdTypes } from '../constants/enums';

import MainContainer from '../layout/mainContainer';

export default function CreateAd() {
  const { user, categories, districts, locations } = useAuth();
  const router = useRouter();

  const [select, setSelect] = useState({
    category: '',
    subCategory: '',
  });
  const [selectStatic, setSelectStatic] = useState({
    title: '',
    description: '',
    position: '',
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
      });
    } catch (error) {
      console.log(error);
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
              .get(`${urls['test']}/category/filters/{id}?id=${f._id}`)
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

  // image preview
  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = '';
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  if (user) {
    return (
      <Box
        as="section"
        px={{ base: 2, sm: 5 }}
        my={{ base: 10, md: '50px' }}
        id="add__ad"
      >
        <MainContainer>
          <Box bgColor={'white'} px={{ base: 2, sm: 10 }} py={5} rounded={10}>
            <Center>
              <Heading variant={'bigHeading'}>Зар оруулах хэсэг</Heading>
            </Center>
            <Code mt={10} textAlign="center">
              Зар оруулах дараагийн хэсэг дараах сонголтыг сонгосны дараа гарч
              ирнэ.
            </Code>
            <Box
              display={'grid'}
              gridTemplateColumns={{
                base: 'repeat(1,1fr)',
                md: 'repeat(3,1fr)',
              }}
              gap={{ base: 5, md: 10 }}
              mt={4}
            >
              <HStack>
                <Text width={'100%'}>Зарах хөрөнгийн төрөл</Text>
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
                  <Text width={'100%'}>Дэд төрөл</Text>
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
                  <Text width={'100%'}>Борлуулах төрөл</Text>
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
            <Grid
              templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(3,1fr)' }}
              gap={5}
              mt={10}
            >
              {select.type != '' && subCategory?.filters && (
                <>
                  {subCategory.filters.map((f, i) => {
                    return f.values.length == 0 &&
                      f.name != 'Дүүрэг' &&
                      f.name != 'Байршил' ? (
                      <Input
                        key={i}
                        onChange={(e) => setFilter(f.id, e)}
                        placeholder={capitalizeFirst(f.name)}
                      ></Input>
                    ) : (
                      <GridItem>
                        <Select
                          placeholder={f.name}
                          onChange={(e) => setFilter(f.id, e)}
                        >
                          {f.name == 'Дүүрэг'
                            ? districts?.map((d, ind) => {
                                return (
                                  <option value={d._id} key={ind}>
                                    {capitalizeFirst(d.name)}
                                  </option>
                                );
                              })
                            : f.name == 'Байршил'
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
                      </GridItem>
                    );
                  })}
                  <Textarea
                    placeholder={'Гарчиг'}
                    type="textarea"
                    height="100px"
                    whiteSpace={'nowrap'}
                    onChange={(e) =>
                      setSelectStatic((selectStatic) => ({
                        ...selectStatic,
                        title: e.target.value,
                      }))
                    }
                    value={selectStatic.title}
                  />
                  <Textarea
                    placeholder={'Дэлгэрэнгүй'}
                    type="textarea"
                    height="100px"
                    whiteSpace={'nowrap'}
                    value={selectStatic.description}
                    onChange={(e) =>
                      setSelectStatic((selectStatic) => ({
                        ...selectStatic,
                        description: e.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder={'Хаяг'}
                    value={selectStatic.position}
                    onChange={(e) =>
                      setSelectStatic((selectStatic) => ({
                        ...selectStatic,
                        position: e.target.value,
                      }))
                    }
                  />

                  {/* //Todo Thumbnail Photo */}

                  <GridItem colStart={1} colEnd={2}>
                    <Code>
                      Таны оруулсан эхний зураг зарны нүүр зураг болж харагдахыг
                      анхаарна уу
                    </Code>
                  </GridItem>

                  {/* //Todo: All Photo */}

                  <GridItem
                    colStart={{ base: 1, md: 2 }}
                    colEnd={{ base: 2, md: 4 }}
                  >
                    <VStack
                      rounded={10}
                      minH="100px"
                      // height={{
                      //   base: '400px',
                      //   base: '300px',
                      //   lg: '250px',
                      // }}
                      border={'1px dashed grey'}
                      overflow="hidden"
                    >
                      <Box
                        width="100%"
                        position={'relative'}
                        bgColor={'bgGrey'}
                        _hover={{
                          Button: {
                            bgColor: 'mainBlossom',
                          },
                        }}
                        textAlign="center"
                      >
                        <Input
                          type={'file'}
                          position="absolute"
                          height="100%"
                          width={'100%'}
                          left="0"
                          accept="image/png, image/jpg, image/jpeg"
                          borderStyle={'dashed'}
                          multiple
                          opacity="0"
                          cursor="pointer"
                          zIndex="10"
                          onChange={onSelectFile}
                        />

                        <Text my={3}>
                          Оруулж буй зарынхаа зурагнуудаа оруулна уу
                        </Text>
                      </Box>
                      <HStack
                        flexWrap={'wrap'}
                        gap={{ base: 1, md: 3 }}
                        justifyContent={'center'}
                      >
                        {selectedImages &&
                          selectedImages.map((image, index) => {
                            return (
                              <Box
                                position="relative"
                                key={image}
                                width={{
                                  base: '50px',
                                  md: '75px',
                                  lg: '100px',
                                }}
                                height={{
                                  base: '50px',
                                  md: '75px',
                                  lg: '100px',
                                }}
                                p={1}
                                border="2px solid"
                                borderColor={'bgGrey'}
                              >
                                <Image
                                  src={image}
                                  height="100%"
                                  width="100%"
                                  alt="upload"
                                  objectFit="cover"
                                />
                                <IconButton
                                  position="absolute"
                                  top="-5px"
                                  right="-5px"
                                  colorScheme="red"
                                  size="xs"
                                  icon={<MdDeleteForever />}
                                  p={2}
                                  onClick={() => deleteHandler(image)}
                                />
                              </Box>
                            );
                          })}
                      </HStack>
                    </VStack>
                  </GridItem>

                  <GridItem colStart={1} colEnd={{ base: 2, md: 4 }}>
                    <Divider my={1} />
                  </GridItem>

                  <GridItem colStart={1} colEnd={{ base: 2, md: 4 }}>
                    <Center>
                      <Button width="250px" onClick={() => createAd()}>
                        Илгээх
                      </Button>
                    </Center>
                  </GridItem>
                </>
              )}
            </Grid>
          </Box>
        </MainContainer>
      </Box>
    );
  } else {
    router.push('/login');
  }
}
