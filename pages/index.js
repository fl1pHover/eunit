import Head from "next/head";

import styles from "../styles/Home.module.scss";
import Navbar from "./components/navbar";
import SwiperHeader from "./components/home/swiperHeader";
import CategorySelect from "./components/home/categorySelect";
import AdContent from "./components/home/adContent";

export default function Home() {
     return (
          // asdasd
          <>
               <SwiperHeader></SwiperHeader>
               <CategorySelect />
               <AdContent />
          </>
     );
}
