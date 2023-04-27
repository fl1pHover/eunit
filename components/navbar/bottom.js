
import { Image } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdOutlineClear } from 'react-icons/md';
import urls from '../../constants/api';
import { useAuth } from '../../context/auth';
import { UserIcon, WhiteHeartIcon } from './icons';
import NavCategory from './navCategory';
import UserDrawer from './userDrawer';
import mergeNames from '../../util/mergeNames';
import { NavContainer } from '@/lib/Container';
import { createAdNav } from '@/data/adminNav';

const Bottom = ({ sticky, user }) => {
  const { logout } = useAuth();
  const router = useRouter();
  const token = getCookie('token');

  // Visible start

  const [isHoveringId, setIsHoveringId] = useState(true);
  const [activeSearch, setActiveSearch] = useState(false);
  const handleMouseOver = (id) => {
    setIsHoveringId(id);
  };

  const handleMouseOut = () => {
    setIsHoveringId(false);
  };
  // Visible end

  // Search start
  const [search, setSearch] = useState('');
  const searchAds = async (value) => {
    try {
      await fetch(`${urls['test']}/ad/search/{value}?value=${value}`).then(
        (d) => d.json()
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = (e) => {
    // 👇️ clear input value
    setSearch('');
    console.log('clear input');
  };

  // Search end

  return (
    <div className={mergeNames('md:block hidden', 'bg-mainBlossom ')}>
      <NavContainer>
        <div className="flex flex-row items-center justify-center gap-10">
          <div className="flex flex-row items-center ">
            {/* logo */}
            <Link href="/">
              <a className="p-2">
                <Image
                  src="/images/logo/bom-white.png"
                  alt="Logo"
                  className="h-6"
                />
              </a>
            </Link>

            {/* Categoriud */}
            <NavCategory />
          </div>

          {/* baruun taliin bookmark search etc */}
          <div className="flex flex-row items-center text-white">
            <button
              className="h-full px-2"
              onClick={() => setActiveSearch(true)}
            >
              <HiOutlineSearch />
            </button>

            <WhiteHeartIcon
              onClick={() => router.push('/account?tab=Bookmark')}
            />

            {!token || user == undefined ? (
              <UserIcon text="Нэвтрэх" onClick={() => router.push('/login')} />
            ) : (
              <UserDrawer user={user} />
            )}
            {createAdNav?.map(({ tabName, id, submenu }, key) => {
              return (
                <div
                  key={key}
                  onMouseOver={() => handleMouseOver(id)}
                  onMouseOut={handleMouseOut}
                  className={mergeNames(
                    'hover:bg-teal-700 transition-colors ease-in-out bg-teal-800'
                  )}
                >
                  <div className="h-full">
                    <div className="flex flex-col justify-center h-full px-2 py-4 lg:py-3 lg:px-4">
                      <Link href={`/${id}`}>
                        <a className="text-[11px] font-medium text-center h-full text-white lg:text-[13px]">
                          {tabName}
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="absolute  w-auto  flex flex-col overflow-hidden justify-center bg-teal-800/[96]">
                    {submenu &&
                      isHoveringId &&
                      isHoveringId === id &&
                      submenu.map(({ tab, href }, subkey) => {
                        return (
                          <Fragment key={subkey}>
                            <Link href={`/${href}`}>
                              <a
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={mergeNames(
                                  'px-2 lg:px-4 py-3 text-[10px] lg:text-sm font-medium text-white transition-colors ease-in cursor-pointer bg-teal-700/[96] hover:bg-teal-600 first-letter:uppercase whitespace-nowrap z-30',
                                  subkey === submenu.length - 1
                                    ? ''
                                    : 'border-r border-blue-900/[96]'
                                )}
                              >
                                <p>{tab}</p>
                              </a>
                            </Link>
                          </Fragment>
                        );
                      })}
                  </div>
                </div>
              );
            })}
            {/* <Link href={'/createAd'}>
              <button className="px-4 py-1 ml-2 text-sm font-semibold transition-all bg-teal-700 rounded-lg hover:scale-105">
                <p>Зар нэмх</p>

              </button>
            </Link> */}
          </div>
        </div>

        {/* Search input */}
        {activeSearch && (
          <motion.div
            onMouseOut={() => setActiveSearch(false)}
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                stiffness: 0,
                ease: 'easeInOut',
                duration: 0.3,
              },
            }}
            onMouseOver={() => setActiveSearch(true)}
            className={mergeNames(
              'bg-blue-900/[0.96] w-full absolute left-0',
              'py-2',
              STYLES.flexCenter,
              'items-center text-2xl text-blue-300'
            )}
          >
            <div className="relative flex flex-row items-center w-2/5 h-10">
              <button className="disabled">
                <HiOutlineSearch
                  onClick={async () => {
                    try {
                      await axios
                        .get(
                          `${urls['test']}/ad/search/{value}?value=${search}`
                        )
                        .then((d) => {
                          setAds(d.data);
                          router.push('/search');
                        });
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                />
              </button>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Зараа хайна уу"
                onKeyPress={(e) => {
                  if (event.key === 'Enter') {
                    () => func(search), console.log('Search enter press!!');
                  }
                }}
                value={search}
                className={mergeNames(
                  'h-full w-full ml-2 border-none rounded-md placeholder-blue-300/40 bg-mainBlossom bg-opacity-40  focus:ring-0 '
                )}
              />
              <button
                onClick={handleClear}
                className={mergeNames(
                  'text-xs rounded-full p-[2px] bg-mainBlossom/80',
                  'absolute right-2'
                )}
              >
                <MdOutlineClear />
              </button>
            </div>
          </motion.div>
        )}
      </NavContainer>
    </div>
  );
};

export default Bottom;

export async function getServerSideProps({ req, res }) {
  const token = getCookie('token', { req, res });

  if (!token)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
}
