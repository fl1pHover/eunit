import { AiOutlineCar } from 'react-icons/ai';
import { BsBuilding } from 'react-icons/bs';
import { CgSmartHomeWashMachine } from 'react-icons/cg';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { MdComputer } from 'react-icons/md';
import { RiHomeSmile2Line } from 'react-icons/ri';

export const adminNav = [
  {
    tabName: 'Хүсэлт өгсөн зарууд',
    id: 'request',

    submenu: [
      {
        tab: 'Үл хөдлөх',
        href: 'request/realState',
      },
      {
        tab: 'Тээврийн хэрэгсэл',
        href: 'request/vehicle',
      },
      {
        tab: 'Компьютер',
        href: 'request/computer',
      },
      {
        tab: 'Цахилгаан бараа',
        href: 'request/electronic',
      },
      {
        tab: 'Гэр ахуйн бараа',
        href: 'request/household-items',
      },
    ],
  },
  {
    tabName: 'Агент байгууллагын хүсэлт',
    id: 'users',

    submenu: [
      {
        tab: 'Агент',
        href: 'users/agent',
      },
      {
        tab: 'Байгууллага',
        href: 'users/organization',
      },
      {
        tab: 'Энгийн',
        href: 'users/default',
      },
    ],
  },
  {
    tabName: 'EUnit хэтэвч',
    id: 'wallet',
  },

  {
    tabName: 'Хуваалцсан зар',
    id: 'shared',
  },
  {
    tabName: 'Санал хүсэлт',
    id: 'feedback',
  },
];
