import { AiOutlineCar } from 'react-icons/ai';
import { BsBuilding, BsPhone } from 'react-icons/bs';
import { CgSmartHomeWashMachine } from 'react-icons/cg';
import { MdComputer } from 'react-icons/md';
import { RiHomeSmile2Line } from 'react-icons/ri';
export const SellTypes = {
  sell: {
    id: 'sell',
    name: 'Зарах',
  },
  rent: {
    id: 'rent',
    name: 'Түрээслэх',
  },
  sellRent: {
    id: 'sellRent',
    name: 'Зарах, түрээслэх',
  },
};
export const Committee = [
  {
    id: '1khoroo',
    value: '1-р хороо',
  },
  {
    id: '2khoroo',
    value: '2-р хороо',
  },
  {
    id: '3khoroo',
    value: '3-р хороо',
  },
  {
    id: '4khoroo',
    value: '4-р хороо',
  },
  {
    id: '5khoroo',
    value: '5-р хороо',
  },
  {
    id: '6khoroo',
    value: '6-р хороо',
  },
  {
    id: '7khoroo',
    value: '7-р хороо',
  },
  {
    id: '8khoroo',
    value: '8-р хороо',
  },
  {
    id: '9khoroo',
    value: '9-р хороо',
  },
  {
    id: '10khoroo',
    value: '10-р хороо',
  },
  {
    id: '11khoroo',
    value: '11-р хороо',
  },
  {
    id: '12khoroo',
    value: '12-р хороо',
  },
  {
    id: '13khoroo',
    value: '13-р хороо',
  },
  {
    id: '14khoroo',
    value: '14-р хороо',
  },
  {
    id: '15khoroo',
    value: '15-р хороо',
  },
  {
    id: '16khoroo',
    value: '16-р хороо',
  },
  {
    id: '17khoroo',
    value: '17-р хороо',
  },
  {
    id: '18khoroo',
    value: '18-р хороо',
  },
  {
    id: '19khoroo',
    value: '19-р хороо',
  },
  {
    id: '20khoroo',
    value: '20-р хороо',
  },
  {
    id: '21khoroo',
    value: '21-р хороо',
  },
  {
    id: '22khoroo',
    value: '22-р хороо',
  },
  {
    id: '23khoroo',
    value: '23-р хороо',
  },
  {
    id: '24khoroo',
    value: '24-р хороо',
  },
  {
    id: '25khoroo',
    value: '25-р хороо',
  },
  {
    id: '26khoroo',
    value: '26-р хороо',
  },
  {
    id: '27khoroo',
    value: '27-р хороо',
  },
  {
    id: '28khoroo',
    value: '28-р хороо',
  },
  {
    id: '29khoroo',
    value: '29-р хороо',
  },
  {
    id: '30khoroo',
    value: '30-р хороо',
  },
];
export const AdTypes = {
  default: {
    id: 'default',
    name: 'Энгийн',
  },
  special: {
    id: 'special',
    name: 'Онцгой',
  },
  poster: {
    id: 'poster',
    name: 'Постэр',
  },
};

export const Category = {
  realState: 'realState',
  vehicle: 'vehicle',
  computer: 'computer',
  phone: 'phone',
  electronics: 'electronics',
  householdItems: 'householdItems',
};

export const getIconCategory = ({ item }) => {
  switch (item) {
    case Category.realState:
      return <BsBuilding />;
    case Category.vehicle:
      return <AiOutlineCar />;
    case Category.computer:
      return <MdComputer />;
    case Category.phone:
      return <BsPhone />;
    case Category.electronics:
      return <CgSmartHomeWashMachine />;
    case Category.householdItems:
      return <RiHomeSmile2Line />;
  }
};

export const Filters = {
  floor: {
    id: 'floor',
    name: 'Шал',
  },
  room: {
    id: 'room',
    name: 'Өрөөний тоо',
  },
  bathroom: {
    id: 'bathroom',
    name: 'Угаалгын өрөөний тоо',
  },
  masterBedroom: {
    id: 'masterBedroom',
    name: 'Мастер өрөөний тоо',
  },
  window: {
    id: 'window',
    name: 'Цонх',
  },
  windowUnit: {
    id: 'windowUnit',
    name: 'Цонхны тоо',
  },
  door: {
    id: 'door',
    name: 'Хаалга',
  },
  balconyUnit: {
    id: 'balconyUnit',
    name: 'Тагтны тоо',
  },
  buildingFloor: {
    id: 'buildingFloor',
    name: 'Барилгын давхар',
  },
  garage: {
    id: 'garage',
    name: 'Гараж',
  },
  paymentMethod: {
    id: 'paymentMethod',
    name: 'Төлбөрийн хэлбэр',
  },
  barter: {
    id: 'barter',
    name: 'Бартер',
  },
  landLicense: {
    id: 'landLicense',
    name: 'Газрын эзэмшлийн хэлбэр',
  },
  landUsage: {
    id: 'landUsage',
    name: 'Газрын зориулалт',
  },
  objectType: {
    id: 'objectType',
    name: 'Объектын төрөл',
  },
  serviceType: {
    id: 'serviceType',
    name: 'Үйл ажиллагааны хэлбэр',
  },
  phone: {
    id: 'phone',
    name: 'Утас',
  },
  price: {
    id: 'price',
    name: 'Үнэ',
  },
  unitPrice: {
    id: 'unitPrice',
    name: 'Нэгжийн үнэ',
  },
  area: {
    id: 'area',
    name: 'Талбай',
  },
  operation: {
    id: 'operation',
    name: 'Ашиглалтанд орсон он',
  },
  district: {
    id: 'district',
    name: 'Дүүрэг',
  },
  committee: {
    id: 'committee',
    name: 'Хороо',
  },
  location: {
    id: 'location',
    name: 'Байршил',
  },
  town: {
    id: 'town',
    name: 'Хотхон',
  },
  howFloor: {
    id: 'howFloor',
    name: 'Хэдэн давхарт',
  },
};

export const swiperBreakpoints = {
  // sm
  1: {
    slidesPerView: 1,
    grid: {
      rows: 2,
      fill: 'row',
    },
  },
  640: {
    slidesPerView: 3,
    grid: {
      rows: 2,
      fill: 'row',
    },
  },
  // md
  768: {
    slidesPerView: 3,
    grid: {
      rows: 2,
      fill: 'row',
    },
  },
  // lg
  1024: {
    slidesPerView: 4,
    grid: {
      rows: 2,
      fill: 'row',
    },
  },
  // xl
  1280: {
    slidesPerView: 5,
    grid: {
      rows: 2,
      fill: 'row',
    },
  },
};
