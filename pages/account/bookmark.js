import AdCard from '@/components/home/adCard';
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

const CompareItem = () => {
  return (
    <div className="w-full h-full bg-white max-w-[250px] relative ">
      <Image src="" alt="compare ads image" />

      {/* Delete button*/}
      <div className="absolute delete -top-[10px] -right-[10px] rounded-full" />
    </div>
  );
};

const CompareSelect = () => {
  const router = useRouter();
  const [expand, setExpand] = useState(false);

  return (
    <div
      className={mergeNames(
        'fixed px-[10%] bottom-0 left-0',
        'bg-secondary/90 w-screen transition-all ease-in-out pb-[68px] md:pb-0',
        ' text-[12px] sm:text-base  z-20',
        expand ? 'h-[250px]' : 'h-0'
      )}
    >
      <button
        className="h-[50px] gap-2 px-5 bg-secondary/90 absolute -top-[65px] rounded-2xl left-[15px] flex place-items-center text-white  z-30"
        onClick={() => setExpand(!expand)}
      >
        <MdCompareArrows
          className={mergeNames('text-xl ', expand ? 'rotate-0' : 'rotate-180')}
        />
        <p className="text-[12px]">Харьцуулах</p>
      </button>
      <div className={mergeNames(STYLES.flexBetween, 'pt-5 text-white w-full')}>
        <p>
          Харьцуулах ( <span> 4</span>/4 )
        </p>
        <div className="flex gap-2 transition-all ease-in-out">
          <button>Цэвэрлэх</button>
          <button
            onClick={() => router.push('/bookmark')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-2xl"
          >
            Харьцуулах
          </button>
        </div>
      </div>
      <div className="grid h-[80%] grid-cols-4 md:gap-6 gap-1 py-5">
        {/* Compare item */}
        <CompareItem />
      </div>
    </div>
  );
};

const Bookmark = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const getData = async () => {
    setIsLoading(true);
    try {
      await axios
        .post(`${urls['test']}/ad/many/${0}`, user.bookmarks)
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
