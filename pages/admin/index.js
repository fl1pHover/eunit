import EditAd from '@/components/ad/edit';
import AdminBar from '@/components/admin/AdminBar';
import FilterAd from '@/components/Profile/filterAd';
import urls from '@/constants/api';
import { useAuth } from '@/context/auth';
import { brk, STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Checkbox, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { SiVerizon } from 'react-icons/si';
import * as XLSX from 'xlsx';
const Tab = ({ num, children }) => {
  const [activeTab, setActiveTab] = useState('');
  const handleClick = (event) => {
    setActiveTab(event.target.id);
  };
  return (
    <p
      className={mergeNames(
        'flex justify-between py-2 font-bold cursor-pointer',
        activeTab === num ? 'text-green-200' : 'text-red-200'
      )}
      onClick={() => setActiveTab(num)}
    >
      {children}
    </p>
  );
};

const Admin = ({ propAds }) => {
  const [ads, setAds] = useState([]);
  const { user } = useAuth();
  const token = Cookies.get('token');
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [data, setData] = useState({});
  const [checker, setChecker] = useState(false);
  const [num, setNum] = useState(0);
  const toast = useToast();
  const router = useRouter();
  let dummy = [];
  const getData = async () => {
    fetch(`${urls['test']}/ad/admin/${num}`, {
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
        d?.ads.map((ad) => {
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
    propAds.ads.map((ad) => {
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
  const exportExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'Data.xlsx');
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
        } else await getData();
      }
    }
  };
  if (user?.userType == 'admin' || user?.userType == 'system') {
    return (
      <>
        <AdminBar />
        <div className="flex flex-row p-5 min-h-[60vh]">
          <div className="p-5 ">
            {/* <Text>Zariin dugaar: {a.num}</Text>
            <Button onClick={() => verify(a._id)}>verify</Button>
            <Button onClick={() => deleteAd(a._id)}>delete</Button> */}
          {/* {content && <> {content} </>} */}
          <div className={mergeNames('flex flex-col gap-4 mt-5', brk)}>
            {ads?.ads && (
              <button onClick={() => exportExcel(ads.ads)}>excel</button>
            )}
            <div className="flex w-full gap-4">
              <FilterAd
                plc="Бүх төрөл"
                onChange={(e) => {
                  if (e.target.value != '') {
                    let ad = data.ads.filter(
                      (d) => d.category.name == e.target.value
                    );
                    setAds({
                      ads: ad,
                      limit: ads.limit,
                    });
                  } else {
                    setAds(data);
                  }
                }}
              >
                {categories?.map((p, i) => {
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
                    let ad = data.ads.filter(
                      (d) => d.subCategory.name == e.target.value
                    );
                    setAds({
                      ads: ad,
                      limit: ads.limit,
                    });
                  } else {
                    setAds(data);
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
            <div className="flex flex-col justify-end">
              <Checkbox
                colorScheme="green"
                className="font-bold text-green-400 whitespace-nowrap"
                onChange={(e) => {
                  setChecker((prev) => ({ ...prev, create: e.target.checked }));
                }}
                isChecked={checker.create}
              >
                Нэмсэн зарууд
              </Checkbox>
              <Checkbox
                className="font-bold text-primary whitespace-nowrap"
                isChecked={checker.pending}
                onChange={(e) => {
                  setChecker((prev) => ({
                    ...prev,
                    pending: e.target.checked,
                  }));
                }}
              >
                Хүлээгдэж байгаа
              </Checkbox>
              <Checkbox
                className="font-bold text-red-400 whitespace-nowrap"
                isChecked={checker.deleted}
                onChange={(e) => {
                  setChecker((prev) => ({
                    ...prev,
                    deleted: e.target.checked,
                  }));
                }}
              >
                Устгасан зарууд
              </Checkbox>
            </div>
          </div>
          <div className="w-full overflow-scroll">
            <table className="w-full p-2 text-sm text-left border border-collapse border-gray-400 table-fixed">
              <thead>
                <tr>
                  <th className="w-[30px]">Дугаар</th>
                  <th>Гарчиг</th>
                  <th>Дэлгэрэнгүй</th>
                  <th>Зарын төрөл</th>
                  <th>Зарын статус</th>
                  <th>Зөвшөөрөх</th>
                  <th>Устгах</th>
                  <th>Засах</th>
                </tr>
              </thead>
              <tbody>
                {ads?.ads?.map((a, i) => {
                  let adData = { ...a };
                  return (
                    <tr key={i}>
                      <td className="w-[30px]">{a.num}</td>
                      <td className="truncate ...">{a.title}</td>
                      <td className="truncate ...">{a.description}</td>
                      <td>{a.adType}</td>
                      <td className="truncate ...">{a.adStatus}</td>
                      <td>
                        <button
                          onClick={() => verify(a._id)}
                          className="bg-teal-500 hover:bg-teal-600"
                        >
                          <SiVerizon />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteAd(a._id)}
                          className="bg-red-500 hover:bg-red-800"
                        >
                          <MdDelete />
                        </button>
                      </td>
                      <td>
                        <EditAd
                          setData={setAds}
                          ads={ads}
                          data={a}
                          admin={true}
                          onNext={async () => {
                            await axios
                              .put(`${urls['test']}/ad/${a._id}`, a, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  'Access-Control-Allow-Headers': '*',
                                  'Content-Type': 'application/json',
                                  charset: 'UTF-8',
                                },
                              })
                              .then((d) => console.log(d.data));
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {data?.limit && (
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

                {data?.limit &&
                  [...Array(Math.ceil(data.limit / 20)).keys()].map((l, i) => {
                    // [...Array(Math.ceil(data.limit / n)).keys()].map((l) => {
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
                      let ad = data.ads.filter(
                        (d) => d.subCategory.name == e.target.value
                      );
                      setAds({
                        ads: ad,
                        limit: ads.limit,
                      });
                    } else {
                      setAds(data);
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
              <div className="flex flex-col justify-end">
                <Checkbox
                  colorScheme="green"
                  className="font-bold text-green-400 whitespace-nowrap"
                  onChange={(e) => {
                    setChecker((prev) => ({
                      ...prev,
                      create: e.target.checked,
                    }));
                  }}
                  isChecked={checker.create}
                >
                  Нэмсэн зарууд
                </Checkbox>
                <Checkbox
                  className="font-bold text-primary whitespace-nowrap"
                  isChecked={checker.pending}
                  onChange={(e) => {
                    setChecker((prev) => ({
                      ...prev,
                      pending: e.target.checked,
                    }));
                  }}
                >
                  Хүлээгдэж байгаа
                </Checkbox>
                <Checkbox
                  className="font-bold text-red-400 whitespace-nowrap"
                  isChecked={checker.deleted}
                  onChange={(e) => {
                    setChecker((prev) => ({
                      ...prev,
                      deleted: e.target.checked,
                    }));
                  }}
                >
                  Устгасан зарууд
                </Checkbox>
              </div>
            </div>
            <div className="w-full overflow-scroll">
              <table className="w-full p-2 text-sm text-left border border-collapse border-gray-400 table-fixed">
                <thead>
                  <tr>
                    <th className="w-[30px]">Дугаар</th>
                    <th>Гарчиг</th>
                    <th>Дэлгэрэнгүй</th>
                    <th>Зарын төрөл</th>
                    <th>Зарын статус</th>
                    <th>Зөвшөөрөх</th>
                    <th>Устгах</th>
                    <th>Засах</th>
                  </tr>
                </thead>
                <tbody>
                  {ads?.ads?.map((a, i) => {
                    let adData = { ...a };
                    return (
                      <tr key={i}>
                        <td className="w-[30px]">{a.num}</td>
                        <td className="truncate ...">{a.title}</td>
                        <td className="truncate ...">{a.description}</td>
                        <td>{a.adType}</td>
                        <td className="truncate ...">{a.adStatus}</td>
                        <td>
                          <button
                            onClick={() => verify(a._id)}
                            className="bg-teal-500 hover:bg-teal-600"
                          >
                            <SiVerizon />
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => deleteAd(a._id)}
                            className="bg-red-500 hover:bg-red-800"
                          >
                            <MdDelete />
                          </button>
                        </td>
                        <td>
                          <EditAd
                            setData={setAds}
                            ads={ads}
                            data={a}
                            admin={true}
                            onNext={async () => {
                              await axios
                                .put(`${urls['test']}/ad/${a._id}`, a, {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Access-Control-Allow-Headers': '*',
                                    'Content-Type': 'application/json',
                                    charset: 'UTF-8',
                                  },
                                })
                                .then((d) => console.log(d.data));
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {data?.limit && (
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

                  {data?.limit &&
                    [...Array(Math.ceil(data.limit / 20)).keys()].map(
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
                        if (data.limit > 20) {
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
      </>
    );
  }
};
export default Admin;

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
        const ads = await fetch(`${urls['test']}/ad/admin/${0}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const adsJson = await ads.json();
        return {
          props: {
            propAds: adsJson,
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
// <div className="flex flex-row p-5" key={i}>
//   {/* Dashboard */}
//   <div className="flex flex-col  text-white bg-mainBlossom w-[20%] p-4 rounded-xl">
//     <div className="flex flex-col">
//       <Tab
//         num={1}
//         className={mergeNames(
//           'flex justify-between py-2 font-bold cursor-pointer'
//         )}
//       >
//         Verify
//       </Tab>
//     </div>
//     {categories?.map(({ categoryName, submenu }, key) => {
//       return (
//         <div className="flex flex-col" key={key}>
//           <Tab
//             num={2}
//             className={mergeNames(
//               'flex justify-between py-2 font-bold cursor-pointer'
//             )}
//           >
//             {categoryName}
//             <button
//               // onClick={handleExpand}
//               onClick={() => {
//                 setCollapsed((prev) => {
//                   if (prev === categoryName.id) return false;
//                   return categoryName.id;
//                 });
//               }}
//             >
//               <AiFillCaretDown />
//             </button>
//           </Tab>
//           <ul
//             className={mergeNames(
//               'cursor-pointer ml-10',
//               expand ? 'block' : 'hidden'
//             )}
//           >
//             {collapsedId &&
//               collapsedId === categoryName.id &&
//               submenu?.map(({ category, href }, key) => {
//                 return (
//                   <li
//                     key={key}

//                     // className="px-4 py-3 text-sm font-medium text-white transition-colors ease-in hover:bg-blue-700 first-letter:uppercase whitespace-nowrap"
//                   >
//                     {category}
//                   </li>
//                 );
//               })}

//             {/* {submenu && (
//               <li onClick={() => setContent(a + 1)}>{submenu}</li>
//             )} */}
//           </ul>
//         </div>
//       );
//     })}
//     {/* <div className="flex flex-col">
//       <Tab
//         num={2}
//         className={mergeNames(
//           'flex justify-between py-2 font-bold cursor-pointer'
//         )}
//       >
//         Realstate
//         <button onClick={handleExpand}>
//           <AiFillCaretDown />
//         </button>
//       </Tab>
//       <ul
//         className={mergeNames(
//           'cursor-pointer ml-10',
//           expand ? 'block' : 'hidden'
//         )}
//       >
//         {categories?.map(({ categoryName, submenu }, i) => {
//           return (
//             <>

//               <li onClick={() => setContent(a + 1)}>{categoryName}</li>
//             </>
//           );
//         })}
//       </ul>
//     </div> */}
//   </div>
//   <div>
//     {content == 2 && <p>adasd</p>}
//     {content == 3 && <p>adafgdfgsd</p>}
//   </div>
// </div>
{
  /* <div className="w-[20%] text-[#b8cde9] rounded-md bg-mainBlossom">
          <div>
            <button
              className={mergeNames(
                'p-5',
                'border-b border-[#313255]',
                'w-full flex flex-row items-center justify-between'
              )}
            >
              Verify Ads
            </button>
          </div>
          {/* {categories?.map((tab, key) => {
            return (
              <div className="" key={key}>
                <button
                  onClick={() => {
                    setCollapsed((prev) => {
                      if (prev === tab.id) return false;
                      return tab.id;
                    });
                  }}
                  className={mergeNames(
                    'p-5',
                    'border-b border-[#313255]',
                    'w-full flex flex-row items-center justify-between'
                  )}
                >
                  <div className="flex flex-row items-center gap-2">
                    <p className="font-semibold ">{tab?.name}</p>
                  </div>
                  <CgChevronRight
                    size={20}
                    className={mergeNames(
                      collapsedId === tab?.id && 'rotate-90',
                      'transition-all ease-in-out'
                    )}
                  />
                </button>
                <div
                //  className={mergeNames("sm:px-4 sm:py-4 px-3 py-3")}
                // className="bg-gray-200"
                >
                  {collapsedId === tab.id &&
                    tab?.subCategory?.map((sub, key) => {
                      return (
                        <button
                          key={key}
                          className="w-full py-2 pl-10 border-b border-[#313255] hover:bg-mainBlue"
                          // onClick={() => {
                          //   setContent(categories.submenu.categoryName);
                          // }}
                          onClick={() => {
                            setContent(() => {
                              tab.subCategory;
                            });
                            console.log(tab.subCategory);
                          }}
                        >
                          <p className="text-xs font-medium text-left text-[#b8cde9]">
                            {sub.name}
                          </p>
                        </button>
                      );
                    })}
                </div>
              </div>
            );
          })} 
        </div> */
}
