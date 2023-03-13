// import {

import Dashboard from '@/components/Profile/dashboard';
import urls from '@/constants/api';
import MainContainer from '@/layout/mainContainer';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Bookmark from './bookmark';
import MyAds from './myAds';
import Profile from './profile';

const Account = ({ user }) => {
  const router = useRouter();
  const [content, setContent] = useState('Profile');

  const tabs = [
    {
      tabHeader: 'Хувийн мэдээлэл',
      title: 'Profile',

      comp: <Profile user={user} />,
    },
    {
      tabHeader: 'Миний зарууд',
      title: 'MyAds',

      comp: <MyAds user={user} />,
    },
    {
      tabHeader: 'Миний хүслүүд',
      title: 'Bookmark',

      comp: <Bookmark user={user} />,
    },
  ];
  useEffect(() => {
    setContent(router?.query?.tab);
  }, [router?.query?.tab]);

  // const { tabs, loading, error } = useRemoteData();

  return (
    <MainContainer py={5}>
      <div
        className={mergeNames(STYLES.flexCenter, 'flex-col gap-3 md:flex-row ')}
      >
        <div className="mx-auto md:mx-0">
          <Dashboard />
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
                    'pb-3',
                    content === tab.title
                      ? 'border-b-2 border-mainBlue'
                      : 'border-none'
                  )}
                  onClick={() => {
                    setContent(tab.title);
                  }}
                >
                  {tab.tabHeader}
                </button>
              );
            })}
          </div>
          {/* Lorem ipsum dolor sit amet. */}

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
  // const res = await fetch(`${urls['test']}/category`);
  // const resjson = await res.json();
  const token = getCookie('token', { req, res });
  // const categories = resjson?.categories;
  if (!token)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  else {
    const user = await fetch(`${urls['test']}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userJson = await user.json();
    return {
      props: {
        user: userJson,
      },
    };
  }
}
