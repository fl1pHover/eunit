// import {

import Dashboard from '@/components/Profile/dashboard';
import MainContainer from '@/layout/mainContainer';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import WalletPage from 'pages/walletPage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Bookmark from './bookmark';
import MyAds from './myAds';
import Profile from './profile';

const Account = () => {
  const router = useRouter();
  const [content, setContent] = useState('Profile');
  const { user } = useSelector((state) => state.user);
  const tabs = [
    {
      tabHeader: 'Хувийн мэдээлэл',
      title: 'Profile',

      comp: <Profile user={user} />,
    },
    {
      tabHeader: 'Миний зарууд',
      title: 'MyAds',

      comp: <MyAds user={user?.ads} />,
    },
    // {
    //   tabHeader: 'Хуваалцсан зарууд',
    //   title: 'SharedAds',

    //   comp: <SharedAds user={user} />,
    // },
    {
      tabHeader: 'Миний хүслүүд',
      title: 'Bookmark',

      comp: <Bookmark user={user} />,
    },
    {
      tabHeader: 'Хэтэвч',
      title: 'WalletPage',

      comp: <WalletPage user={user} />,
    },
  ];
  useEffect(() => {
    if (router?.query?.tab) {
      setContent(router?.query?.tab);
    }
  }, [router?.query?.tab]);

  // const { tabs, loading, error } = useRemoteData();

  return (
    <MainContainer py={5}>
      <div
        className={mergeNames(STYLES.flexCenter, 'flex-col gap-3 md:flex-row ')}
      >
        <div className="mx-auto md:mx-0">
          <Dashboard user={user} />
        </div>

        <div
          className={mergeNames(
            content === 'Profile' ? 'md:w-[800px] w-full' : 'w-[100%]',
            'relative bg-white shadow-lg rounded-2xl w-full p-5 md:p-10',
            'transition-all duration-500'
          )}
        >
          <div className="flex flex-row gap-5 border-b cursor-pointer border-b-bgGrey lg:text-base text-[12px]">
            {tabs.map((tab, index) => {
              return (
                <button
                  key={index}
                  className={mergeNames(
                    'pb-3 relative '
                    // content === tab.title
                    //   ? "border-b-2 border-mainBlue"
                    //   : "border-none"
                  )}
                  onClick={() => {
                    setContent(tab.title),
                      router.push(
                        {
                          pathname: '/account',
                          query: { tab: `${tab.title}` },
                        },
                        null,
                        { shallow: true }
                      );
                  }}
                >
                  <div
                    className={mergeNames(
                      'absolute bottom-0 left-1/2 -translate-x-1/2 bg-mainBlue h-[2px]  duration-300',
                      content === tab.title ? 'w-full ' : 'w-0'
                    )}
                  ></div>
                  {tab.tabHeader}
                </button>
              );
            })}
          </div>

          {tabs.map((tab, index) => {
            return (
              tab.title && (
                <>
                  <div key={index}>{content === tab.title && tab.comp}</div>
                </>
              )
            );
          })}
        </div>
      </div>
    </MainContainer>
  );
};

export default Account;
export async function getServerSideProps({ req, res }) {
  const token = getCookie('token', { req, res });
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
