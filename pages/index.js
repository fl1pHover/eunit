import AdContent from '@/components/home/adContent';
import CategorySelect from '@/components/home/categorySelect';
import SwiperHeader from '@/components/home/swiperHeader';
import urls from '@/constants/api';
import { useAuth } from '@/context/auth';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { useLoadScript } from '@react-google-maps/api';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

// import required modules

export default function Home({ propAds }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setAds, ads } = useAuth();
  const libraries = useMemo(() => ['places'], []);
  // const { categories, setAds } = useAuth();
  const [markerActive, setMarkerActive] = useState(null);
  const [limitAd, setLimitAd] = useState(0);

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
      lat: parseFloat(propAds[0]?.location?.lat) ?? 104.993857,
      lng: parseFloat(propAds[0]?.location?.lng) ?? 46.022469,
    }),
    []
  );
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
    console.log(propAds);
    if (typeof propAds === 'object' && propAds) {
      setAds(propAds.ads);
      setMarkerActive(0);
    }

    setIsLoading(false);
  }, [propAds?.ads]);
  if (!isLoaded) {
    return <p>Loading...</p>;
  }
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
      <div className="px-4 xl:px-28 lg:px-20 md:px-12 sm:px-14 xs:px-6">
        {ads && <AdContent data={ads} showLink="" />}
      </div>
      <ul className="flex float-right list-style-none">
        <li className="disabled">
          <button
            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 "
            // pointer-events-none focus:shadow-none
            tabindex="-1"
            onClick={() => {
              if (limitAd > 0) {
                setLimitAd(limitAd - 1);
                getAds(limitAd - 1);
              }
            }}
          >
            Өмнөх
          </button>
        </li>
        {propAds?.limit &&
          [...Array(Math.ceil(propAds.limit / 10)).keys()].map((l, i) => {
            return (
              <li key={i}>
                <button
                  className={mergeNames(
                    limitAd == i ? STYLES.active : STYLES.notActive
                  )}
                  onClick={() => {
                    setLimitAd(i);
                    getAds(i);
                  }}
                >
                  {i + 1}
                </button>
              </li>
            );
          })}
        <li>
          <button
            className={mergeNames(STYLES.notActive)}
            onClick={() => {
              if (limitAd < propAds?.limit) {
                setLimitAd(limitAd + 1);
                getAds(limitAd + 1);
              }
            }}
          >
            Дараах
          </button>
        </li>
      </ul>
    </>
  );
}
{
  /* {markerActive === i ? (
    <InfoWindow onCloseClick={() => setMarkerActive(null)}>
      <div>{m.title}</div>
    </InfoWindow>
  ) : null} */
}

export async function getServerSideProps({ params, query }) {
  const res = await fetch(`${urls['test']}/ad/${0}`);
  const ads = await res.json();

  return {
    props: { propAds: ads },
  };
}
