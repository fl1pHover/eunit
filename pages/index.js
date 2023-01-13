import axios from "axios";
import { useEffect, useState } from "react";
import AdContent from "@/components/home/adContent";
import CategorySelect from "@/components/home/categorySelect";
import SwiperHeader from "@/components/home/swiperHeader";
import urls, { API_URL } from "@/constants/api";
import { useAuth } from "@/context/auth";

export default function Home({ propAds }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setAds } = useAuth();
  // const { categories, setAds } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    if (typeof propAds === "object" && propAds && propAds.length > 0) {
      setAds(propAds);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propAds]);

  return (
    <>
      <SwiperHeader />
      <CategorySelect />
      {/* {categories?.map((c, i) => {
        let ad = propAds?.filter((a) => a.category == c._id);
        if (ad?.length > 0)
          return (
            <AdContent data={ad} key={i} tlc={toLowerCase} title={c.name} />
          );
      })} */}
      {propAds?.length > 0 && <AdContent data={propAds} />}
    </>
  );
}

export async function getServerSideProps({ params, query }) {
  const res = await fetch(`${API_URL}/ad`);
  const ads = await res.json();

  return {
    props: { propAds: ads },
  };
}
