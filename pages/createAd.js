import Step1 from '@/components/createAd/step1';

import Step2 from '@/components/createAd/step2';
import Step3 from '@/components/createAd/step3';
import Step4 from '@/components/createAd/step4';
import StepButtons from '@/components/createAd/stepButtons';
import StepProgress from '@/components/createAd/stepProgress';
import FormTitle from '@/components/createAd/title';
import { AdTypes } from '@/constants/enums';
import { categories as localCategories } from '@/data/categories';
import { ContainerX } from '@/lib/Container';
import axios from 'axios';
import urls from 'constants/api';
import { useAuth } from 'context/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

export default function CreateAd({ props }) {
  const { user, districts, locations, categories } = useAuth();
  const router = useRouter();
  const [gen, setGen] = useState({
    area: '',
    price: '',
    phone: '',
    unitPrice: '',
  });
  const [general, setGeneral] = useState({
    title: '',
    description: '',
    adType: '',
  });
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
  const token = Cookies.get('token');
  React.useEffect(() => {
    console.log('calling it');
    if (selectedIndex.subCategory && selectedIndex.category) {
      try {
        passcategory[selectedIndex.category].subCategory.filter((f) => {
          //  MONGOLOOR HEREGLEH BISH ENGLISH IIG AVJ BN, HREF NI YG LOWERCASE TAI GOY
          // TAARJ BAIGAA BOLOHOOR F.NAME IIG F.HREF BOLGOJ UURCHILUV
          if (f.href == selectedIndex.subCategory) {
            axios
              .get(`${urls['test']}/category/filters/{id}/false?id=${f._id}`)
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

  const createAd = async () => {
    const f = new FormData();
    const selectedFilters = filters[2];
    selectedFilters.push({
      id: 'price',
      value: gen.price,
    });
    selectedFilters.push({
      id: 'area',
      value: gen.area,
    });
    selectedFilters.push({
      id: 'phone',
      value: gen.phone,
    });
    selectedFilters.push({
      id: 'unitPrice',
      value: Math.round(gen.price / gen.area),
    });

    f.append('title', general.title);
    f.append('description', general.description);
    f.append(
      'positions',
      JSON.stringify({
        district_id: positions.district_id,
        committee_id: positions.committee_id,
        location_id: positions.location_id,
        town: {
          value: positions.town_id,
          values: [],
          name: 'town',
        },
      })
    );
    f.append('types', adType)
    f.append('adTypes', general.adType);
    f.append('filters', JSON.stringify(selectedFilters));
    f.append('subCategory', subCategory._id);
    f.append('category', categories[selectedIndex.category]._id);

    let ad = await axios.post(`${urls['test']}/ad`, f, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(ad);
  };
  const setFilter = (id, e) => {
    e.preventDefault();

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
                      {...{
                        subCategory,
                        districts,
                        locations,
                        positions,
                      }}
                      town={f.filter((t) => t.id == 'town')}
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
                    <Step4
                      filter={f}
                      setGeneral={setGeneral}
                      filters={gen}
                      setFilters={setGen}
                    />
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
          step={step}
          onNext={() => (step == 2 ? createAd() : setStep((prev) => prev + 1))}
          onPrev={() => setStep((prev) => (prev > -1 ? prev - 1 : prev))}
        />
      </ContainerX>
    </div>
  );
  // router.push("/login");
}
export async function getServerSideProps() {
  const res = await fetch(`${urls['test']}/category`);
  const resjson = await res.json();

  const categories = resjson?.categories;
  return {
    props: { categories },
  };
}
