import AdCard from '@/components/home/adCard';
import CompareSelect from '@/components/Profile/CompareSelect';
import FilterAd from '@/components/Profile/filterAd';
import urls from '@/constants/api';
import { useAuth } from '@/context/auth';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Image } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdCompareArrows } from 'react-icons/md';




const Bookmark = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const getData = async () => {
    setIsLoading(true);
    try {
      await axios
        .post(`${urls['test']}/ad/many/${0}/false`, user.bookmarks)
        .then((d) => {
          setProducts(d.data.ads);
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
      <CompareSelect />

      {/* <AdContent
        data={products}
        tlc={toLowerCase}
        title=" "
        showLink="hidden"
      /> */}
      <div className="grid grid-cols-2 gap-5 mt-5 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3">
        {products?.map((item, key) => (
          <AdCard key={key} item={item || {}} />
        ))}
      </div>
    </>
  );
};

export default Bookmark;

export async function getServerSideProps() {
  // const res = await fetch(`${urls['test']}/category`);
  // const resjson = await res.json();
  const token = Cookies.get('token');
  // const categories = resjson?.categories;
  if (!token)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
}
