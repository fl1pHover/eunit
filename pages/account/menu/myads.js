import urls from '@/constants/api';
import { SkeletonText, Stack } from '@chakra-ui/react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdContent from '../../../components/home/adContent';

const Myads = () => {
  const [products, setProducts] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    setIsLoading(true);
    const token = getCookie('token');
    try {
      await fetch(`${urls['test']}/ad/ads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((d) => {
          console.log(d);
          setProducts(d);
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

  const router = useRouter();

  return (
    <Stack display={{ base: 'flex', md: 'none' }} mx={5}>
     
      <AdContent data={products} tlc={toLowerCase} title=" " />
    </Stack>
  );
};

export default Myads;
