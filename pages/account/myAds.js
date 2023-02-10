import urls from '@/constants/api';
import axios from 'axios';
import { getCookie } from 'cookies-next';

import { useEffect, useState } from 'react';
import AdContent from '../../components/home/adContent';

const MyAds = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      const token = getCookie('token');
      console.log(token);
      if (token)
        await axios
          .post(
            `${urls['test']}/ad/user`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((d) => {
            setProducts(d.data);
          })
          .then((a) => setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  const toLowerCase = (text) => {
    if (text) {
      return text.toLowerCase();
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AdContent
        data={products}
        tlc={toLowerCase}
        title=" "
        showLink="hidden"
      />
    </>
  );
};

export default MyAds;
