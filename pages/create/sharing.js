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
import { useSelector } from "react-redux";
import SharingUpload from "./SharingUpload";
// import SharingStepButtons from "@/components/createAd/sharingStepButton";
export default function SharingAd() {
  const toast = useToast();

  const router = useRouter();
  // // if (!user) router.push("/login");
  const { user } = useSelector((state) => state.user);
  const [step, setStep] = useState(-2);
  const { categories } = useSelector((state) => state.categories);

  //  STEP 1 DATA => HURUHNGIIN TURUL, DED TURUL, ZARIIN TURUL, ZARAH TURUL
  const [types, setTypes] = useState({
    categoryId: false,
    categoryName: false,
    subCategoryId: false,
    sellType: false,
    adType: false,
  });
  const [values, change, typeId] = useAd();
  const [map, setMap] = useState();

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
    file: [],
    images: [],
    phone: parseInt(user?.phone ?? 0),
  });
  // STEP 3IIN RAW IMAGE FILES
  const [images, setImages] = useState([]);

  // THIS EFFECT IS FOR FETCHING FILTER DATA FOR STEP2,STEP3,STEP4
  React.useEffect(() => {
    if (types.categoryName && types.subCategoryId) {
      try {
        categories[types.categoryId].subCategory.filter((item) => {
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
  }, [types.categoryId, types.subCategoryId, types.categoryName]);
  const [isLoading, setIsLoading] = useState(false);
  // checking validation of steps in here
  const handleNextStep = () => {
    if (step === -2)
      return checkConditionOnNextStep(
        types.adType != "" &&
          types.categoryName != "" &&
          types.sellType != "" &&
          types.subCategoryId != ""
      );
    if (step == -1)
      return checkConditionOnNextStep(
        subCategory.steps[0].values.find((s) => values[s.type] == "")
      );
    if (step === 0)
      return checkConditionOnNextStep(
        generalData.price &&
          generalData.area &&
          generalData.unitPrice &&
          generalData.title
      );
    // if (step === 2) return <CustomModal />;
    // if (step === 1) return validateStep4();
    if (step === 1) return checkConditionOnNextStep(true);
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
    const pushedFile = [];
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
    let fileUrl = new FormData();
    generalData.file?.map((prev) => fileUrl.append("images", prev));
    try {
      toast({
        title: "Амжилттай нэмэгдлээ.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      router.push("/account?tab=SharedAds");
      await axios
        .post(`${urls["test"]}/ad/uploadFields`, fImages, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Headers": "*",
          },
        })
        .then((d) => (pushedImages = d.data));
      await axios
        .post(`${urls["test"]}/ad/uploadFields`, fileUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Headers": "*",
          },
        })
        .then((d) => (pushedFile = d.data[0]));

      ad = await axios.post(
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
          adType: "sharing",
          file: pushedFile,
          adStatus: "checking",
          view: types.adType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Headers": "*",
            charset: "UTF-8",
          },
        }
      );
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  const validateStep4 = async () => {
    setIsLoading(true);
    // filter hooson esehiig shalgah
    let emptyAd = subCategory.steps[2].values.find((f) => f.input == "");
    if (emptyAd === undefined) {
      if (user?.status == "active") {
        await sendAd();
      } else {
        toast({
          title: "Та одоогоор зар илгээх боломжгүй байна.",
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
      return prev > -2 ? prev - 1 : prev;
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
          sharing={true}
          activeStep={step}
          handleClick={(stepId) => setStep(stepId)}
          hasFourStep={types?.categoryName === "realState"}
        />
        {
          // STEP1 TYPES: CATEGORY, SUBCATEGORY, ADTYPE, SELLTYPE
          step === -2 && (
            <Step1
              title="Таны зарсан хөрөнгийн төрөл"
              selltypeTitle="Борлуулсан төрөл"
              sharing={true}
              {...{ types, setTypes }}
              categories={categories}
            />
          )
        }
        {step === 2 && (
          <>
            <SharingUpload
              generalData={generalData.file}
              onChange={(e) => {
                setGeneralData((prev) => ({
                  ...prev,
                  file: [e.target.files[0]],
                }));
              }}
            />
          </>
        )}

        {subCategory?.steps?.map((filter, index) => {
          if (step == index - 1) {
            if (index - 1 == -1)
              //STEP2: LOCATIONS - DISTRICT, LOCATION, COMMITTEE, TOWN

              return (
                <div key={index}>
                  <Step4
                    handle={change}
                    filter={filter}
                    state={values}
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
            if (index - 1 == 0)
              return (
                <Step3
                  key={index}
                  filter={filter}
                  images={images}
                  setImages={setImages}
                  generalData={generalData}
                  setGeneralData={setGeneralData}
                  sharing
                />
              );

            if (index - 1 == 1)
              return (
                <div key={index}>
                  <FormTitle>Дэлгэрэнгүй мэдээлэл</FormTitle>
                  <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
                    <Step4
                      handle={change}
                      filter={filter}
                      state={values}
                      typeId={typeId}
                    />
                  </div>
                </div>
              );
          }
        })}

        <StepButtons
          sharing
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
export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });

  if (!token)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {},
  };
}
