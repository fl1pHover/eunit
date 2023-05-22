import FilterAd from "@/components/Profile/filterAd";
import urls from "@/constants/api";
import { STYLES, brk } from "@/styles/index";
import CustomToast from "@/util/customToast";
// import { saveAs } from "file-saver";
// import XlsxPopulate from "xlsx-populate";

import mergeNames from "@/util/mergeNames";
import { Button, Radio, RadioGroup, useToast } from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";

import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { MdDelete, MdOutlineArrowDropDownCircle } from "react-icons/md";
import { SiVerizon } from "react-icons/si";
import { useSelector } from "react-redux";

const Tab = ({ num, children }) => {
  const [activeTab, setActiveTab] = useState("");
  const handleClick = (event) => {
    setActiveTab(event.target.id);
  };
  return (
    <p
      className={mergeNames(
        "flex justify-between py-2 font-bold cursor-pointer",
        activeTab === num ? "text-green-200" : "text-red-200"
      )}
      onClick={() => setActiveTab(num)}
    >
      {children}
    </p>
  );
};

const RequestAds = () => {
  const [ads, setAds] = useState({ ads: [], limit: 0 });
  const [data, setData] = useState({ ads: [], limit: 0 });

  const token = getCookie("token");
  const { user } = useSelector((state) => state.user);

  const [check, setCheck] = useState("all");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [num, setNum] = useState(0);
  const toast = useToast();
  const router = useRouter();

  const getAds = async (status, n) => {
    await axios
      .get(`${urls["test"]}/ad/admin/all/${n ?? num}/${status}`, {
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
      if (user.userType == "admin" || user.userType) {
      } else {
        router.push("/");
      }
      getAds(check);
    } else {
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getAds(check);
    }
  }, [num]);
  const verify = async (id) => {
    try {
      await axios
        .get(
          `${
            urls["test"]
          }/ad/update/${id}/created/show/{message}?message=${" "}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Headers": "*",
            },
          }
        )
        .then((d) => {
          toast({
            title: `${d?.data?.num ?? ""}-р зарыг нэмлээ.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        });
    } catch (error) {
      console.error(error);
    }
  };
  const deleteAd = async (id) => {
    await axios
      .get(
        `${urls["test"]}/ad/update/${id}/deleted/hide/{message}?message=%20`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Headers": "*",
          },
        }
      )
      .then((d) => {
        toast({
          title: `${d?.data?.num ?? ""} Зарыг устгалаа.`,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  const getSheetData = (data) => {
    let fields = Object.keys(data[0]);
    let sheetData = data.map((row) => {
      return fields.map((field) => {
        return row[field] ? row[field] : "";
      });
    });
    return sheetData;
  };
  const exportExcel = async () => {
    let data = [];
    // const XlsxPopulate = require("xlsx-populate");
    // const { saveAs } = require("file-saver");
    // await axios.get(`${urls["test"]}/ad/json/all`).then((d) => (data = d.data));
    // XlsxPopulate.fromBlankAsync().then(async (workbook) => {
    //   data.map((d) => {
    //     const sheet = workbook.sheet(d.id);

    //     const sheetData = getSheetData(d.ads);
    //     sheet.cell("A1").value(sheetData);
    //   });
    //   return workbook.outputAsync().then((res) => {
    //     saveAs(res, "file.xlsx");
    //   });
    // });
  };

  const adStatusChecker = async () => {
    getAds;
  };
  const [expand, setExpand] = useState(0);

  return (
    <Fragment>
      <div className="flex flex-row justify-center p-5 min-h-[60vh]">
        <div className="p-5 ">
          {/* <Text>Zariin dugaar: {a.num}</Text>
            <Button onClick={() => verify(a._id)}>verify</Button>
              <Button onClick={() => deleteAd(a._id)}>delete</Button> */}
          {/* {content && <> {content} </>} */}

          <div className={mergeNames("flex flex-col gap-4 mt-5", brk)}>
            <div className="flex w-full gap-4">
              <FilterAd
                plc="Бүх төрөл"
                onChange={(e) => {
                  if (e.target.value != "") {
                    let ad = data.ads.filter(
                      (d) => d.category.name == e.target.value
                    );
                    setAds({
                      ads: ad,
                      limit: ads.limit,
                    });
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
                    setAds({
                      ads: ad,
                      limit: ads.limit,
                    });
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
            <RadioGroup className="flex flex-col justify-end" defaultValue="1">
              <Radio
                colorScheme="green"
                className="font-bold text-green-400 whitespace-nowrap"
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
                className="font-bold text-yellow-400 whitespace-nowrap"
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
                colorScheme="cyan"
                className="font-bold text-primary whitespace-nowrap"
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
            </RadioGroup>
          </div>
          <div className="w-full overflow-scroll">
            {ads?.ads && (
              <button
                className="p-2 mb-2 font-bold text-white bg-teal-500 rounded-md"
                onClick={() => exportExcel(ads.ads)}
              >
                Excel татах
              </button>
            )}
            <table className="w-full p-2 text-sm text-left border border-gray-400 table-auto">
              <thead>
                <tr>
                  <th className="w-[10%]">Дугаар</th>
                  <th>Гарчиг</th>
                  {/* <th>Дэлгэрэнгүй</th> */}
                  <th className="w-1/2">Зарын дэлгэрэнгүй</th>
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
                      <td width="10%">{a.num}</td>
                      <td className="truncate ...">
                        {/* {a.title} */}
                        <Button
                          as="a"
                          className={mergeNames(
                            STYLES.blueButton,
                            "text-sm h-[30px]"
                          )}
                          target="_blank"
                          href={`/ad/${a.num}`}
                          // onClick={() => router.push(`/product/${a.num}`)}
                        >
                          <a target="_blank">Орох</a>
                        </Button>
                      </td>
                      <td className="w-1/2 truncate ... ">
                        {a.description.slice(0, 75)}
                      </td>
                      <td
                        className={mergeNames(
                          "truncate ... font-bold",
                          a.adType == "special" && "text-purple-900",
                          a.adType == "default" && "text-primary"
                        )}
                      >
                        {a.adType}
                      </td>
                      <td
                        className={mergeNames(
                          "truncate ... font-bold",
                          a.adStatus == "special" && "text-yellow-400",
                          a.adStatus == "created" && "text-green-500",
                          a.adStatus == "pending" && "text-yellow-500",
                          a.adStatus == "default" && "text-primary"
                        )}
                      >
                        {a.adStatus}
                      </td>
                      <td>
                        <div
                          className={mergeNames(
                            "flex flex-row justify-between"
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
                                expand == i + 1 ? "text-blue-600 " : ""
                              )}
                            />
                          </button>
                          <div
                            className={mergeNames(
                              expand == i + 1 ? "flex" : "hidden",
                              "justify-center  flex-end  gap-2"
                            )}
                            onClick={() => {
                              setExpand(0);
                            }}
                          >
                            {a.adStatus != "created" && (
                              <CustomToast
                                // status="error"
                                className={mergeNames(
                                  STYLES.button,
                                  "bg-teal-500 justify-center w-7 h-7 "
                                )}
                                toastH="Амжилттай нэмэгдлээ"
                                onclick={() => verify(a._id)}
                                stats="error"
                                toastBtn={<SiVerizon />}
                              />
                            )}

                            <CustomToast
                              // status="error"
                              className={mergeNames(
                                STYLES.button,
                                "bg-red-500 w-7 h-7 justify-center"
                              )}
                              toastH="Амжилттай устгагдлаа"
                              onclick={() => deleteAd(a._id)}
                              stats="error"
                              toastBtn={<MdDelete />}
                            />

                            {/* <EditAd
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
                            >
                              <BiEdit />
                            </EditAd> */}
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
export default RequestAds;

// export async function getServerSideProps({ req, res }) {
//   const token = getCookie('token', { req, res });
//   const { user } = useSelector((state) => state.user);
//   if (token) {
//     try {
//       if (user?.userType == 'admin' || user?.userType == 'system') {
//         return {
//           props: {
//             user: user,
//           },
//         };
//       } else {
//         return {
//           redirect: {
//             destination: '/',
//             permanent: false,
//           },
//         };
//       }
//     } catch (err) {
//       return {
//         redirect: {
//           destination: '/login',
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
