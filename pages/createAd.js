import React from "react";
import Step1 from "@/components/createAd/step1";
import { ContainerX } from "@/lib/Container";
import { SectionTitle } from "@/lib/Title";
import mergeNames from "@/util/mergeNames";
import axios from "axios";
import { useAuth } from "context/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import { API_URL } from "@/constants/api";
import { AdTypes } from "@/constants/enums";

import { categories as localCategories } from "@/data/categories";
import StepButtons from "@/components/createAd/stepButtons";
import Step2 from "@/components/createAd/step2";
import StepProgress from "@/components/createAd/stepProgress";
import Step3 from "@/components/createAd/step3";
import Step4 from "@/components/createAd/step4";
import FormTitle from "@/components/createAd/title";

export default function CreateAd({ categories }) {
  const { user, districts, locations, token } = useAuth();
  const router = useRouter();
  // // if (!user) router.push("/login");

  const [step, setStep] = useState(1);
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
    district_id: "",
    committee_id: "",
    location_id: "",
    town_id: "",
  });

  const [positionNames, setPositionNames] = useState({
    district: "",
    location: "",
    committee: "",
    town: "",
  });

  React.useEffect(() => {
    console.log("calling it");
    if (selectedIndex.subCategory && selectedIndex.category) {
      try {
        passcategory[selectedIndex.category].subCategory.filter((f) => {
          //  MONGOLOOR HEREGLEH BISH ENGLISH IIG AVJ BN, HREF NI YG LOWERCASE TAI GOY
          // TAARJ BAIGAA BOLOHOOR F.NAME IIG F.HREF BOLGOJ UURCHILUV
          if (f.href == selectedIndex.subCategory) {
            axios
              .get(`${API_URL}/category/filters/{id}/true?id=${f._id}`)
              .then((d) => {
                setSubCategory(d.data);
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

  // if (user)
  return (
    <div className="min-h-[80vh] py-10">
      <ContainerX>
        {/* <div className="text-center py-5 px-10">
            <SectionTitle>Зар Нэмэх</SectionTitle>
          </div> */}
        <StepProgress activeStep={step} />

        {step === 1 && (
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
        {step === 2 && (
          <>
            <FormTitle>Байршил</FormTitle>
            <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
              <Step2
                {...{ subCategory, districts, locations, positions }}
                setDistrictId={(disId) =>
                  setPositions((prev) => ({ ...prev, district_id: disId }))
                }
                setLocationId={(locId) =>
                  setPositions((prev) => ({ ...prev, location_id: locId }))
                }
                setCommitteeId={(comId) =>
                  setPositions((prev) => ({ ...prev, committee_id: comId }))
                }
                setTownId={(townId) =>
                  setPositions((prev) => ({ ...prev, town_id: townId }))
                }
                setPositionNames={setPositionNames}
                positionNames={positionNames}
              />
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <FormTitle>Ерөнхий мэдээлэл</FormTitle>
            <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
              <Step3 />
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <FormTitle>Дэлгэрэнгүй мэдээлэл</FormTitle>
            <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
              <Step4 />
            </div>
          </>
        )}
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

  const categories = resjson?.categories;

  return {
    props: { categories },
  };
}
