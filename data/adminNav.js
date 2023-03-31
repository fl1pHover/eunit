import { AiOutlineCar } from 'react-icons/ai';
import { BsBuilding } from 'react-icons/bs';
import { CgSmartHomeWashMachine } from 'react-icons/cg';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { MdComputer } from 'react-icons/md';
import { RiHomeSmile2Line } from 'react-icons/ri';

export const adminNav = [
  {
    tabName: 'Хүсэлт өгсөн зарууд',
    id: 'reqAd',

    submenu: [
      {
        tab: 'Агент',
        href: 'agent',
      },
      {
        tab: 'Байгууллага',
        href: 'organization',
      },
    ],
  },
  {
    tabName: 'Агент байгууллагын хүсэлт',
    id: 'req',

    submenu: [
      {
        tab: 'Агент',
        href: 'agent',
      },
      {
        tab: 'Байгууллага',
        href: 'organization',
      },
    ],
  },
  {
    tabName: 'EUnit хэтэвч',
    id: 'wallet',
  },

  {
    tabName: 'Хуваалцсан зар',
    id: 'shareAd',
  },
  {
    tabName: 'Санал хүсэлт',
    id: 'feedback',
  },
];
