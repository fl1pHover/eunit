import { Heading, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";

import Step1 from "@/components/createAd/step1";
import Step4 from "@/components/createAd/step4";

import StepButtons from "@/components/createAd/stepButtons";
import StepProgress from "@/components/createAd/stepProgress";
import FormTitle from "@/components/createAd/title";
import { ContainerX } from "@/lib/Container";

import Step3 from "@/components/createAd/step3";
import urls from "@/constants/api";
import { getSellType } from "@/context/functions";
import useAd from "@/util/useAd";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { getCookie } from "cookies-next";
export default function CreateAd({ categories, user }) {
  const toast = useToast();
  const router = useRouter();

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

  const [map, setMap] = useState();
  const [values, change, typeId] = useAd();
  // FILTER INFORMATION - FOR WHICH DATA TO DISPLAY
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
    phone: parseInt(user ? user.phone : 0),
  });
  // STEP 3IIN RAW IMAGE FILES
  const [images, setImages] = useState([]);

  // THIS EFFECT IS FOR FETCHING FILTER DATA FOR STEP2,STEP3,STEP4
  React.useEffect(() => {
    if (types.categoryName && types.subCategoryId) {
      try {
        passcategory[types.categoryId].subCategory.filter((item) => {
          if (item.href == types.subCategoryId) {
            axios
              .get(`${urls["test"]}/category/filters/${item._id}`)
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
        types.adType != "" &&
          types.categoryName != "" &&
          types.sellType != "" &&
          types.subCategoryId != ""
      );
    if (step == 0)
      return checkConditionOnNextStep(
        subCategory.steps[0].values.find((s) => values[s.type] == "")
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
    return booleanValue === undefined || booleanValue === "" || booleanValue
      ? setStep((prev) => prev + 1)
      : toast({
          title: "Та бүх талбарыг бөглөнө үү.",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
  };

  const sendAd = async () => {
    const token = getCookie("token");

    const filters = [];
    const pushedImages = [];
    subCategory.steps.map((s) => {
      s.values.map((v) => {
        if (s.step != "general") {
          filters.push({
            name: v.name,
            id: v.type,
            value: values[v.type],
            position: v.position,
            type: v.types,
            index: v.index,
            isSearch: v.isSearch ?? false,
            isUse: v.isUse ?? false,
          });
        } else {
          filters.push({
            name: v.name,
            id: v.type,
            value: generalData[v.type],
            position: v.position,
            type: v.types,
            index: v.index,
            isSearch: v.isSearch ?? false,
            isUse: v.isUse ?? false,
          });
        }
      });
    });

    let fImages = new FormData();

    images?.map((prev) => {
      fImages.append("images", prev);
    });
    try {
      await axios
        .post(`${urls["test"]}/ad/uploadFields`, fImages, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Headers": "*",
          },
        })
        .then((d) => (pushedImages = d.data));

      await axios
        .post(
          `${urls["test"]}/ad`,
          {
            images: pushedImages,
            title: generalData.title,
            description: generalData.desc,
            location: map,
            subCategory: subCategory._id,
            category: categories[types.categoryId]._id,
            sellType: getSellType(types.sellType),
            items: filters,
            adType: types.adType,
            adStatus: "pending",
            view: "hide",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Headers": "*",
              charset: "UTF-8",
            },
          }
        )
        .then((d) => {
          toast({
            title: "Амжилттай нэмэгдлээ.",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          router.reload();
        });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  const validateStep4 = async () => {
    setIsLoading(true);
    // filter hooson esehiig shalgah
    let emptyAd = subCategory.steps[2].values.find((f) => values[f.type] == "");
    if (emptyAd === undefined) {
      if (user?.status == "active") {
        await sendAd();
      } else {
        toast({
          title:
            "Та одоогоор зар илгээх боломжгүй байна. Email-ээ шалган Verify хийнэ үү",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Та бүх талбарыг бөглөнө үү.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handlePrevStep = () => {
    setStep((prev) => {
      return prev > -1 ? prev - 1 : prev;
    });
    top();
  };

  const top = () => {
    window.scrollTo(0, 0);
  };
  const libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC2u2OzBNo53GxJJdN3Oc_W6Yc42OmdZcE",
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
      lat: 47.91887307876936,
      lng: 106.91757202148438,
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
          hasFourStep={types?.categoryName === "realState"}
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
                <div key={index}>
                  <Step4
                    filter={filter}
                    state={values}
                    handle={change}
                    typeId={typeId}
                  />
                  <Heading variant="mediumHeading" className="mb-5 text-center">
                    Газрын зураг дээр байршлаа сонгоно уу
                  </Heading>
                  {isLoaded && (
                    <GoogleMap
                      className="shadow aspect-video"
                      options={mapOptions}
                      onClick={(e) => {
                        setMap(e.latLng.toJSON());
                      }}
                      zoom={14}
                      center={mapCenter}
                      mapTypeId={google.maps.MapTypeId.ROADMAP}
                      mapContainerStyle={{ width: "100%", height: "40vh" }}
                    >
                      <MarkerF
                        position={map}
                        onClick={() => {}}
                        animation={google.maps.Animation.DROP}
                      />
                    </GoogleMap>
                  )}
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
                    <Step4
                      filter={filter}
                      state={values}
                      handle={change}
                      typeId={typeId}
                    />
                  </div>
                </div>
              );
          }
        })}

        <StepButtons
          setStep={setStep}
          onNext={() => {
            handleNextStep(), top();
          }}
          onPrev={() => {
            handlePrevStep(), top();
          }}
          data={values}
          filter={subCategory?.steps}
          generalData={generalData}
          loading={isLoading}
          txt={step == 2 ? "Илгээх" : "Дараах"}
          step={step}
          map={map}
          // onClick={() => step == 2 && <CustomModal />}
        />
      </ContainerX>
    </div>
  );
  // router.push("/login");
}
//360
export async function getServerSideProps({ req, res }) {
  const response = await fetch(`${urls["test"]}/category`);
  const categories = await response.json();
  const token = getCookie("token", { req, res });

  if (!token)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  let userRes = await fetch(`${urls["test"]}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Headers": "*",
    },
  });
  let user = await userRes.json();
  return {
    props: { categories, user },
  };
}
