import urls from '@/constants/api';
import { STYLES, brk } from '@/styles/index';
import CustomToast from '@/util/customToast';
import mergeNames from '@/util/mergeNames';
import { Button, Radio, RadioGroup, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDelete, MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { SiVerizon } from 'react-icons/si';
import { useSelector } from 'react-redux';
import { utils, writeFileXLSX } from 'xlsx';
const SharedAd = () => {
  const [ads, setAds] = useState({ ads: [], limit: 0 });
  const [data, setData] = useState({ ads: [], limit: 0 });

  const token = getCookie('token');
  const [check, setCheck] = useState('checking');
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [num, setNum] = useState(0);
  const toast = useToast();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const getAds = async (status, n) => {
    await axios
      .get(`${urls['test']}/ad/admin/sharing/${n ?? num}/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
  const exportExcel = async (data) => {
    const res = await axios.get(`${urls['test']}/ad/json/sharing`);

    const wb = utils.book_new();
    res.data.map((item) => {
      const ws = utils.json_to_sheet(item.ads);
      utils.book_append_sheet(wb, ws, item.id);
    });
    writeFileXLSX(wb, 'shared.xlsx');
  };
  const [content, setContent] = useState('');
  const [collapsedId, setCollapsed] = useState(false);

  const [expand, setExpand] = useState(0);
  const verify = async (id, view) => {
    try {
      await axios
        .get(
          `${urls['test']}/ad/update/${id}/created/${view}/{message}?message=%20`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Headers': '*',
            },
          }
        )
        .then((d) => {
          toast({
            title: `${d?.data?.num ?? ''}-р зарыг нэмлээ.`,
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
    await fetch(
      `${urls['test']}/ad/update/${id}/deleted/hide/{message}?message=%20`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Headers': '*',
        },
      }
    ).then((d) => {
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
          <div
            className={mergeNames(
              'flex flex-col justify-between gap-4 mt-5 mb-5',
              brk
            )}
          >
            {ads?.ads && (
              <button
                className="p-2 mb-2 font-bold text-white bg-teal-500 rounded-md"
                onClick={() => exportExcel(ads.ads)}
              >
                Excel татах
              </button>
            )}
            <RadioGroup className="flex flex-col justify-end" defaultValue="2">
              <Radio
                colorScheme="green"
                className="font-bold text-green-400 whitespace-nowrap"
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
                colorScheme="yellow"
                className="font-bold text-yellow-400 whitespace-nowrap"
                onChange={(e) => {
                  if (e.target.checked) {
                    getAds('checking', 0);
                    setNum(0);
                    setCheck('checking');
                  }
                }}
                value="2"
              >
                Шалгагдаж байгаа зарууд
              </Radio>
            </RadioGroup>
          </div>
          <div className="w-full overflow-scroll">
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
                          href={`/ad/${a.num}`}
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
                              <CustomToast
                                // status="error"
                                className={mergeNames(
                                  STYLES.button,
                                  'bg-teal-500 justify-center w-7 h-7 '
                                )}
                                toastH="Амжилттай нэмэгдлээ"
                                onclick={() => verify(a._id, a.view)}
                                stats="error"
                                toastBtn={<SiVerizon />}
                              />
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
                            <CustomToast
                              // status="error"
                              className={mergeNames(
                                STYLES.button,
                                'bg-red-500 w-7 h-7 justify-center'
                              )}
                              toastH="Амжилттай устгагдлаа"
                              onclick={() => deleteAd(a._id)}
                              stats="error"
                              toastBtn={<MdDelete />}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <ul className="flex float-right list-style-none">
              {num > 0 && (
                <li className="mx-2">
                  <button
                    className={mergeNames(STYLES.notActive)}
                    onClick={() => {
                      let n = num - 1;
                      getAds(check, n);
                    }}
                  >
                    Өмнөх
                  </button>
                </li>
              )}
              {data.limit == 20 && (
                <li className="mx-2">
                  <button
                    className={mergeNames(STYLES.notActive)}
                    onClick={() => {
                      let n = num + 1;
                      setNum(n);
                      getAds(check, n);
                    }}
                  >
                    Дараах
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default SharedAd;

// export async function getServerSideProps({ req, res }) {
//   const token = getCookie('token', { req, res });
//   const { user } = useSelector((state) => state.user);
//   if (token) {
//     if (user?.userType == 'admin' || user?.userType == 'system') {
//       return {
//         props: {},
//       };
//     } else {
//       return {
//         redirect: {
//           destination: '/',
//           permanent: false,
//         },
//       };
//     }
//   } else {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
// }
