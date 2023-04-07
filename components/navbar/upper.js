import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { HiMenuAlt3 } from 'react-icons/hi';
import useBreakpoints from '../../hooks/useBreakpoints';
import { NavContainer } from '../../lib/Container';

import urls from '@/constants/api';
import { Image, useDisclosure } from '@chakra-ui/react';
import { useAuth } from 'context/auth';
import Link from 'next/link';
import { useRef } from 'react';
import BottomMenu from './bottomMenu';
import { WhiteHeartIcon } from './icons';
import SideMenu from './sideMenu';
import { BiPlusCircle } from 'react-icons/bi';

const calcSize = (pt) => {
  switch (pt) {
    case '3xl':
    case '2xl':
    case 'xl':
    case 'lg':
      return { width: 130, height: 63 };
    case 'md':
    case 'sm':
    case 'xs': {
      return { width: 110, height: 43 };
    }
    case 'default':
      return { width: 105, height: 38 };
    default: {
      return { width: 140, height: 73 };
    }
  }
};
const UpperNav = () => {
  const router = useRouter();
  const pt = useBreakpoints();

  const [size, setSize] = useState(() => calcSize(pt));
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showBottomMenu, setShowBottomMenu] = useState(false);
  const { user, logout, setAds } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    setSize(calcSize(pt));
  }, [pt]);

  const searchAds = async (value) => {
    try {
      await fetch(`${urls['test']}/ad/search/{value}?value=${value}`)
        .then((d) => d.json())
        .then((d) => setAds(d));
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  return (
    <div className="sticky z-30 shadow-lg md:bg-white bg-mainBlossom md:hidden">
      <NavContainer>
        <div className="flex items-center justify-between gap-2 py-2 ">
          <Link href={'/'}>
            <a>
              <Image
                src="/images/logo/bom-white-text.png"
                alt="BOM logo"
                width={size.width}
                height={size.height}
                objectFit="contain"
              />
            </a>
          </Link>
          <div className="flex items-center">
            <Link href={'/create/ad'}>
              <button className="px-4 py-1 ml-2 text-sm font-semibold text-white transition-all bg-teal-700 rounded-lg hover:scale-105">
                <p>Зар нэмэх</p>
                {/* <BiPlusCircle className="hidden lg:block" /> */}
              </button>
            </Link>
            <WhiteHeartIcon
              word={false}
              onClick={() => router.push('/account?tab=Bookmark')}
            />
            <button
              onClick={() => {
                setShowSideMenu(true);
              }}

              // onClick={openNav}
            >
              <HiMenuAlt3
                size={30}
                className="text-white transition-all ease-in hover:text-blue-400"
              />
            </button>
          </div>
        </div>
        {/* </div> */}
      </NavContainer>
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
