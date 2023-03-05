import AdCard from '@/components/home/adCard';
import urls from '@/constants/api';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Checkbox, Select } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

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

  const brk = 'md:flex-col lg:flex-row sm:flex-row';

  return (
    <>
      <div className={mergeNames('flex flex-col gap-4 mt-5', brk)}>
        <div className="flex w-full gap-4">
          <Select
            className={mergeNames(STYLES.select)}
            placeholder="Бүх төрөл "
          />
          <Select
            className={mergeNames(STYLES.select)}
            placeholder="Бүх дэд төрөл"
          />
        </div>
        <div className="flex flex-col justify-end">
          <Checkbox
            colorScheme="green"
            className="font-bold text-green-400 whitespace-nowrap"
          >
            Нэмсэн зарууд
          </Checkbox>
          <Checkbox className="font-bold text-primary whitespace-nowrap">
            Хүлээгдэж байгаа
          </Checkbox>
        </div>
      </div>

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
