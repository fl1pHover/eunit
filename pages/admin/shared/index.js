import urls from "@/constants/api";
import { STYLES } from "@/styles/index";
import CustomToast from "@/util/customToast";
import mergeNames from "@/util/mergeNames";
import { useToast } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { Button } from "flowbite-react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete, MdOutlineArrowDropDownCircle } from "react-icons/md";
import { SiVerizon } from "react-icons/si";
const SharedAd = ({ propAds, propAllAds }) => {
  const [ads, setAds] = useState([]);

  const token = getCookie("token");
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [data, setData] = useState({});
  const [num, setNum] = useState(0);
  const toast = useToast();
  const router = useRouter();
  let dummy = [];

  useEffect(() => {
    setAds({
      ads: propAds.ads.slice(0, (num + 1) * 20),
      limit: propAds.ads.slice(0, (num + 1) * 20).length,
    });

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
    setAds({
      ads: propAds.ads.slice(0, (num + 1) * 20),
      limit: propAds.ads.slice(0, (num + 1) * 20).length,
    });
  }, [num]);
  const exportExcel = (data) => {};
  const [content, setContent] = useState("");
  const [collapsedId, setCollapsed] = useState(false);

  const [expand, setExpand] = useState(0);
  const verify = async (id, view) => {
    try {
      await axios
        .get(
          `${urls["test"]}/ad/update/${id}/created/${view}/{message}?message=%20`,
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
    await fetch(
      `${urls["test"]}/ad/update/${id}/deleted/hide/{message}?message=%20`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Headers": "*",
        },
      }
    ).then((d) => {
      toast({
        title: `${d?.data?.num ?? ""} Зарыг устгалаа.`,
        status: "warning",
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
                            "text-sm h-[30px]"
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
                          "truncate ...",
                          a.adStatus == "special" && "text-yellow-400"
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
                                onclick={() => verify(a._id, a.isView)}
                                stats="error"
                                toastBtn={<SiVerizon />}
                              />
                            )}

                            <button
                              onClick={() => deleteAd(a._id)}
                              className={mergeNames(
                                STYLES.button,
                                "bg-yellow-500 w-7 h-7 justify-center"
                              )}
                            >
                              <BiEdit />
                            </button>
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
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {ads?.limit >= (1 + num) * 20 && (
              <ul className="flex float-right list-style-none">
                <li className="mx-2 disabled">
                  <button
                    className={mergeNames(STYLES.notActive)}
                    onClick={() => {
                      let n = num + 1;
                      setNum(n);
                    }}
                  >
                    more
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
      if (user?.userType == "admin" || user?.userType == "system") {
        const ads = await fetch(`${urls["test"]}/ad/admin/sharing/${0}`, {
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
            destination: "/",
            permanent: false,
          },
        };
      }
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
