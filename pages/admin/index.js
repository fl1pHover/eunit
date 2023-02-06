import urls from '@/constants/api';
import { useAuth } from '@/context/auth';
import { categories } from '@/data/categories';
import mergeNames from '@/util/mergeNames';
import { Button, Text } from '@chakra-ui/react';
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

const Admin = () => {
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
    getData();
  }, []);
  const verify = async (id) => {
    fetch(`${urls['test']}/ad/check/{id}?id=${id}`).then((d) => getData());
  };
  const deleteAd = async (id) => {
    fetch(`${urls['test']}/ad/delete/{id}?id=${id}`).then((d) => getData());
  };
  const [content, setContent] = useState('');

  const [collapsedId, setCollapsed] = useState(false);

  if (user?.userType == 'admin' || user?.userType == 'system') {
    return ads.map((a, i) => {
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
                      <p className="font-semibold ">{tab?.categoryName}</p>
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
                      tab?.submenu?.map((sub, key) => {
                        return (
                          <button
                            key={key}
                            className="w-full py-2 pl-10 border-b border-[#313255] hover:bg-mainBlue"
                            // onClick={() => {
                            //   setContent(categories.submenu.categoryName);
                            // }}
                            onClick={() => {
                              setContent(() => {
                                tab.submenu;
                              });
                              console.log(tab.submenu);
                            }}
                          >
                            <p className="text-xs font-medium text-left text-[#b8cde9]">
                              {sub.category}
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
            {categories?.map((c, i) => {
              return (
                <table class="table-auto" key={i}>
                  <thead>
                    <tr>
                      <th>{c.submenu.category}</th>
                    </tr>
                  </thead>
                  {/* <tbody>
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
                    <tr>
                      <td>Shining Star</td>
                      <td>Earth, Wind, and Fire</td>
                      <td>1975</td>
                    </tr>
                  </tbody> */}
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
