import { Heading, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import AdContent from '../../components/home/adContent';

const MyAds = () => {
  const [products, setProducts] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    setIsLoading(true);
    try {
      await fetch('https://bom-location.herokuapp.com/ad')
        .then((r) => r.json())
        .then((d) => setProducts(d))
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
      <Heading variant={'mediumHeading'}>
        <AdContent data={products} tlc={toLowerCase} title=" " />
      </Heading>

      <Stack display={{ base: 'flex', md: 'none' }}>
        <AdContent data={products} tlc={toLowerCase} title=" " />
      </Stack>
    </>
  );
};

export default MyAds;
