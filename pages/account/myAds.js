import urls from '@/constants/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import AdContent from '../../components/home/adContent';

const MyAds = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get('token');
  const getData = async () => {
    setIsLoading(true);
    try {
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
          .then((d) => setProducts(d.data));
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
  }, [token]);

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
