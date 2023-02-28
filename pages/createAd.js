import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

import { useAuth } from 'context/auth';

import Step1 from '@/components/createAd/step1';
import Step4 from '@/components/createAd/step4';

import StepButtons from '@/components/createAd/stepButtons';
import StepProgress from '@/components/createAd/stepProgress';
import FormTitle from '@/components/createAd/title';
import { ContainerX } from '@/lib/Container';

import Step3 from '@/components/createAd/step3';
import urls from '@/constants/api';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { getCookie } from 'cookies-next';
export default function CreateAd({ categories }) {
  const toast = useToast();
  const { user } = useAuth(); // TODOs: user: 403 BAD REQUEST

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
    phone: parseInt(user?.phone ?? 0),
  });
  // STEP 3IIN RAW IMAGE FILES
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  // THIS EFFECT IS FOR FETCHING FILTER DATA FOR STEP2,STEP3,STEP4
  React.useEffect(() => {
    if (types.categoryName && types.subCategoryId) {
      try {
        passcategory[types.categoryId].subCategory.filter((item) => {
          if (item.href == types.subCategoryId) {
            axios
              .get(`${urls['test']}/category/filters/${item._id}/false`)
              .then((res) => {
                setSubCategory(res.data);
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
  // checking validation of steps in here
  const handleNextStep = () => {
    if (step === -1)
      return checkConditionOnNextStep(
        types.adType != '' &&
          types.categoryName != '' &&
          types.sellType != '' &&
          types.subCategoryId != ''
      );
    if (step == 0)
      return checkConditionOnNextStep(
        subCategory.steps[0].values.find((s) => s.input == '')
      );
    if (step === 1)
      return checkConditionOnNextStep(
        generalData.price &&
          generalData.area &&
          generalData.unitPrice &&
          generalData.title &&
          generalData.desc
      );
    // if (step === 2) return <CustomModal />;
    if (step === 2) return validateStep4();
  };

  const checkConditionOnNextStep = (booleanValue) => {
    return booleanValue === undefined || booleanValue === '' || booleanValue
      ? setStep((prev) => prev + 1)
      : toast({
          title: 'Та бүх талбарыг бөглөнө үү.',
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
  };

  const sendAd = async () => {
    const token = getCookie('token');
    const f = new FormData();
    const selectedFilters = subCategory.steps[0].values;
    selectedFilters.push({
      type: 'price',
      input: generalData.price,
      name: 'Үнэ',
    });
    selectedFilters.push({
      type: 'phone',
      input: generalData.phone,
      name: 'Утасны дугаар',
    });
    selectedFilters.push({
      type: 'area',
      input: generalData.area,
      name: 'Талбай',
    });
    selectedFilters.push({
      type: 'unitPrice',
      input: generalData.unitPrice,
      name: 'Нэгж талбайн үнэ',
    });
    let finalFilters = selectedFilters.concat(subCategory.steps[2].values);
    let copiedFilters = JSON.parse(JSON.stringify(finalFilters));
    copiedFilters.map((f) => (f.value = []));

    f.append('title', generalData.title);
    f.append('description', generalData.desc);
    subCategory.steps[1].values = selectedFilters;
    f.append('location', JSON.stringify(map));
    f.append('types', types.sellType);
    f.append('adTypes', types.adType);
    f.append('subCategory', subCategory._id);
    f.append('category', categories[types.categoryId]._id);
    f.append('filters', JSON.stringify(copiedFilters));
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
        .then((d) => {
          toast({
            title: 'Амжилттай нэмэгдлээ.',
            status: 'success',
            duration: 1000,
            isClosable: true,
          });
          router.reload();
          // router.push('/');
        });
      console.log(ad);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const validateStep4 = async () => {
    setIsLoading(true);
    // filter hooson esehiig shalgah
    let emptyAd = subCategory.steps[2].values.find((f) => f.input == '');
    if (emptyAd === undefined) {
      await sendAd();
    }
    console.log(emptyAd);
    setIsLoading(false);
  };

  const handlePrevStep = () => {
    setStep((prev) => {
      return prev > -1 ? prev - 1 : prev;
    });
  };
  const libraries = useMemo(() => ['places'], []);

  const [markerActive, setMarkerActive] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC2u2OzBNo53GxJJdN3Oc_W6Yc42OmdZcE',
    libraries: libraries,
  });
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      // clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );
  const mapCenter = useMemo(
    () => ({
      lat: 47.9186367,
      lng: 106.9164856,
    }),
    []
  );
  if (!isLoaded) {
    return <p>Loading...</p>;
  }
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

        {subCategory?.steps?.map((filter, index) => {
          if (step == index) {
            if (index == 0)
              //STEP2: LOCATIONS - DISTRICT, LOCATION, COMMITTEE, TOWN

              return (
                <div>
                  <Step4 filter={filter} />
                  <GoogleMap
                    className="aspect-video"
                    options={mapOptions}
                    onClick={(e) => {
                      setMap(e.latLng.toJSON());
                    }}
                  zoom={14}
                    center={mapCenter}
                    mapTypeId={google.maps.MapTypeId.ROADMAP}
                    mapContainerStyle={{ width: '100%', height: '40vh' }}
                  >
                    {isLoaded && map && (
                      <MarkerF
                        position={map}
                        onClick={() => setMarkerActive(i)}
                        animation={google.maps.Animation.DROP}
                      />
                    )}
                  </GoogleMap>
                </div>
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
          data={generalData}
          loading={isLoading}
          txt={step == 2 ? 'Илгээх' : 'Дараах'}
          step={step}
          // onClick={() => step == 2 && <CustomModal />}
        />
      </ContainerX>
    </div>
  );
  // router.push("/login");
}
export async function getServerSideProps({ req, res }) {
  const response = await fetch(`${urls['test']}/category`);
  const categories = await response.json();
  const token = getCookie('token', { req, res });

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
