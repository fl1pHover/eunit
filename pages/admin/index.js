import urls from '@/constants/api';
import { useAuth } from '@/context/auth';
import mergeNames from '@/util/mergeNames';
import { Button, Text } from '@chakra-ui/react';
import { getCookie } from 'cookies-next';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { CgChevronRight } from 'react-icons/cg';

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
  const getData = async () => {
    fetch(`${urls['test']}/ad/notVerify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((d) => d.json())
      .then((d) => setAds(d));
  };
  useEffect(() => {
    setAds(propAds);
  }, [propAds]);
  const verify = async (id) => {
    fetch(`${urls['test']}/ad/check/${id}`).then((d) => getData());
  };
  const deleteAd = async (id) => {
    fetch(`${urls['test']}/ad/delete/${id}`).then((d) => getData());
  };
  const [content, setContent] = useState('');

  const [collapsedId, setCollapsed] = useState(false);
  const { categories } = useAuth();
  if (user?.userType == 'admin' || user?.userType == 'system') {
    return ads.map((a, i) => {
      return (
        <div key={i} className="flex flex-row p-5">
          <div className="w-[20%] text-[#b8cde9] rounded-md bg-mainBlossom">
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
            {categories?.map((tab, key) => {
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
                        collapsedId === tab.id && 'rotate-90',
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
          </div>
          <div className="w-[80%] p-5">
            <Text>Zariin dugaar: {a.title}</Text>
            <Button onClick={() => verify(a._id)}>verify</Button>
            <Button onClick={() => deleteAd(a._id)}>delete</Button>
            {/* {content && <> {content} </>} */}
            {categories?.map((tab, key) => {
              return (
                <table className="table-auto" key={i}>
                  <thead>
                    <tr>
                      <th>{tab.subCategory.name}</th>
                    </tr>
                  </thead>
                  <tbody className="gap-3">
                    <tr>
                      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                      <td>Malcolm Lockyer</td>
                      <td>1961</td>
                    </tr>
                    <tr>
                      <td>Witchy Woman</td>
                      <td>The Eagles</td>
                      <td>1972</td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
          </div>
        </div>
      );
    });
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
        const ads = await fetch(`${urls['test']}/ad/notVerify`, {
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
