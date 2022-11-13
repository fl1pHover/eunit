import { AiOutlineCar } from "react-icons/ai";
import { BsBuilding, BsPhone } from "react-icons/bs";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { MdComputer } from "react-icons/md";
import { RiHomeSmile2Line } from "react-icons/ri";

export const categories = [
     {
          image: "/images/HeaderSlider/1.jpg",
          categoryName: "Үл хөдлөх хөрөнгө",
          icon: <BsBuilding />,
          id: "realState",
          itemCount: "105",
          submenu: [
               {
                    category: "Орон сууц",
                    href: "/apartment",
               },
               {
                    category: "Газар",
                    href: "/land",
               },
               {
                    category: "Хашаа байшин",
                    href: "/fenceHouse",
               },
               {
                    category: "Худалдаа, үйлчилгээний талбай",
                    href: "/department",
               },
               {
                    category: "АОС, хаус, зуслан",
                    href: "house",
               },
               {
                    category: "Үйлдвэр агуулах объект",
                    href: "warehouise",
               },
               {
                    category: "Гараж, контейнер, зөөврийн сууц",
                    href: "garage",
               },
               {
                    category: "Оффис",
                    href: "office",
               },
          ],
     },
     {
          image: "/images/category/car.jpg",
          icon: <AiOutlineCar />,
          categoryName: "Тээврийн хэрэгсэл",
          id: "vehicle",
          itemCount: "105",
          submenu: [
               {
                    category: "Автомашин",
                    href: "car",
               },
               {
                    category: "Мотоцикл, мопед",
                    href: "moto",
               },
               {
                    category: "Унадаг дугуй",
                    href: "bike",
               },
          ],
     },
     {
          image: "/images/category/computer.jpg",
          icon: <MdComputer />,
          categoryName: "Компьютер",
          id: "computer",
          itemCount: "105",
          submenu: [
               {
                    category: "Суурин компьютер",
                    href: "desktop",
               },
               {
                    category: "Зөөврийн компьютер",
                    href: "laptop",
               },
          ],
     },
     {
          image: "/images/category/phone.jpg",
          icon: <BsPhone />,
          categoryName: "Гар утас",
          id: "phone",
          itemCount: "105",
          submenu: [
               {
                    category: "Ухаалаг утас",
                    href: "smartphone",
               },
               {
                    category: "IPad/Tablet",
                    href: "tab",
               },
               {
                    category: "дагалдах хэрэгсэл",
                    href: "accessories",
               },
          ],
     },
     {
          image: "/images/category/electronic.jpg",
          icon: <CgSmartHomeWashMachine />,
          categoryName: "Цахилгаан бараа",
          id: "electronic",
          itemCount: "105",
          submenu: [
               {
                    category: "дагалдах хэрэгсэл",
                    href: "accessories",
               },
          ],
     },
     {
          image: "/images/category/home.jpg",
          icon: <RiHomeSmile2Line />,
          categoryName: "Гэр ахуйн бараа",
          id: "household-items",
          itemCount: "105",
          submenu: [
               {
                    category: "дагалдах хэрэгсэл",
                    href: "accessories",
               },
          ],
     },
];
