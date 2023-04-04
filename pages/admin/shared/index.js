import urls from '@/constants/api';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { useToast } from '@chakra-ui/react';
import { getCookie } from 'cookies-next';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDelete, MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { SiVerizon } from 'react-icons/si';
import * as XLSX from 'xlsx';
const SharedAd = ({ propAds, propAllAds }) => {
  const [ads, setAds] = useState([]);

  const token = getCookie('token');
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [data, setData] = useState({});
  const [checker, setChecker] = useState(false);
  const [num, setNum] = useState(0);
  const toast = useToast();
  const router = useRouter();
  let dummy = [];
  const getData = async () => {
    fetch(`${urls['test']}/ad/admin/sharing/${num}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((d) => d.json())
      .then((d) => {
        setAds(d);
        setData(d);
        let c = [],
          s = [];
        d?.ads?.map((ad) => {
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
        setCategories(c);
        setSubCategory(s);
      });
  };

  useEffect(() => {
    setAds(propAds);
    setData(propAds);

    let c = [],
      s = [];
    propAds?.ads?.map((ad) => {
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
    setCategories(c);
    setSubCategory(s);
  }, [propAds]);
  useEffect(() => {
    adStatusChecker();
  }, [checker]);
  useEffect(() => {
    getData();
  }, [num]);
  const exportExcel = (data) => {
    if (propAllAds) {
      let { apartment, office, factory, garage, land, service } = propAllAds;
      const apartmentSheet = XLSX.utils.json_to_sheet(apartment);
      const officeSheet = XLSX.utils.json_to_sheet(office);
      const factorySheet = XLSX.utils.json_to_sheet(factory);
      const garageSheet = XLSX.utils.json_to_sheet(garage);
      const landSheet = XLSX.utils.json_to_sheet(land);
      const serviceSheet = XLSX.utils.json_to_sheet(service);
      const realStateBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(realStateBook, apartmentSheet, 'Орон сууц');
      XLSX.utils.book_append_sheet(realStateBook, officeSheet, 'Оффис');
      XLSX.utils.book_append_sheet(
        realStateBook,
        factorySheet,
        'Үйлдвэр агуулах объект'
      );
      XLSX.utils.book_append_sheet(
        realStateBook,
        garageSheet,
        'Гараж, контейнер, зөөврийн сууц'
      );
      XLSX.utils.book_append_sheet(realStateBook, landSheet, 'Газар');
      XLSX.utils.book_append_sheet(
        realStateBook,
        serviceSheet,
        'Худалдаа, үйлчилгээний талбай'
      );
      XLSX.writeFile(realStateBook, 'Shared.xlsx');
    }
  };
  const [content, setContent] = useState('');
  const [collapsedId, setCollapsed] = useState(false);
  const adStatusChecker = async () => {
    if (checker.pending) {
      let ad = ads.ads.filter((p) => p.adStatus == 'pending');
      setAds({
        ads: ad,
        limit: ads.limit,
      });
    } else {
      if (checker.create && ads) {
        let ad = ads.ads.filter((p) => p.adStatus == 'created');
        setAds({
          ads: ad,
          limit: ads.limit,
        });
      } else {
        if (checker.deleted && ads) {
          let ad = ads.ads.filter((p) => p.adStatus == 'deleted');
          setAds({
            ads: ad,
            limit: ads.limit,
          });
        } else {
          if (checker.sharing && ads) {
            let ad = ads.ads.filter((p) => p.adStatus == 'sharing');
            setAds({
              ads: ad,
              limit: ads.limit,
            });
          } else {
            if (checker.returned && ads) {
              let ad = ads.ads.filter((p) => p.adStatus == 'returned');
              setAds({
                ads: ad,
                limit: ads.limit,
              });
            } else {
              await getData();
            }
          }
        }
      }
    }
  };
  const [expand, setExpand] = useState(0);
  const verify = async (id) => {
    try {
      await axios
        .get(`${urls['test']}/ad/update/${id}/created`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Headers': '*',
          },
        })
        .then((d) => {
          toast({
            title: `${d?.data?.num ?? ''} Зарыг нэмлээ.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        });
    } catch (error) {
      console.error(error);
    }
  };
  const deleteAd = async (id) => {
    await fetch(`${urls['test']}/ad/update/${id}/deleted`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Headers': '*',
      },
    }).then((d) => {
      toast({
        title: `${d?.data?.num ?? ''} Зарыг устгалаа.`,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    });
  };
  return (
    <Fragment>
      <div className="flex flex-row p-5 min-h-[60vh]">
        <div className="p-5 ">
          <div className="w-full overflow-scroll">
            {ads?.ads && (
              <button
                className="p-2 mb-2 font-bold text-white bg-teal-500 rounded-md"
                onClick={() => exportExcel(ads.ads)}
              >
                Excel татах
              </button>
            )}
            <table className="w-full p-2 text-sm text-left border border-collapse border-gray-400 table-fixed">
              <thead>
                <tr>
                  <th className="w-[30px]">Дугаар</th>
                  <th>Гарчиг</th>
                  {/* <th>Дэлгэрэнгүй</th> */}
                  <th>Зарын төрөл</th>
                  <th>Зарын статус</th>
                  <th>Зөвшөөрөх</th>
                  <th>Үйлдэл</th>
                  {/* <th>Засах</th> */}
                </tr>
              </thead>
              <tbody>
                {ads?.ads?.map((a, i) => {
                  let adData = { ...a };
                  return (
                    <tr key={i}>
                      <td className="w-[30px]">{a.num}</td>
                      <td className="truncate ...">
                        {/* {a.title} */}
                        {/* <button
                          className={mergeNames(STYLES.blueButton)}
                          onClick={() => router.push(`/product/${a.num}`)}
                        >
                          Орох
                        </button> */}
                        <Button
                          as="a"
                          className={mergeNames(
                            STYLES.blueButton,
                            'text-sm h-[30px]'
                          )}
                          target="_blank"
                          href={`/product/${a.num}`}
                          // onClick={() => router.push(`/product/${a.num}`)}
                        >
                          <a target="_blank">Орох</a>
                        </Button>
                      </td>
                      <td className="truncate ...">{a.description}</td>
                      <td>{a.adType}</td>
                      <td
                        className={mergeNames(
                          'truncate ...',
                          a.adStatus == 'special' && 'text-yellow-400'
                        )}
                      >
                        {a.adStatus}
                      </td>
                      <td>
                        <div
                          className={mergeNames(
                            'flex flex-row justify-between'
                            // 'p-2 rounded-md bg-white',
                          )}
                        >
                          <button
                            onClick={() => {
                              if (expand == 0) {
                                setExpand(i + 1);
                              } else {
                                setExpand(0);
                              }
                            }}
                            className="float-left mx-0 text-lg text-black -rotate-90"
                          >
                            <MdOutlineArrowDropDownCircle
                              className={mergeNames(
                                expand == i + 1 ? 'text-blue-600 ' : ''
                              )}
                            />
                          </button>
                          <div
                            className={mergeNames(
                              expand == i + 1 ? 'flex' : 'hidden',
                              'justify-center  flex-end  gap-2'
                            )}
                            onClick={() => {
                              setExpand(0);
                            }}
                          >
                            {a.adStatus != 'created' && (
                              <button
                                onClick={() => verify(a._id)}
                                className={mergeNames(
                                  STYLES.button,
                                  'bg-teal-500 justify-center w-7 h-7 '
                                )}
                              >
                                <SiVerizon />
                              </button>
                            )}

                            <button
                              onClick={() => deleteAd(a._id)}
                              className={mergeNames(
                                STYLES.button,
                                'bg-yellow-500 w-7 h-7 justify-center'
                              )}
                            >
                              <BiEdit />
                            </button>
                            <button
                              onClick={() => deleteAd(a._id)}
                              className={mergeNames(
                                STYLES.button,
                                'bg-red-500 w-7 h-7 justify-center'
                              )}
                            >
                              <MdDelete />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {propAllAds.length > 0 && (
              <ul className="flex float-right list-style-none">
                <li className="mx-2 disabled">
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
                {[...Array(Math.ceil(propAllAds?.length / 20)).keys()].map(
                  (l, i) => {
                    // [...Array(Math.ceil(data.limit / n)).keys()].map((l) => {
                    return (
                      <li className={l == num ? 'active' : ''} key={i}>
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
                  }
                )}
                <li className="mx-2 disabled">
                  <button
                    className={mergeNames(STYLES.notActive)}
                    onClick={() => {
                      if (propAllAds?.length > 20) {
                        let n = num + 1;
                        setNum(n);
                      }
                    }}
                  >
                    Дараах
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default SharedAd;

export async function getServerSideProps({ req, res }) {
  const token = getCookie('token', { req, res });

  if (token) {
    try {
      const response = await fetch(`${urls['test']}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await response.json();
      // const adRes = await
      if (user?.userType == 'admin' || user?.userType == 'system') {
        const ads = await fetch(`${urls['test']}/ad/admin/sharing/${0}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const allAds = await fetch(`${urls['test']}/ad/admin/sharing`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const adsJson = await ads.json();
        const allAdsJson = await allAds.json();
        return {
          props: {
            propAds: adsJson,
            propAllAds: allAdsJson,
          },
        };
      } else {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    } catch (err) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}
