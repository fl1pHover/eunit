import AdContent from '@/components/home/adContent';
import CategorySelect from '@/components/home/categorySelect';
import ProAdContent from '@/components/home/proAdContent';
import SwiperHeader from '@/components/home/swiperHeader';
import urls from '@/constants/api';
import { ContainerX } from '@/lib/Container';
import { useEffect, useState } from 'react';
// import required modules

export default function Home({ defaultAds, specialAds }) {
  const [isLoading, setIsLoading] = useState(false);
  const [ads, setAds] = useState();
  const [sAds, setSAds] = useState();

  const [limitAd, setLimitAd] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    if (typeof defaultAds === 'object' && defaultAds?.ads) {
      setAds(defaultAds);
    }
    if (typeof specialAds === 'object' && specialAds?.ads) {
      setSAds(specialAds);
    }

    setIsLoading(false);
  }, [defaultAds, specialAds]);
  return (
    <>
      <SwiperHeader />
      <CategorySelect />

      <ContainerX className="py-6">
        {/* <Heading className="">Шинэ зарууд</Heading> */}
        {sAds?.ads.length > 0 && (
          <ProAdContent
            title="Онцгой зар"
            data={{
              ads: sAds.ads,
              limit: sAds.limit,
            }}
            showLink=""
            pg={false}
            inCat={false}
          />
        )}

        {ads?.ads.length > 0 && (
          <AdContent
            data={{
              ads: ads.ads,
              limit: ads.limit,
            }}
            showLink=""
            pg={false}
            inCat={false}
          />
        )}
      </ContainerX>
    </>
  );
}

export async function getServerSideProps({ params, query, req, res }) {
  try {
    const resAds = await fetch(`${urls['test']}/ad/${0}`);
    const ads = await resAds.json();

    return {
      props: { defaultAds: ads.defaultAds, specialAds: ads.specialAds },
    };
  } catch (error) {
    console.error(error);
    return;
  }
}
