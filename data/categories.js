import { AiOutlineCar } from 'react-icons/ai';
import { BsBuilding, BsPhone } from 'react-icons/bs';
import { CgSmartHomeWashMachine } from 'react-icons/cg';
import { MdComputer } from 'react-icons/md';
import { RiHomeSmile2Line } from 'react-icons/ri';

export const categories = [
  {
    image: '/images/HeaderSlider/1.jpg',
    categoryName: 'Үл хөдлөх',
    icon: ({ size, className = '' }) => <BsBuilding {...{ size, className }} />,
    id: 'realState',
    itemCount: '105',
    submenu: [
      {
        category: 'Орон сууц',
        href: 'apartment',
      },
      {
        category: 'Газар',
        href: 'land',
      },
      {
        category: 'Хашаа байшин',
        href: 'fenceHouse',
      },
      {
        category: 'Худалдаа, үйлчилгээний талбай',
        href: 'trade',
      },
      {
        category: 'АОС, хаус, зуслан',
        href: 'house',
      },
      {
        category: 'Үйлдвэр агуулах объект',
        href: 'factory',
      },
      {
        category: 'Гараж, контейнер, зөөврийн сууц',
        href: 'garage',
      },
      {
        category: 'Оффис',
        href: 'office',
      },
    ],
  },
  {
    image: '/images/Category/vehicle.jpg',
    icon: ({ size, className = '' }) => (
      <AiOutlineCar {...{ size, className }} />
    ),
    categoryName: 'Тээврийн хэрэгсэл',
    id: 'vehicle',
    itemCount: '105',
    submenu: [
      {
        category: 'Автомашин',
        href: 'car',
      },
      {
        category: 'Мотоцикл, мопед',
        href: 'moto',
      },
      {
        category: 'Унадаг дугуй',
        href: 'bike',
      },
    ],
  },
  {
    image: '/images/Category/computer.jpg',
    icon: ({ size, className = '' }) => <MdComputer {...{ size, className }} />,
    categoryName: 'Компьютер',
    id: 'computer',
    itemCount: '105',
    submenu: [
      {
        category: 'Суурин компьютер',
        href: 'desktop',
      },
      {
        category: 'Зөөврийн компьютер',
        href: 'laptop',
      },
    ],
  },
  {
    image: '/images/Category/phone.jpg',
    icon: () => <BsPhone />,
    categoryName: 'Гар утас',
    id: 'phone',
    itemCount: '105',
    submenu: [
      {
        category: 'Ухаалаг утас',
        href: 'smartphone',
      },
      {
        category: 'IPad/Tablet',
        href: 'tab',
      },
      {
        category: 'дагалдах хэрэгсэл',
        href: 'accessories',
      },
    ],
  },
  {
    image: '/images/Category/electronics.jpg',
    icon: ({ size, className = '' }) => (
      <CgSmartHomeWashMachine {...{ size, className }} />
    ),
    categoryName: 'Цахилгаан бараа',
    id: 'electronic',
    itemCount: '105',
    submenu: [
      {
        category: 'дагалдах хэрэгсэл',
        href: 'accessories',
      },
    ],
  },
  {
    image: '/images/Category/householditems.jpg',
    icon: ({ size, className = '' }) => (
      <RiHomeSmile2Line {...{ size, className }} />
    ),

    categoryName: 'Гэр ахуйн бараа',
    id: 'household-items',
    itemCount: '105',
    submenu: [
      {
        category: 'дагалдах хэрэгсэл',
        href: 'accessories',
      },
    ],
  },
];
