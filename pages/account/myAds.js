import urls from '@/constants/api';
import axios from 'axios';

import { useEffect, useState } from 'react';
import AdContent from '../../components/home/adContent';

const MyAds = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      await axios
        .post(`${urls['test']}/ad/many/${0}`, user.ads)
        .then((d) => {
          setProducts(d.data);
        })
        .then((a) => setIsLoading(false));
    } catch (error) {
      console.log(error);
      setIsLoading(false)
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
