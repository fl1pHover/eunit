import urls from '@/constants/api';
import { useAuth } from '@/context/auth';
import mergeNames from '@/util/mergeNames';
import { getCookie } from 'cookies-next';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { CgChevronRight } from 'react-icons/cg';
import { MdDelete } from 'react-icons/md';
import { SiVerizon } from 'react-icons/si';
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
    fetch(`${urls['test']}/ad/notVerify/${0}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((d) => d.json())
      .then((d) => setAds(d?.ads));
  };
  useEffect(() => {
    setAds(propAds?.ads);
    console.log(propAds);
  }, [propAds]);
  const verify = async (id) => {
    await fetch(`${urls['test']}/ad/check/${id}`).then((d) => getData());
  };
  const deleteAd = async (id) => {
    await fetch(`${urls['test']}/ad/delete/${id}`).then((d) => getData());
  };
  const [content, setContent] = useState('');

  const [collapsedId, setCollapsed] = useState(false);
  const { categories } = useAuth();
  if (user?.userType == 'admin' || user?.userType == 'system') {
    return (
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
      <div className="flex flex-row p-5">
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
          {/* <Text>Zariin dugaar: {a.num}</Text>
            <Button onClick={() => verify(a._id)}>verify</Button>
            <Button onClick={() => deleteAd(a._id)}>delete</Button> */}
          {/* {content && <> {content} </>} */}

          <div className="w-full overflow-scroll">
            <table className="w-full p-2 text-sm text-left border border-collapse border-gray-400 table-fixed">
              <thead>
                <tr>
                  <th className="w-[30px]">Дугаар</th>
                  <th>Гарчиг</th>
                  <th>Дэлгэрэнгүй</th>
                  <th>Зарын төрөл</th>
                  <th>Зөвшөөрөх</th>
                  <th>Устгах</th>
                </tr>
              </thead>
              <tbody>
                {ads?.map((a, i) => {
                  return (
                    <tr key={i}>
                      <td className="w-[30px]">{a.num}</td>
                      <td className="truncate ...">{a.title}</td>
                      <td className="truncate ...">{a.description}</td>
                      <td>{a.adType}</td>
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
        const ads = await fetch(`${urls['test']}/ad/notVerify/${0}`, {
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
