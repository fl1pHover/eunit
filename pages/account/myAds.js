import AdCard from "@/components/home/adCard";
import FilterAd from "@/components/Profile/filterAd";
import urls from "@/constants/api";
import { stopPropagation } from "@/context/functions";
import { brk, STYLES } from "@/styles/index";
import Alerting from "@/util/Alert";
import mergeNames from "@/util/mergeNames";
import { Radio, RadioGroup, useToast } from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MyAds = ({ user }) => {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [checker, setChecker] = useState(false);
  const [num, setNum] = useState(0);
  const [data, setData] = useState([]);
  const router = useRouter();
  const toast = useToast();
  const token = getCookie("token");

  const toLowerCase = (text) => {
    if (text) {
      return text.toLowerCase();
    }
  };
  const getAds = async () => {
    try {
      await axios
        .post(`${urls["test"]}/ad/many/${num}/true`, user.ads, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((d) => {
          setAds(d.data);
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
    }
  };
  useEffect(() => {
    if (user) {
      getAds();
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      getAds();
    }
  }, [num]);

  const adStatusChecker = async (status) => {
    let ad = propAds.ads.filter((p) => p.adStatus == status);
    setAds({ ads: ad, limit: ad.length });
  };
  const filterCategory = async (cate, value) => {
    await getData();
    if (cate == "category") {
      let ads = products.ads.filter((ad) => ad.category.name == value);
      setProducts();
    }
  };
  const restoreAd = async (id) => {
    try {
      if (token) {
        let ad = await axios
          .get(`${urls["test"]}/ad/update/${id}/pending`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Headers": "*",
            },
          })
          .then((d) => {
            toast({
              title: "Зар сэргээгдлээ.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            router.reload();
          });
      }
    } catch (error) {}
  };
  const deleteAd = async (id) => {
    try {
      if (token) {
        let ad = await axios
          .delete(`${urls["test"]}/ad/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Headers": "*",
            },
          })
          .then((d) => {
            toast({
              title: "Зар устгагдлаа.",
              status: "warning",
              duration: 5000,
              isClosable: true,
            });
            router.reload();
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeAdType = async (id) => {
    try {
      if (token) {
        let ad = await axios
          .get(`${urls["test"]}/ad/adType/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Headers": "*",
            },
          })
          .then((d) => {
            if (d.data == "true" || d.data) {
              toast({
                title: "Амжилттай.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            } else {
              toast({
                title: "E-unit үлдэгдэл хүрэлцэхгүй байна.",
                status: "warning",
                duration: 5000,
                isClosable: true,
              });
            }
          });
      }
    } catch (error) {
      toast({
        title: "Алдаа гарлаа.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <div className={mergeNames("flex flex-col gap-4 mt-5", brk)}>
        <div className="flex flex-col w-full">
          <div className="flex gap-4">
            <FilterAd
              plc="Бүх төрөл"
              onChange={(e) => {
                if (e.target.value != "") {
                  let ads = data.ads.filter(
                    (d) => d.category.name == e.target.value
                  );
                  setProducts({ ads, limit: data.limit });
                } else {
                  setProducts(data);
                }
              }}
            >
              {category?.map((p, i) => {
                return (
                  <option value={p} key={i}>
                    {p}
                  </option>
                );
              })}
            </FilterAd>
            <FilterAd
              plc="Бүх дэд төрөл"
              onChange={(e) => {
                if (e.target.value != "") {
                  let ads = data.ads.filter(
                    (d) => d.subCategory.name == e.target.value
                  );
                  setProducts({ ads, limit: data.limit });
                } else {
                  setProducts(data);
                }
              }}
            >
              {subCategory?.map((p, i) => {
                return (
                  <option value={p} key={i}>
                    {p}
                  </option>
                );
              })}
            </FilterAd>
          </div>
          <RadioGroup
            className="flex justify-end gap-4 mt-4 whitespace-nowrap"
            defaultValue="1"
          >
            <Radio
              className="font-bold text-green-400 "
              colorScheme="green"
              onChange={(e) => {
                if (e.target.checked) {
                  adStatusChecker("created");
                }
              }}
              value="1"
            >
              Нэмсэн зарууд
            </Radio>
            <Radio
              className="font-bold text-yellow-200 whitespace-nowrap"
              colorScheme="yellow"
              onChange={(e) => {
                if (e.target.checked) {
                  adStatusChecker("pending");
                }
              }}
              value="2"
            >
              Хүлээгдэж байгаа
            </Radio>
            <Radio
              className="font-bold text-blue-400 whitespace-nowrap"
              onChange={(e) => {
                if (e.target.checked) adStatusChecker("returned");
              }}
              value="3"
            >
              Буцаагдсан зар
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <Alerting />
      <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1 ">
        {ads?.ads?.map((item, key) => {
          return (
            <AdCard
              setData={setAds}
              data={ads}
              admin={true}
              key={key}
              changeAd={(e) => {
                stopPropagation(e);
                changeAdType(item._id);
              }}
              item={item || {}}
              isDelete={true}
              deleteFunc={(e) => {
                stopPropagation(e);
                if (item.adStatus == "deleted") {
                  restoreAd(item._id);
                } else {
                  deleteAd(item._id);
                }
              }}
            />
          );
        })}
      </div>
      <ul className="flex float-right list-style-none">
        <li className="mx-2">
          <button
            className={mergeNames(STYLES.notActive)}
            onClick={() => {
              if (num > 0) {
                let n = num - 1;
                setNum(n);
              }
            }}
          >
            Өмнөх
          </button>
        </li>
        {user?.ads?.length &&
          [...Array(Math.ceil(user?.ads?.length / 10)).keys()].map((l, i) => {
            // [...Array(Math.ceil(products.limit / 10)).keys()].map((l) => {
            return (
              <li className={l == num ? "active mx-1" : "mx-1"} key={i}>
                <button
                  className={mergeNames(
                    l == num ? STYLES.active : STYLES.notActive
                  )}
                  onClick={() => {
                    setNum(l);
                  }}
                >
                  {l + 1}
                </button>
              </li>
            );
          })}

        <li className="mx-2">
          <button
            className={mergeNames(STYLES.notActive)}
            onClick={() => {
              if (user?.ads?.length > 10) {
                let n = num + 1;
                setNum(n);
              }
            }}
          >
            Дараах
          </button>
        </li>
      </ul>
    </>
  );
};

export default MyAds;
export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });

  if (token) {
    try {
      const response = await fetch(`${urls["test"]}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await response.json();
      // const adRes = await

      return {
        props: {
          user: user,
        },
      };
    } catch (err) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
