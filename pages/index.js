import { useEffect, useState } from 'react';
import AdContent from '../components/home/adContent';
import CategorySelect from '../components/home/categorySelect';
import SwiperHeader from '../components/home/swiperHeader';
import ScrollTop from '../lib/ScrollTop';

export default function Home() {
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
  // async function getData() {
  //      const res = await fetch("http://192.168.1.49:3000/ad")
  //           .then(async (r) => {
  //                let rs = await r.json();
  //                console.log(rs);
  //           })
  //           .catch((err) => console.log(err.message));
  // }
  // useEffect(() => {
  //      getData();
  // }, []);

  return (
    <>
      <SwiperHeader />
      <CategorySelect />
      <AdContent data={products} tlc={toLowerCase} />
      <AdContent data={products} tlc={toLowerCase} title="Тээврийн хэрэгсэл" />
      <AdContent data={products} tlc={toLowerCase} title="Компьютер" />
      <AdContent data={products} tlc={toLowerCase} title="Гар утас" />
      <AdContent data={products} tlc={toLowerCase} title="Цахилгаан бараа" />
      <AdContent data={products} tlc={toLowerCase} title="Гэр ахуйн бараа" />
      <ScrollTop />
    </>
  );
}
