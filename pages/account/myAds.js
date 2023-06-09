import AdCard from "@/components/home/adCard";
import FilterAd from "@/components/Profile/filterAd";
import urls from "@/constants/api";
import { setAdType, updateBookmarks } from "@/context/functions";
import { brk, radioGroup } from "@/styles/index";
import Alerting from "@/util/Alert";
import CustomPagination from "@/util/CustomPagination";
import mergeNames from "@/util/mergeNames";
import { Radio, RadioGroup, useToast } from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyAds = ({ user }) => {
  const [ads, setAds] = useState({ ads: [], limit: 0 });
  const [data, setData] = useState({ ads: [], limit: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [num, setNum] = useState(0);
  const [check, setCheck] = useState("created");
  const [type, setType] = useState("");
  const router = useRouter();
  const toast = useToast();
  const token = getCookie("token");

  const { bookmarks } = useSelector((state) => state.bookmarks);
  const getAds = async (status, n) => {
    await axios
      .post(`${urls["test"]}/ad/many/${n ?? num}/true/12/${status}/all`, user)
      .then((d) => {
        setAds(d.data);
        setData(d.data);

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
  };
  useEffect(() => {
    if (user) {
      getAds(check);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getAds(check);
    }
  }, [num]);
  useEffect(() => {
    updateBookmarks(bookmarks);
  }, []);

  // const adStatusChecker = async () => {
  //   getAds;
  // };

  const restoreAd = async (id) => {
    try {
      if (token) {
        await axios
          .get(
            `${
              urls["test"]
            }/ad/update/${id}/pending/show/{message}?message=${" "}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Access-Control-Allow-Headers": "*",
              },
            }
          )
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
        await axios
          .get(
            `${
              urls["test"]
            }/ad/update/${id}/deleted/hide/{message}?message=${" "}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Access-Control-Allow-Headers": "*",
              },
            }
          )
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
  const changeAdType = (id, status) => {
    console.log(status);
    if (status != "created") {
      toast({
        title:
          "Уучлаарай таны зарыг VIP зар болгох боломжтой байна. Та түр хүлээнэ үү.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (type != undefined) {
      setAdType(id, type, "").then((d) => {
        if (d.data) {
          toast({
            title: "Амжилттай.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          router.reload(), setType();
        } else {
          toast({
            title: "Таны eunit оноо хүрэлцэхгүй байна та дансаа цэнэглэнэ үү.",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        }
      });
    } else {
      toast({
        title: "Та төрлөө сонгоно уу.",
        status: "warning",
        duration: 2000,
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
                  let ad = data?.ads.filter(
                    (d) => d.category.name == e.target.value
                  );
                  setAds({ ads: ad, limit: ad.limit });
                } else {
                  getAds(check);
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
                  let ad = data.ads.filter(
                    (d) => d.subCategory.name == e.target.value
                  );
                  setAds({ ads: ad, limit: ad.limit });
                } else {
                  getAds(check);
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
            className={mergeNames(radioGroup)}
            size={"sm"}
            defaultValue="1"
          >
            <Radio
              colorScheme="green"
              onChange={(e) => {
                if (e.target.checked) {
                  getAds("created", 0);
                  setCheck("created");
                  setNum(0);
                }
              }}
              value="1"
            >
              Нэмсэн зарууд
            </Radio>
            <Radio
              colorScheme="yellow"
              onChange={(e) => {
                if (e.target.checked) {
                  getAds("pending", 0);
                  setNum(0);
                  setCheck("pending");
                }
              }}
              value="2"
            >
              Хүлээгдэж байгаа
            </Radio>
            <Radio
              onChange={(e) => {
                if (e.target.checked) {
                  getAds("returned");
                  setCheck("returned");
                }
              }}
              value="3"
            >
              Буцаагдсан зар
            </Radio>
            <Radio
              colorScheme="red"
              onChange={(e) => {
                if (e.target.checked) {
                  getAds("deleted", 0);
                  setNum(0);
                  setCheck("deleted");
                }
              }}
              value="4"
            >
              Устгасан зар
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <Alerting />
      <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1 ">
        {ads?.ads?.map((item, key) => {
          return (
            <AdCard
              setType={setType}
              mine
              setData={setAds}
              data={ads}
              admin={true}
              key={key}
              changeAd={() => {
                // stopPropagation(e);
                changeAdType(item._id, item.adStatus);
              }}
              item={item || {}}
              isDelete={true}
              deleteFunc={(e) => {
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

      <NoAds data={ads?.ads} />
      <CustomPagination
        num={num}
        prev={() => {
          if (num > 0) {
            let n = num - 1;
            getAds(check, n);
          }
        }}
        next={() => {
          if (user?.length > 12) {
            let n = num + 1;
            setNum(n);
            getAds(check, n);
          }
        }}
      />
      {/* <ul className="flex float-right list-style-none">
        <li className="mx-2">
          <button
            className={mergeNames(num > 0 ? STYLES.active : STYLES.notActive)}
            onClick={() => {
              if (num > 0) {
                let n = num - 1;
                getAds(check, n);
              }
            }}
          >
            Өмнөх
          </button>
        </li>

        <li className="mx-2">
          <button
            className={mergeNames(STYLES.notActive)}
            onClick={() => {
              if (user?.length > 12) {
                let n = num + 1;
                setNum(n);
                getAds(check, n);
              }
            }}
          >
            Дараах
          </button>
        </li>
      </ul> */}
    </>
  );
};

export default MyAds;

export const NoAds = ({ data, info = "Зар байхгүй байна" }) => {
  return (
    <>
      {data.length == 0 && (
        <div className="min-h-[20vh] md:min-h-[40vh] h-full flex justify-center items-center w-full text-xl">
          {info}
        </div>
      )}
    </>
  );
};
