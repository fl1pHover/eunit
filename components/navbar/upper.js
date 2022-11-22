import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useBreakpoints from "@/hooks/useBreakpoints";
import { ContainerX } from "@/lib/Container";
import { HiMenuAlt3 } from "react-icons/hi";

import BottomMenu from "./bottomMenu";
import { EstimateIcon, HeartIcon, UserIcon, WalletIcon } from "./icons";
import SearchBar from "./searchBar";
import SideMenu from "./sideMenu";
import UserDropdown from "./userDropdown";

const calcSize = (pt) => {
     switch (pt) {
          case "3xl":
          case "2xl":
          case "xl":
          case "lg":
               return { width: 130, height: 63 };
          case "md":
          case "sm":
          case "xs": {
               return { width: 110, height: 43 };
          }
          case "default":
               return { width: 105, height: 38 };
          default: {
               return { width: 140, height: 73 };
          }
     }
};
const UpperNav = ({
     user,
     logout,
     //  openNav
}) => {
     const router = useRouter();
     const pt = useBreakpoints();

     const [size, setSize] = useState(() => calcSize(pt));
     const [showSideMenu, setShowSideMenu] = useState(false);
     const [showBottomMenu, setShowBottomMenu] = useState(false);

     useEffect(() => {
          setSize(calcSize(pt));
     }, [pt]);

     return (
          <div className="md:bg-white bg-mainBlossom shadow-lg z-30 sticky md:overflow-hidden overflow-y-visible overflow-clip">
               <ContainerX>
                    <div className="flex flex-row items-center w-full justify-between py-2">
                         <div className="cursor-pointer">
                              <Link href="/">
                                   <a>
                                        <Image
                                             src="/images/logo/bom_word.png"
                                             alt="BOM logo"
                                             width={size.width}
                                             height={size.height}
                                             objectFit="contain"
                                        />
                                   </a>
                              </Link>
                         </div>
                         <div className="md:block hidden lg:w-[55vw] w-[50vw] px-4 lg:px-8">
                              <SearchBar />
                         </div>
                         <div className="md:flex hidden  flex-row items-center lg:gap-8 gap-4">
                              <WalletIcon
                                   onClick={() => router.push("/wallet")}
                              />
                              <EstimateIcon
                                   onClick={() => router.push("/estimate")}
                              />
                              <HeartIcon
                                   onClick={() => router.push("/bookmark")}
                              />

                              {user.status == false ? (
                                   <UserIcon
                                        text="Бүртгүүлэх"
                                        onClick={() => router.push("/login")}
                                   />
                              ) : (
                                   <UserDropdown {...{ user }} />
                              )}
                         </div>
                         <div className="md:hidden flex justify-center items-center gap-2">
                              <HeartIcon
                                   word={false}
                                   onClick={() => router.push("/bookmark")}
                              />
                              <button
                                   onClick={() => {
                                        setShowSideMenu(true);
                                   }}
                                   // onClick={openNav}
                              >
                                   <HiMenuAlt3
                                        size={30}
                                        className="hover:text-blue-400 text-white transition-all ease-in"
                                   />
                              </button>
                         </div>
                    </div>
               </ContainerX>
               <SideMenu
                    show={showSideMenu}
                    closeNav={() => {
                         setShowSideMenu(false);
                    }}
                    openNav={() => setShowSideMenu(true)}
               />
               <BottomMenu />
          </div>
     );
};

export default UpperNav;
