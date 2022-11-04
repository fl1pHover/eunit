import { useEffect, useState } from "react";
import AdContent from "../components/home/adContent";
import CategorySelect from "../components/home/categorySelect";
import SwiperHeader from "../components/home/swiperHeader";
import ScrollTop from "../util/scrollTop";

// import dynamic from "next/dynamic";
// const SwiperHeader = dynamic(() => import("../components/home/swiperHeader"));
// const CategorySelect = dynamic(() =>
//      import("../components/home/categorySelect")
// );
// const AdContent = dynamic(() => import("../components/home/adContent"));

export default function Home() {
     const [products, setProducts] = useState("");
     const getData = async () => {
          try {
               await fetch("https://bom-location.herokuapp.com/ad")
                    .then((r) => r.json())
                    .then((d) => setProducts(d));
          } catch (error) {
               console.log(error);
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
               <AdContent data={products} />
               {/* <Loader /> */}

               <ScrollTop />
          </>
     );
}
