// import {

import Dashboard from '@/components/Profile/dashboard';
import MainContainer from '@/layout/mainContainer';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Center } from '@chakra-ui/react';
import { useState } from 'react';
import MyAds from './myAds';
import Profile from './profile';

const tabs = [
  {
    tabHeader: 'Хувийн мэдээлэл',
    title: 'Profile',
    comp: <Profile />,
  },
  {
    tabHeader: 'Миний зарууд',
    title: 'MyAds',
    comp: <MyAds />,
  },
];

// /account

const Account = () => {
  const [content, setContent] = useState('Profile');
  const [active, setActive] = useState(false);

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
            'bg-white shadow-lg rounded-2xl w-full transition-all duration-500 p-10'
          )}
        >
          <div className="flex flex-row gap-5 border-b cursor-pointer border-b-bgGrey">
            {tabs.map((tab, index) => {
              return (
                <button
                  className="pb-3 focus:border-b-2 focus:border-b-mainBlue"
                  key={index}
                  onClick={() => setContent(tab.title)}
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
