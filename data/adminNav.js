export const adminNav = [
  {
    tabName: "Хүсэлт өгсөн зарууд",
    id: "request",

    submenu: [
      {
        tab: "Үл хөдлөх",
        href: "request/realState",
      },

      {
        tab: "Тээврийн хэрэгсэл",
        href: "request/vehicle",
      },
      {
        tab: "Компьютер",
        href: "request/computer",
      },
      {
        tab: "Цахилгаан бараа",
        href: "request/electronic",
      },
      {
        tab: "Гэр ахуйн бараа",
        href: "request/household-items",
      },
    ],
  },
  {
    tabName: "Агент байгууллагын хүсэлт",
    id: "users",

    submenu: [
      {
        tab: "Агент",
        href: "users/agent",
      },
      {
        tab: "Байгууллага",
        href: "users/organization",
      },
      {
        tab: "Энгийн",
        href: "users/default",
      },
    ],
  },
  {
    tabName: "EUnit хэтэвч",
    id: "wallet",
  },

  {
    tabName: "Хуваалцсан зар",
    id: "shared",
  },
  {
    tabName: "Санал хүсэлт",
    id: "feedback",
  },
  {
    tabName: "Үнэлгээ",
    id: "estimating",
  },
];
export const createAdNav = [
  {
    tabName: "Зар нэмэх",
    id: "create",

    submenu: [
      {
        tab: "Зар нэмэх",
        href: "create/ad",
      },
      {
        tab: "Зар хуваалцах",
        href: "create/sharing",
      },
    ],
  },
];
