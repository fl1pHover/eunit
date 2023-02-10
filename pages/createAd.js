import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

import { useAuth } from 'context/auth';

import Step1 from '@/components/createAd/step1';
import Step2 from '@/components/createAd/step2';
import Step4 from '@/components/createAd/step4';

import StepButtons from '@/components/createAd/stepButtons';
import StepProgress from '@/components/createAd/stepProgress';
import FormTitle from '@/components/createAd/title';
import { ContainerX } from '@/lib/Container';

import Step3 from '@/components/createAd/step3';
import urls from '@/constants/api';
import CustomModal from '@/util/CustomModal';
import { getCookie } from 'cookies-next';
export default function CreateAd({ categories }) {
  const toast = useToast();
  const { districts, locations } = useAuth(); // TODOs: user: 403 BAD REQUEST

  const router = useRouter();
  // // if (!user) router.push("/login");

  const [step, setStep] = useState(-1);
  const passcategory = useMemo(() => categories, [categories]);

  //  STEP 1 DATA => HURUHNGIIN TURUL, DED TURUL, ZARIIN TURUL, ZARAH TURUL
  const [types, setTypes] = useState({
    categoryId: false,
    categoryName: false,
    subCategoryId: false,
    sellType: false,
    adType: false,
  });
  // STEP-2 DATA => ID HADGALJ BAIGAA
  const [positions, setPositions] = useState({
    district_id: '',
    committee_id: '',
    location_id: '',
    town_id: '',
  });
  // STEP2 DATA => NAME (NER) HADGALJ BAIGA
  const [positionNames, setPositionNames] = useState({
    district: '',
    location: '',
    committee: '',
    town: '',
  });
  const [map, setMap] = useState({});
  // FILTER INFORMATION - FOR WHICH DATA TO DISPLAY
  const [filters, setFilters] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  // STEP3 IIN DATA - PRICE, AREA, UNITPRICE, TITLE, DESC, IMAGE
  const [generalData, setGeneralData] = useState({
    price: false,
    area: false,
    unitPrice: false,
    title: false,
    desc: false,
    imgSelected: false,
    images: [],
  });
  // STEP 3IIN RAW IMAGE FILES
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  // THIS EFFECT IS FOR FETCHING FILTER DATA FOR STEP2,STEP3,STEP4
  React.useEffect(() => {
    if (types.categoryName && types.subCategoryId) {
      try {
        passcategory[types.categoryId].subCategory.filter((item) => {
          console.log(types.subCategoryId, item.href);
          if (item.href == types.subCategoryId) {
            axios
              .get(`${urls['test']}/category/filters/${item._id}/false`)
              .then((res) => {
                setSubCategory(res.data?.subCategory);
                setFilters(res.data?.filters);
                console.log(res.data);
              });
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
    }
  }, [passcategory, types.categoryId, types.subCategoryId, types.categoryName]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocalData, setSelectedLocalData] = useState({
    district: positionNames?.district ?? false,
    location: positionNames?.location ?? false,
    committee: positionNames?.committee ?? false,
    town: positionNames?.town ?? false,
  });
  // checking validation of steps in here
  const handleNextStep = () => {
    if (step === -1)
      return checkConditionOnNextStep(
        types?.categoryName &&
          types?.subCategoryId &&
          types?.sellType &&
          types?.adType
      );
    if (step === 0) return validateStep2();
    if (step === 1)
      return checkConditionOnNextStep(
        generalData.price &&
          generalData.area &&
          generalData.unitPrice &&
          generalData.title &&
          generalData.desc &&
          generalData.imgSelected
      );
    if (step === 2) return <CustomModal />;
    // return validateStep4();
  };

  const checkConditionOnNextStep = (booleanValue) => {
    return booleanValue
      ? setStep((prev) => prev + 1)
      : toast({
          title: 'Та бүх талбарыг бөглөнө үү.',
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
  };

  const validateStep2 = () => {
    // CHECKING IF IT IS REALSTATE => IT HAS FOUR STEPS
    if (types?.categoryName === 'realState') {
      // console.table(positions);
      // THIS CONDITION IS FOR WHETHER IT HAS TOWN_ID -> LAND & OFFICE DEER XOTXOH NII ID GEJ BAIHGUI
      const hasTownId =
        types?.subCategoryId !== 'land' && types?.subCategoryId !== 'office';

      const mainValidation =
        positions?.location_id &&
        positions?.district_id &&
        positions?.committee_id;

      if (hasTownId) {
        console.log(positions);
        return checkConditionOnNextStep(mainValidation && positions?.town_id);
      }
      return checkConditionOnNextStep(mainValidation);
    } else {
      // TODOs: IF IT IS NOT REALSTATE -> MEANING IT HAS 3 STEPS
    }
  };
  const validateStep4 = async () => {
    setIsLoading(true);
    const token = getCookie('token');
    const f = new FormData();
    const selectedFilters = filters[2];
    selectedFilters.push({
      id: 'price',
      value: generalData.price,
      name: 'Үнэ',
    });
    selectedFilters.push({
      id: 'area',
      value: generalData.area,
      name: 'Талбай',
    });
    selectedFilters.push({
      id: 'unitPrice',
      value: generalData.unitPrice,
      name: 'Нэгж талбайн үнэ',
    });
    f.append('title', generalData.title);
    f.append('description', generalData.desc);
    f.append(
      'positions',
      JSON.stringify({
        district_id: selectedLocalData.district,
        committee_id: selectedLocalData.committee,
        location_id: selectedLocalData.location,
        town: {
          value: selectedLocalData.town,
          values: [],
          name: 'town',
        },
      })
    );
    f.append('location', JSON.stringify(map));
    f.append('types', types.sellType);
    f.append('adTypes', types.adType);
    f.append('subCategory', subCategory._id);
    f.append('category', categories[types.categoryId]._id);
    f.append('filters', JSON.stringify(selectedFilters));
    images?.map((prev) => {
      f.append('images', prev);
    });
    let ad;
    try {
      ad = await axios
        .post(`${urls['test']}/ad`, f, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Headers': '*',
          },
        })
        .then((d) => router.push('/'));
      console.log(ad);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => {
      return prev > -1 ? prev - 1 : prev;
    });
  };

  return (
    <div className="min-h-[80vh] py-10">
      <ContainerX>
        <StepProgress
          activeStep={step}
          handleClick={(stepId) => setStep(stepId)}
          hasFourStep={types?.categoryName === 'realState'}
        />
        {
          // STEP1 TYPES: CATEGORY, SUBCATEGORY, ADTYPE, SELLTYPE
          step === -1 && (
            <Step1 {...{ types, setTypes }} categories={passcategory} />
          )
        }

        {filters?.map((filter, index) => {
          if (step == index) {
            if (index == 0)
              //STEP2: LOCATIONS - DISTRICT, LOCATION, COMMITTEE, TOWN
              return (
                <Step2
                  selectedLocalData={selectedLocalData}
                  setSelectedLocalData={setSelectedLocalData}
                  key={index}
                  setMap={setMap}
                  map={map}
                  {...{
                    types,
                    districts,
                    locations,
                    positions,
                    setPositions,
                    positionNames,
                    setPositionNames,
                  }}
                />
              );
            if (index == 1)
              return (
                <Step3
                  key={index}
                  filter={filter}
                  images={images}
                  setImages={setImages}
                  generalData={generalData}
                  setGeneralData={setGeneralData}
                />
              );

            if (index == 2)
              return (
                <div key={index}>
                  <FormTitle>Дэлгэрэнгүй мэдээлэл</FormTitle>
                  <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
                    <Step4 filter={filter} />
                  </div>
                </div>
              );
          }
        })}

        <StepButtons
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          loading={isLoading}
          txt={step == 2 ? 'Илгээх' : 'Дараах'}
          onClick={() => step == 2 && <CustomModal />}
        />
      </ContainerX>
    </div>
  );
  // router.push("/login");
}
export async function getServerSideProps({ req, res }) {
  const response = await fetch(`${urls['test']}/category`);
  const resjson = await response.json();
  const token = getCookie('token', { req, res });
  const categories = resjson?.categories;
  if (!token)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  return {
    props: { categories },
  };
}
