import AdCard from "@/components/home/adCard";
import CompareSelect from "@/components/Profile/CompareSelect";
import urls from "@/constants/api";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NoAds } from "./myAds";

const Bookmark = () => {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [num, setNum] = useState(0);
  const { bookmarks } = useSelector((state) => state.bookmarks);
  const { user } = useSelector((state) => state.user);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [data, setData] = useState([]);
  const token = getCookie("token");
  const getData = async () => {
    setIsLoading(true);
    if (bookmarks)
      try {
        await axios
          .post(
            `${urls["test"]}/ad/many/${num}/false/10/created/all`,
            bookmarks
          )
          .then((d) => {
            setAds(d.data);
            setIsLoading(false);
            let c = [],
              s = [];
            d.data?.ads?.map((ad) => {
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
          });
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
  };

  const toLowerCase = (text) => {
    if (text) {
      return text.toLowerCase();
    }
  };
  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user, token]);

  return (
    <>
      <CompareSelect
        setProducts={setAds}
        category={category}
        subCategory={subCategory}
      />

      {/* <AdContent data={ads} tlc={toLowerCase} title=" " showLink="hidden" /> */}
      <div className="grid grid-cols-2 gap-5 mt-5 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3">
        {ads?.ads?.map((item, key) => (
          <AdCard key={key} item={item || {}} />
        ))}
      </div>
      {ads?.ads?.length == 0 && (
        <div className="h-[20vh] flex justify-center items-center w-full text-xl">
          Зар байхгүй байна
        </div>
      )}
    </>
  );
};

export default Bookmark;
