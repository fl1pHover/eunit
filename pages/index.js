import AdContent from "./components/home/adContent";
import CategorySelect from "./components/home/categorySelect";
import SwiperHeader from "./components/home/swiperHeader";
import ScrollTop from "./util/scrollTop";

export default function Home() {
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
