import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Myads = () => {
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

  const router = useRouter();

  return (
    <Stack display={{ base: 'flex', md: 'none' }} mx={5}>
      <div className="grid grid-cols-2 gap-5 mt-5 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3">
        {products &&
          products.map((item, key) => <AdCard key={key} item={item || {}} />)}
      </div>
      {/* <AdContent data={products} tlc={toLowerCase} title=" " /> */}
    </Stack>
  );
};

export default Myads;
