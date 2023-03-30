import CategorySelect from '@/components/home/categorySelect';
import SwiperHeader from '@/components/home/swiperHeader';
import urls from '@/constants/api';
import { useAuth } from '@/context/auth';
import { ContainerX } from '@/lib/Container';
import { useEffect, useState } from 'react';
// import required modules
import AdContent from '@/components/home/adContent';
import ProAdContent from '@/components/home/proAdContent';

export default function Home({ propAds }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setAds, ads } = useAuth();

  const [limitAd, setLimitAd] = useState(0);

  const getAds = async (num) => {
    try {
      await axios
        .get(`${urls['test']}/ad/${num}`)
        .then((d) => setAds(d.data.ads));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    if (typeof propAds === 'object' && propAds?.ads) {
      setAds(propAds);
    }

    setIsLoading(false);
  }, [propAds?.ads]);

  return (
    <>
      <SwiperHeader />
      <CategorySelect />

      <ContainerX classname="py-6">
        {/* <Heading className="">Шинэ зарууд</Heading> */}

        <ProAdContent
          title="Онцгой зар"
          data={ads}
          showLink="hidden"
          pg={false}
          inCat={false}
        />

        {ads && <AdContent data={ads} showLink="" pg={false} inCat={false} />}
      </ContainerX>
    </>
  );
}

export async function getServerSideProps({ params, query }) {
  try {
    const res = await fetch(`${urls['test']}/ad/${0}`);
    const ads = await res.json();
    return {
      props: { propAds: ads },
    };
  } catch (error) {
    console.error(error);
    return;
  }
}
