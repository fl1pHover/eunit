// import {

import Dashboard from '@/components/Profile/dashboard';
import MainContainer from '@/layout/mainContainer';
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

const Account = () => {
  const [content, setContent] = useState('Profile');
  const [active, setActive] = useState(false);

  return (
    <MainContainer py={5}>
      <div className="flex flex-col justify-center gap-3 md:flex-row">
        <Dashboard />

        <div
          className={`${
            content === 'Profile' ? 'md:w-[50%] w-full' : 'w-[100%]'
          }  bg-white rounded-2xl transition-all duration-200 p-10 `}
        >
          <div className="flex flex-row gap-5 border-b cursor-pointer border-b-bgGrey">
            {tabs.map((tab, index) => {
              return (
                <button
                  className={`${
                    tab.title === tab.comp ? 'border-b border-b-mainBlue' : ''
                  } pb-3`}
                  key={index}
                  onClick={
                    (() => setContent(tab.title), () => setActive(active))
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
