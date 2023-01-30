// import {

import Dashboard from '@/components/Profile/dashboard';
import { useAuth } from '@/context/auth';
import MainContainer from '@/layout/mainContainer';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Bookmark from './bookmark';
import MyAds from './myAds';
import Profile from './profile';

// /account

const Account = () => {
  const [content, setContent] = useState('Profile');
  const [active, setActive] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const tabs = [
    {
      tabHeader: 'Хувийн мэдээлэл',
      title: 'Profile',
      comp: <Profile user={user} />,
    },
    {
      tabHeader: 'Миний зарууд',
      title: 'MyAds',
      comp: <MyAds />,
    },
    {
      tabHeader: 'Миний хүслүүд',
      title: 'Bookmark',
      comp: <Bookmark />,
    },
  ];

  return (
    <MainContainer py={5}>
      <div
        className={mergeNames(STYLES.flexCenter, 'flex-col gap-3 md:flex-row')}
      >
        <Center>
          <Dashboard />
        </Center>

        <div
          className={mergeNames(
            content === 'Profile' ? 'md:w-[800px] w-full' : 'w-[100%]',
            'bg-white shadow-lg rounded-2xl w-full transition-all duration-500 p-5 md:p-10'
          )}
        >
          <div className="flex flex-row gap-5 border-b cursor-pointer border-b-bgGrey lg:text-base text-[12px]">
            {tabs.map((tab, index) => {
              return (
                <button
                  className="pb-3 focus:border-b-2 focus:border-b-mainBlue"
                  key={index}
                  onClick={
                    () => {
                      setContent(tab.title);

                      router.push(`account?${tab.title}`, undefined, {
                        shallow: false,
                      });
                    }
                    // (() =>

                    //   router.push(`account?${tab.title}`, undefined, {
                    //     shallow: true,
                    //   }),
                    // () => setContent(tab.title))
                  }
                >
                  {tab.tabHeader}
                </button>
              );
            })}
          </div>

          {tabs.map((tab, index) => {
            return (
              <>{tab.title && <div>{content === tab.title && tab.comp}</div>}</>
            );
          })}
        </div>
      </div>
    </MainContainer>
  );
};

export default Account;
