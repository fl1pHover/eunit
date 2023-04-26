import AdCard from '@/components/home/adCard';
import FilterAd from '@/components/Profile/filterAd';
import urls from '@/constants/api';
import { stopPropagation } from '@/context/functions';
import { brk, STYLES } from '@/styles/index';
import Alerting from '@/util/Alert';
import mergeNames from '@/util/mergeNames';
import { Radio, RadioGroup, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MyAds = ({ user }) => {
  const [ads, setAds] = useState({ ads: [], limit: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [num, setNum] = useState(0);
  const [check, setCheck] = useState('created');
  const router = useRouter();
  const toast = useToast();
  const token = getCookie('token');

  const toLowerCase = (text) => {
    if (text) {
      return text.toLowerCase();
    }
  };
  const getAds = async (status, n) => {
    await axios
      .post(`${urls['test']}/ad/many/${n ?? num}/true/9/${status}`, user)
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
  };
  useEffect(() => {
    if (user) {
      getAds('created');
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getAds('created');
    }
  }, [num]);

  const adStatusChecker = async () => {
    getAds;
  };

  const restoreAd = async (id) => {
    try {
      if (token) {
        let ad = await axios
          .get(`${urls['test']}/ad/update/${id}/pending`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Headers': '*',
            },
          })
          .then((d) => {
            toast({
              title: 'Зар сэргээгдлээ.',
              status: 'success',
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
          .delete(`${urls['test']}/ad/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Headers': '*',
            },
          })
          .then((d) => {
            toast({
              title: 'Зар устгагдлаа.',
              status: 'warning',
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

  return (
    <>
      <div className={mergeNames('flex flex-col gap-4 mt-5', brk)}>
        <div className="flex flex-col w-full">
          <div className="flex gap-4">
            <FilterAd
              plc="Бүх төрөл"
              onChange={(e) => {
                if (e.target.value != '') {
                  let ad = ads?.ads.filter(
                    (d) => d.category.name == e.target.value
                  );
                  setAds({ ads: ad, limit: ad.limit });
                } else {
                  getAds();
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
                if (e.target.value != '') {
                  let ad = ads.ads.filter(
                    (d) => d.subCategory.name == e.target.value
                  );
                  setAds({ ads: ad, limit: ad.limit });
                } else {
                  getData();
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
                  getAds('created', 0);
                  setCheck('created');
                  setNum(0);
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
                  getAds('pending', 0);
                  setNum(0);
                  setCheck('pending');
                }
              }}
              value="2"
            >
              Хүлээгдэж байгаа
            </Radio>
            <Radio
              className="font-bold text-blue-400 whitespace-nowrap"
              onChange={(e) => {
                if (e.target.checked) {
                  getAds('returned');
                  setCheck('returned');
                }
              }}
              value="3"
            >
              Буцаагдсан зар
            </Radio>
            <Radio
              className="font-bold text-blue-400 whitespace-nowrap"
              onChange={(e) => {
                if (e.target.checked) {
                  getAds('checking', 0);
                  setNum(0);
                  setCheck('checking');
                }
              }}
              value="4"
            >
              Шалгаж байгаа зар
            </Radio>
            <Radio
              className="font-bold text-red-400 whitespace-nowrap"
              colorScheme="red"
              onChange={(e) => {
                if (e.target.checked) {
                  getAds('deleted', 0);
                  setNum(0);
                  setCheck('deleted');
                }
              }}
              value="5"
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
                if (item.adStatus == 'deleted') {
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
      </ul>
    </>
  );
};

export default MyAds;
