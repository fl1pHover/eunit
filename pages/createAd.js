import {
  Box,
  Button,
  Center,
  Code,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from 'context/auth';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import urls from '../constants/api';
import { AdTypes } from '../constants/enums';

import MainContainer from '../layout/mainContainer';

import { BomArea, BomSelect } from '../util/BomInput';

export default function CreateAd() {
  const { user, categories, districts, locations, token } = useAuth();
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
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [positions, setPositions] = useState({
    district_id: '',
    committee_id: '',
    location_id: '',
    town_id: '',
  });
  const uploadImage = async () => {
    images.map(async (i) => {
      const formData = new FormData();
      formData.append('file', i);
      formData.append('upload_preset', 'lubtonkg');

      await axios
        .post('http://api.cloudinary.com/v1_1/dosvc4rce/image/upload', formData)
        .then((res) => {
          setImageUrl((imageUrl) => [...imageUrl, res.data['secure_url']]);
        });
    });
    await createAd(false);
  };
  const createAd = async (upload) => {
    if (upload) {
      await uploadImage();
    } else {
      try {
        if (subCategory?.subCategory?._id && imageUrl.length > 0) {
          let token = Cookies.get('token');
          console.log(subCategory);
          axios
            .post(
              `${urls['test']}/ad`,
              {
                title: selectStatic.title,
                description: selectStatic.description,
                location: selectStatic.position,
                positions: positions,
                images: imageUrl,
                types: [adType],
                filters: filters,
                subCategory: subCategory.subCategory._id,
                category: categories[select.category]._id,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((d) => {
              setSelectStatic(
                (s) => ({ ...s, description: '', position: '', title: '' }),
                setPositions((positions) => ({
                  ...positions,
                  committee_id: '',
                  district_id: '',
                  location_id: '',
                  town_id: '',
                })),
                setAdType(AdTypes.sell),
                setImageUrl([]),
                setSelect((select) => ({
                  ...select,
                  category: '',
                  subCategory: '',
                }))
              );
            });
        }
      } catch (error) {
        console.log(error);
      }
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
              .get(`${urls['test']}/category/filters/{id}/true?id=${f._id}`)
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

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    setImages((images) => [...images, selectedFiles[0]]);
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
                <BomSelect
                  onChange={(e) =>
                    setSelect((select) => ({
                      ...select,
                      category: e.target.value,
                    }))
                  }
                  placeholder="Сонгох"
                  value={select.category}
                >
                  {categories?.map((c, i) => {
                    return (
                      <option value={i} key={i}>
                        {capitalizeFirst(c.name)}
                      </option>
                    );
                  })}
                </BomSelect>
              </HStack>
              {categories[select.category]?.subCategory && (
                <HStack>
                  <Text width={'100%'}>Дэд төрөл</Text>
                  <BomSelect
                    onChange={(e) =>
                      setSelect((select) => ({
                        ...select,
                        subCategory: e.target.value,
                      }))
                    }
                    placeholder="Сонгох"
                    value={select.subCategory}
                  >
                    {categories[select.category]?.subCategory?.map((t, i) => {
                      return (
                        <option value={t.name} key={i}>
                          {capitalizeFirst(t.name)}
                        </option>
                      );
                    })}
                  </BomSelect>
                </HStack>
              )}
              {select.subCategory && (
                <HStack>
                  <Text width={'100%'}>Борлуулах төрөл</Text>
                  <BomSelect
                    onChange={(e) => setAdType(e.target.value)}
                    value={adType}
                  >
                    {Object.keys(AdTypes).map((type, key) => {
                      return (
                        <option key={key} value={AdTypes[type].id}>
                          {AdTypes[type].name}
                        </option>
                      );
                    })}
                  </BomSelect>
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
                  <BomSelect
                    placeholder={'Дүүрэг'}
                    onChange={(e) =>
                      setPositions((positions) => ({
                        ...positions,
                        district_id: e.target.value,
                      }))
                    }
                  >
                    {districts?.map((d, ind) => {
                      return (
                        <option value={d._id} key={ind}>
                          {capitalizeFirst(d.name)}
                        </option>
                      );
                    })}
                  </BomSelect>

                  <BomSelect
                    placeholder={'Байршил'}
                    onChange={(e) =>
                      setPositions((positions) => ({
                        ...positions,
                        location_id: e.target.value,
                      }))
                    }
                  >
                    {locations?.map((d, ind) => {
                      if (positions?.district_id == d.district_id) {
                        return (
                          <option value={d._id} key={ind}>
                            {capitalizeFirst(d.name)}
                          </option>
                        );
                      }
                    })}
                  </BomSelect>

                  <FormControl variant="floating" isRequired>
                    <Input
                      onChange={(e) =>
                        setPositions((positions) => ({
                          ...positions,
                          committee_id: e.target.value,
                        }))
                      }
                      // placeholder={capitalizeFirst('Хороо')}
                      placeholder={capitalizeFirst(' ')}
                    />
                    <FormLabel>Хороо</FormLabel>
                  </FormControl>

                  <FormControl variant="floating" isRequired>
                    <Input
                      onChange={(e) =>
                        setPositions((positions) => ({
                          ...positions,
                          town_id: e.target.value,
                        }))
                      }
                      // placeholder={capitalizeFirst('Хороо')}
                      placeholder={capitalizeFirst(' ')}
                    />
                    <FormLabel>Хотхон</FormLabel>
                  </FormControl>

                  {subCategory.filters.map((f, i) => {
                    return f.values.length == 0 ? (
                      <Input
                        key={i}
                        onChange={(e) => setFilter(f.id, e)}
                        placeholder={capitalizeFirst(f.name)}
                      ></Input>
                    ) : (
                      <GridItem key={i}>
                        <Select
                          size="sm"
                          placeholder={f.name}
                          onChange={(e) => setFilter(f.id, e)}
                        >
                          {f.values?.map((d, ind) => {
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

                  {/* <FormControl variant="floating" isRequired>
                    <Input
                      placeholder={' '}
                      value={selectStatic.position}
                      onChange={(e) =>
                        setSelectStatic((selectStatic) => ({
                          ...selectStatic,
                          position: e.target.value,
                        }))
                      }
                    />
                    <FormLabel>Хаяг</FormLabel>
                  </FormControl> */}

                  <BomArea
                    placeholder="Гарчиг"
                    onChange={(e) =>
                      setSelectStatic((selectStatic) => ({
                        ...selectStatic,
                        title: e.target.value,
                      }))
                    }
                    value={selectStatic.title}
                  />
                  <BomArea
                    placeholder="Дэлгэрэнгүй"
                    value={selectStatic.description}
                    onChange={(e) =>
                      setSelectStatic((selectStatic) => ({
                        ...selectStatic,
                        description: e.target.value,
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
                        <InputF:\Projects\NextJs\bom-vv\public\images\Category\computer.jpg
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
                          onChange={(e) => onSelectFile(e)}
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
                        {selectedImages?.map((image, index) => {
                          return (
                            <Box
                              position="relative"
                              key={index}
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
                      <Button width="250px" onClick={() => createAd(true)}>
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
    return;
  }
}
