import AdContent from '@/components/home/adContent';
import urls from '@/constants/api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AdCard from '@/components/home/adCard';

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
      setIsLoading(false);
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
      <div className="grid grid-cols-2 gap-5 mt-5 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3">
        {products?.ads?.map((item, key) => (
          <AdCard key={key} item={item || {}} />
        ))}
      </div>
      {/* <AdContent
        inCat
        data={products}
        tlc={toLowerCase}
        title=" "
        showLink="hidden"
      /> */}
    </>
  );
};

export default MyAds;
