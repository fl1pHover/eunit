<<<<<<< HEAD
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
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import urls from '../constants/api';
import { AdTypes } from '../constants/enums';

import MainContainer from '../layout/mainContainer';

export default function CreateAd({ categories }) {
  const { user, districts, locations, token } = useAuth();
=======
import Step1 from '@/components/createAd/step1';
import { API_URL } from '@/constants/api';
import { AdTypes } from '@/constants/enums';
import { ContainerX } from '@/lib/Container';
import axios from 'axios';
import { useAuth } from 'context/auth';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

import Step2 from '@/components/createAd/step2';
import Step3 from '@/components/createAd/step3';
import Step4 from '@/components/createAd/step4';
import StepButtons from '@/components/createAd/stepButtons';
import StepProgress from '@/components/createAd/stepProgress';
import FormTitle from '@/components/createAd/title';
import { categories as localCategories } from '@/data/categories';

export default function CreateAd({ props }) {
  const { user, districts, locations, token, categories } = useAuth();
>>>>>>> f72cecd909702b38dd795ae4e0f9cb816283212e
  const router = useRouter();
  // // if (!user) router.push("/login");

  const [step, setStep] = useState(-1);
  const passcategory = useMemo(
    () => (categories?.length > 0 ? categories : localCategories),
    [categories]
  );

  const [selectedIndex, setSelectedIndex] = React.useState({
    category: false,
    subCategory: false,
  });

  const [subCategory, setSubCategory] = useState();
  const [filters, setFilters] = useState([]);
  const [adType, setAdType] = useState(AdTypes.sell.id); // yr ni bol zarah gsn utga "sell"

  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  const [positions, setPositions] = useState({
    district_id: '',
    committee_id: '',
    location_id: '',
    town_id: '',
  });

  const [positionNames, setPositionNames] = useState({
    district: '',
    location: '',
    committee: '',
    town: '',
  });

  React.useEffect(() => {
    console.log('calling it');
    if (selectedIndex.subCategory && selectedIndex.category) {
      try {
        passcategory[selectedIndex.category].subCategory.filter((f) => {
          //  MONGOLOOR HEREGLEH BISH ENGLISH IIG AVJ BN, HREF NI YG LOWERCASE TAI GOY
          // TAARJ BAIGAA BOLOHOOR F.NAME IIG F.HREF BOLGOJ UURCHILUV
          if (f.href == selectedIndex.subCategory) {
            axios
              .get(`${API_URL}/category/filters/{id}/false?id=${f._id}`)
              .then((d) => {
                setSubCategory(d.data?.subCategory);
                setFilters(d.data?.filters);
              });
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
    }
  }, [passcategory, selectedIndex]);

  // console.log("subCategory", subCategory);
  // console.log("positions", positions);
  const setFilter = (id, e) => {
    e.preventDefault();

<<<<<<< HEAD
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
=======
    filters.map((f) => {
      if (f.id == id) {
        f.value = e.target.value;
      }
    });
  };
  // if (user)
  return (
    <div className="min-h-[80vh] py-10">
      <ContainerX>
        {/* <div className="px-10 py-5 text-center">
            <SectionTitle>Зар Нэмэх</SectionTitle>
          </div> */}
        <StepProgress activeStep={step} />

        {step === -1 && (
          <>
            <FormTitle>Төрөл</FormTitle>
            <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
              <Step1
                AdTypes={AdTypes}
                categories={passcategory}
                selectedIndex={selectedIndex}
                assignCategoryIdx={(id) => {
                  setSelectedIndex((prev) => ({
                    ...prev,
                    category: id.toString(),
                  }));
                }}
                assignSubCategoryIdx={(id) => {
                  setSelectedIndex((prev) => ({
                    ...prev,
                    subCategory: id.toString(),
                  }));
                }}
              />
            </div>
          </>
        )}

        {filters?.map((f, i) => {
          if (step == i) {
            if (i == 0)
              return (
                <>
                  <FormTitle>Байршил</FormTitle>
                  <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
                    <Step2
                      {...{ subCategory, districts, locations, positions }}
                      setDistrictId={(disId) =>
                        setPositions((prev) => ({
                          ...prev,
                          district_id: disId,
                        }))
                      }
                      setLocationId={(locId) =>
                        setPositions((prev) => ({
                          ...prev,
                          location_id: locId,
                        }))
                      }
                      setCommitteeId={(comId) =>
                        setPositions((prev) => ({
                          ...prev,
                          committee_id: comId,
                        }))
                      }
                      setTownId={(townId) =>
                        setPositions((prev) => ({ ...prev, town_id: townId }))
                      }
                      setPositionNames={setPositionNames}
                      positionNames={positionNames}
                    />
                  </div>
                </>
              );
            if (i == 1)
              return (
                <>
                  <FormTitle>Дэлгэрэнгүй мэдээлэл</FormTitle>
                  <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
                    <Step4 filter={f} />
                  </div>
                </>
              );
            if (i == 2)
              return (
                <>
                  <FormTitle>Ерөнхий мэдээлэл</FormTitle>
                  <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
                    <Step3 filter={f} />
                  </div>
                </>
              );
          }
        })}

        <StepButtons
          onNext={() => setStep((prev) => prev + 1)}
          onPrev={() => setStep((prev) => (prev > 1 ? prev - 1 : prev))}
        />
      </ContainerX>
    </div>
  );
  // router.push("/login");
}
export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/category`);
  const resjson = await res.json();
>>>>>>> f72cecd909702b38dd795ae4e0f9cb816283212e

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
                <Select
                  size="sm"
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
                    size="sm"
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
                    size="sm"
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
                  <GridItem>
                    <Select
                      size="sm"
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
                    </Select>
                  </GridItem>
                  <GridItem>
                    <Select
                      size="sm"
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
                    </Select>
                  </GridItem>
                  <GridItem>
                    <Input
                      onChange={(e) =>
                        setPositions((positions) => ({
                          ...positions,
                          committee_id: e.target.value,
                        }))
                      }
                      placeholder={capitalizeFirst('Хороо')}
                    ></Input>
                  </GridItem>
                  <GridItem>
                    <Input
                      onChange={(e) =>
                        setPositions((positions) => ({
                          ...positions,
                          town_id: e.target.value,
                        }))
                      }
                      placeholder={capitalizeFirst('Хотхон')}
                    ></Input>
                  </GridItem>
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
