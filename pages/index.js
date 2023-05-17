import AdContent from "@/components/home/adContent";
import CategorySelect from "@/components/home/categorySelect";
import ProAdContent from "@/components/home/proAdContent";
import SwiperHeader from "@/components/home/swiperHeader";
import urls from "@/constants/api";
import { ContainerX } from "@/lib/Container";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// import required modules

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [ads, setAds] = useState();
  const [sAds, setSAds] = useState();
  const { data: session } = useSession();
  const [limitAd, setLimitAd] = useState(0);
  const token = getCookie("token");
  const toast = useToast();
  const getAds = async () => {
    try {
      setIsLoading(true);
      const resAds = await fetch(`${urls["test"]}/ad/${0}`);
      const ads = await resAds.json();
      setAds(ads.defaultAds);
      setSAds(ads.specialAds);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };
  const login = async () => {
    await axios
      .post(`${urls["test"]}/auth/login`, {
        name: session.user.name,
        email: session.user.email,
        profileImg: session.user.image,
      })
      .then((d) => {
        if (d.data.status) {
          setCookie("token", d.data.token);
        } else {
          toast({
            duration: 5000,
            title:
              d.data?.message == "banned"
                ? "Бандуулсан хэрэглэгч байна."
                : d.data.message,
          });
        }
      });
  };
  useEffect(() => {
    if (session?.user) {
      login();
    }
  }, [session?.user?.email]);
  useEffect(() => {
    getAds();
  }, []);
  return (
    <>
      <SwiperHeader />
      <CategorySelect />

      <ContainerX className="py-6">
        {/* <Heading className="">Шинэ зарууд</Heading> */}
        {sAds?.ads.length > 0 && (
          <ProAdContent
            title="Онцгой зар"
            data={{
              ads: sAds.ads,
              limit: sAds.limit,
            }}
            showLink=""
            pg={false}
            inCat={false}
          />
        )}

        {ads?.ads.length > 0 && (
          <AdContent
            data={{
              ads: ads.ads,
              limit: ads.limit,
            }}
            showLink=""
            pg={false}
            inCat={false}
          />
        )}
      </ContainerX>
    </>
  );
}
