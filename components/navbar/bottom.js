import urls from '@/constants/api';
import { useAuth } from '@/context/auth';
import { NavContainer } from '@/lib/Container';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Image } from '@chakra-ui/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdOutlineClear } from 'react-icons/md';
import { UserIcon, WhiteHeartIcon } from './icons';
import NavCategory from './navCategory';
import UserDrawer from './userDrawer';

const Bottom = ({ sticky }) => {
  const { user, logout, setAds } = useAuth();
  const router = useRouter();

  // Visible start
  const [activeSearch, setActiveSearch] = useState(false);

  // Visible end

  // Search start
  const [search, setSearch] = useState('');
  const searchAds = async (value) => {
    try {
      await fetch(`${urls['test']}/ad/search/{value}?value=${value}`)
        .then((d) => d.json())
        .then((d) => setAds(d));
    } catch (err) {
      console.log(err.response.data.message);
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

            <WhiteHeartIcon onClick={() => router.push('/account?Bookmark')} />

            {user == undefined ? (
              <UserIcon
                text="Бүртгүүлэх"
                onClick={() => router.push('/login')}
              />
            ) : (
              <UserDrawer user={user} logout={logout} />
            )}

            <Link href={'/createAd'}>
              <button className="px-4 py-1 ml-2 text-sm font-semibold transition-all bg-teal-700 rounded-lg hover:scale-105">
                <p>Зар нэмэх</p>
                {/* <BiPlusCircle className="hidden lg:block" /> */}
              </button>
            </Link>
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
              <HiOutlineSearch
                onClick={async () => {
                  try {
                    await axios
                      .get(`${urls['test']}/ad/search/{value}?value=${search}`)
                      .then((d) => {
                        setAds(d.data);
                        router.push('/search');
                      });
                  } catch (error) {
                    console.error(error);
                  }
                }}
              />
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
