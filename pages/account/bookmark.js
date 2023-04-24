import AdCard from '@/components/home/adCard';
import CompareSelect from '@/components/Profile/CompareSelect';
import urls from '@/constants/api';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Bookmark = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = getCookie('user');
  const bookmarks = getCookie('bookmarks');
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [data, setData] = useState([]);
  const getData = async () => {
    setIsLoading(true);
    if (bookmarks)
      try {
        await axios
          .post(`${urls['test']}/ad/many/${0}/false`, JSON.parse(bookmarks))
          .then((d) => {
            setProducts(d.data.ads);
            setData(d.data);
            // setCategory(d.data.ads.fi)
            let c = [],
              s = [];
            d.data.ads.map((ad) => {
              if (c.length > 0) {
                if (c.find((a) => a == ad.category.name) === undefined) {
                  c.push(ad.category.name);
                }
              } else {
                c.push(ad.category.name);
              }
              if (s.length > 0) {
                if (s.find((a) => a == ad.subCategory.name) === undefined) {
                  s.push(ad.subCategory.name);
                }
              } else {
                s.push(ad.subCategory.name);
              }
            });
            setCategory(c);
            setSubCategory(s);
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
  }, [user]);

  return (
    <>
      <CompareSelect
        setProducts={setProducts}
        category={category}
        subCategory={subCategory}
      />

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
