import AdContent from "../components/home/adContent";
import CategorySelect from "../components/home/categorySelect";
import SwiperHeader from "../components/home/swiperHeader";
import ScrollTop from "../util/scrollTop";

export default function Home() {
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
          //TODO asdasd
          // asdasd
          <>
               <SwiperHeader></SwiperHeader>
               <CategorySelect />
               <AdContent />

               {/* Scroll */}
               <ScrollTop />
          </>
     );
}
