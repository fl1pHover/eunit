import urls from '@/constants/api';
import { STYLES, brk } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { Button, Checkbox } from 'flowbite-react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDelete, MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { SiVerizon } from 'react-icons/si';

const UsersRequest = ({ users }) => {
  const [user, setUser] = useState([]);

  const token = getCookie('token');
  const [data, setData] = useState({});
  const [checker, setChecker] = useState(false);
  const [num, setNum] = useState(0);
  const toast = useToast();
  const router = useRouter();
  let dummy = [];
  const getData = async () => {
    fetch(`${urls['test']}/ad/admin/all/${num}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((d) => d.json());
  };

  useEffect(() => {
    if (router.query.slug) {
      setUser(users.filter((u) => u.userType == router.query.slug));
    }
  }, [users, router]);
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

  return (
    <Fragment>
      <div className="flex flex-row p-5 min-h-[60vh]">
        <div className="p-5 ">
          {/* <Text>Zariin dugaar: {a.num}</Text>
              <Button onClick={() => verify(a._id)}>verify</Button>
              <Button onClick={() => deleteAd(a._id)}>delete</Button> */}
          {/* {content && <> {content} </>} */}

          <div className="w-full overflow-scroll">
            {users && (
              <button
                className="p-2 mb-2 font-bold text-white bg-teal-500 rounded-md"
                onClick={() => {}}
              >
                Excel татах
              </button>
            )}
            <table className="w-full p-2 text-sm text-left border border-collapse border-gray-400 table-fixed">
              <thead>
                <tr>
                  <th width="10%">Дугаар</th>
                  <th>Нэр</th>
                  {/* <th>Дэлгэрэнгүй</th> */}
                  <th>Утас</th>
                  <th>Статус</th>
                  <th>Зөвшөөрөх</th>
                  <th>Үйлдэл</th>
                  {/* <th>Засах</th> */}
                </tr>
              </thead>
              <tbody>
                {user?.map((a, i) => {
                  let adData = { ...a };
                  return (
                    <tr key={i}>
                      <td width="10%">{i + 1}</td>
                      <td className="truncate ...">
                        {/* {a.title} */}
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
                      <td
                        className={mergeNames(
                          'truncate ... font-bold',
                          a.userType == 'default' && 'text-purple-900',
                          a.userType == 'agent' && 'text-primary',
                          a.userType == 'organization' && 'text-green',
                          a.userType == 'admin' && 'text-yellow'
                        )}
                      >
                        {a.userType}
                      </td>
                      <td
                        className={mergeNames(
                          'truncate ... font-bold',
                          // a.status == '' && 'text-yellow-400',
                          a.status == 'active' && 'text-green-500',
                          a.status == 'pending' && 'text-yellow-500',
                          a.status == 'banned' && 'text-red-400'
                          // a.status == 'default' && 'text-primary'
                        )}
                      >
                        {a.status}
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
                                'bg-red-500 w-7 h-7 justify-center'
                              )}
                            >
                              <MdDelete />
                            </button>
                            <button
                              onClick={() => deleteAd(a._id)}
                              className={mergeNames(
                                STYLES.button,
                                'bg-red-500 w-7 h-7 justify-center'
                              )}
                            >
                              <BiEdit />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {users && (
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
                {[...Array(Math.ceil(users?.length / 20)).keys()].map(
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
                      if (users?.length > 20) {
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
export default UsersRequest;

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
        const users = await fetch(`${urls['test']}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const usersJson = await users.json();
        return {
          props: {
            users: usersJson,
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
