import axios from 'axios';
import { useEffect, useState } from 'react';
import AdContent from '../components/home/adContent';
import CategorySelect from '../components/home/categorySelect';
import SwiperHeader from '../components/home/swiperHeader';
import urls from '../constants/api';
import { useAuth } from '../context/auth';
import ScrollTop from '../lib/ScrollTop';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { ads, categories, setAds } = useAuth();

  const toLowerCase = (text) => {
    if (text) {
      return text.toLowerCase();
    }
  };

  async function getData() {
    await axios
      .get(`${urls['test']}/ad`)
      .then((res) => {
        setAds(res.data);
      })
      .catch((err) => console.log(err.message));
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <SwiperHeader />
      <CategorySelect />
      {categories?.map((c, i) => {
        let ad = ads?.filter((a) => a.category == c._id);

        if (ad?.length > 0)
          return (
            <AdContent data={ad} key={i} tlc={toLowerCase} title={c.name} />
          );
      })}
      <ScrollTop />
    </>
  );
}
