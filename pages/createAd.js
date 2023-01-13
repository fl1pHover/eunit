import AdLabel from "@/components/createAd/AdLabel";
import React from "react";
import Step1 from "@/components/createAd/step1";
import { ContainerX } from "@/lib/Container";
import { SectionTitle } from "@/lib/Title";
import mergeNames from "@/util/mergeNames";
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
} from "@chakra-ui/react";
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
    category: "",
    subCategory: "",
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
  // console.log("selectedIndex", selectedIndex);

  React.useEffect(() => {
    if (selectedIndex.subCategory && selectedIndex.category) {
      console.log(
        "passcategory[selectedIndex.category]",
        passcategory[selectedIndex.category]
      );
      try {
        passcategory[selectedIndex.category].subMenu.filter((f) => {
          if (f.href == selectedIndex.subCategory) {
            axios
              .get(`${urls["test"]}/category/filters/{id}/true?id=${f._id}`)
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
  }, [passcategory, selectedIndex]);
  console.log("subCategory", subCategory);

  // if (user)
  return (
    <div className="min-h-[80vh] py-10">
      <ContainerX>
        {/* <div className="text-center py-5 px-10">
            <SectionTitle>Зар Нэмэх</SectionTitle>
          </div> */}
        <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
          {step === 1 && (
            <Step1
              AdTypes={AdTypes}
              categories={passcategory}
              selectedIndex={selectedIndex}
              assignCategoryIdx={(id) => {
                setSelectedIndex((prev) => ({
                  ...prev,
                  category: id,
                }));
              }}
              assignSubCategoryIdx={(id) => {
                setSelectedIndex((prev) => ({
                  ...prev,
                  subCategory: id,
                }));
              }}
            />
          )}
          {step === 2 && <Step2 />}
        </div>
        <StepButtons
          onNext={() => setStep((prev) => prev + 1)}
          onPrev={() =>
            setStep((prev) => {
              return prev > 1 ? prev - 1 : prev;
            })
          }
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
