import urls from "@/constants/api";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "store/slice/user";

export const getJson = (data) => {
  let apartmentJson = [];
  let officeJson = [];
  let houseJson = [];
  let serviceJson = [];
  let factoryJson = [];
  let landJson = [];
  let garageJson = [];
  data.map((d) => {
    if (d.subCategory.name == "Орон сууц") {
      let json = {
        adType: d.adType,
        type: d.types[0],
        area: d.filters.find((f) => f.type == "area")["input"],
        balcony: d.filters.find((f) => f.type == "balconyUnit")["input"],
        barter: d.filters.find((f) => f.type == "barter")["input"],
        bathroom: d.filters.find((f) => f.type == "bathroom")["input"],
        bedroom: d.filters.find((f) => f.type == "masterBedroom")["input"],
        buildingFloor: d.filters.find((f) => f.type == "buildingFloor")[
          "input"
        ],
        committee: d.filters.find((f) => f.type == "committee")["input"],
        district: d.filters.find((f) => f.type == "district")["input"],
        door: d.filters.find((f) => f.type == "door")["input"],
        floor: d.filters.find((f) => f.type == "floor")["input"],
        garage: d.filters.find((f) => f.type == "garage")["input"],
        howFloor: d.filters.find((f) => f.type == "howFloor")["input"],
        number: `${d.num}`,
        operation: d.filters.find((f) => f.type == "operation")["input"],
        payment: d.filters.find((f) => f.type == "paymentMethod")["input"],
        position: d.filters.find((f) => f.type == "location")["input"],
        price: d.filters.find((f) => f.type == "price")["input"],
        process: d.filters.find((f) => f.type == "buildingProcess")["input"],
        room: d.filters.find((f) => f.type == "room")["input"],
        town: d.filters.find((f) => f.type == "town")["input"],
        unitPrice: d.filters.find((f) => f.type == "unitPrice")["input"],
        window: d.filters.find((f) => f.type == "window")["input"],
        windowUnit: d.filters.find((f) => f.type == "windowUnit")["input"],
      };
      apartmentJson.push(json);
    }
    if (d.subCategory.name == "Оффис") {
      let json = {
        adType: d.adType,
        type: d.types[0],
        area: d.filters.find((f) => f.type == "area")["input"],
        officeName: d.filters.find((f) => f.type == "officeName")["input"],
        barter: d.filters.find((f) => f.type == "barter")["input"],
        buildingFloor: d.filters.find((f) => f.type == "buildingFloor")[
          "input"
        ],
        committee: d.filters.find((f) => f.type == "committee")["input"],
        district: d.filters.find((f) => f.type == "district")["input"],

        howFloor: d.filters.find((f) => f.type == "howFloor")["input"],
        number: `${d.num}`,
        operation: d.filters.find((f) => f.type == "operation")["input"],
        payment: d.filters.find((f) => f.type == "paymentMethod")["input"],
        position: d.filters.find((f) => f.type == "location")["input"],
        price: d.filters.find((f) => f.type == "price")["input"],
        unitPrice: d.filters.find((f) => f.type == "unitPrice")["input"],
      };
      officeJson.push(json);
    }
    if (d.subCategory.name == "Худалдаа, үйлчилгээний талбай") {
      let json = {
        adType: d.adType,
        type: d.types[0],
        area: d.filters.find((f) => f.type == "area")["input"],
        tradeService: d.filters.find((f) => f.type == "tradeService")["input"],
        barter: d.filters.find((f) => f.type == "barter")["input"],
        buildingFloor: d.filters.find((f) => f.type == "buildingFloor")[
          "input"
        ],
        committee: d.filters.find((f) => f.type == "committee")["input"],
        serviceType: d.filters.find((f) => f.type == "serviceType")["input"],
        district: d.filters.find((f) => f.type == "district")["input"],
        howFloor: d.filters.find((f) => f.type == "howFloor")["input"],
        number: `${d.num}`,
        operation: d.filters.find((f) => f.type == "operation")["input"],
        payment: d.filters.find((f) => f.type == "paymentMethod")["input"],
        position: d.filters.find((f) => f.type == "location")["input"],
        price: d.filters.find((f) => f.type == "price")["input"],
        unitPrice: d.filters.find((f) => f.type == "unitPrice")["input"],
      };
      serviceJson.push(json);
    }
    if (d.subCategory.name == "Газар") {
      let json = {
        adType: d.adType,
        type: d.types[0],
        area: d.filters.find((f) => f.type == "area")["input"],
        barter: d.filters.find((f) => f.type == "barter")["input"],
        committee: d.filters.find((f) => f.type == "committee")["input"],
        landUsage: d.filters.find((f) => f.type == "landUsage")["input"],
        landLicense: d.filters.find((f) => f.type == "landLicense")["input"],
        district: d.filters.find((f) => f.type == "district")["input"],
        number: `${d.num}`,
        licenseOperation: d.filters.find((f) => f.type == "licenseOperation")[
          "input"
        ],
        validDate: d.filters.find((f) => f.type == "validDate")["input"],
        payment: d.filters.find((f) => f.type == "paymentMethod")["input"],
        position: d.filters.find((f) => f.type == "location")["input"],
        price: d.filters.find((f) => f.type == "price")["input"],
        unitPrice: d.filters.find((f) => f.type == "unitPrice")["input"],
      };
      landJson.push(json);
    }
    if (d.subCategory.name == "Үйлдвэр агуулах объект") {
      let json = {
        adType: d.adType,
        type: d.types[0],
        area: d.filters.find((f) => f.type == "area")["input"],
        objectType: d.filters.find((f) => f.type == "objectType")["input"],
        barter: d.filters.find((f) => f.type == "barter")["input"],
        buildingFloor: d.filters.find((f) => f.type == "buildingFloor")[
          "input"
        ],
        committee: d.filters.find((f) => f.type == "committee")["input"],
        district: d.filters.find((f) => f.type == "district")["input"],
        number: `${d.num}`,
        operation: d.filters.find((f) => f.type == "operation")["input"],
        payment: d.filters.find((f) => f.type == "paymentMethod")["input"],
        position: d.filters.find((f) => f.type == "location")["input"],
        price: d.filters.find((f) => f.type == "price")["input"],
        unitPrice: d.filters.find((f) => f.type == "unitPrice")["input"],
      };
      factoryJson.push(json);
    }
    if (d.subCategory.name == "Гараж, контейнер, зөөврийн сууц") {
      let json = {
        adType: d.adType,
        type: d.types[0],
        area: d.filters.find((f) => f.type == "area")["input"],
        barter: d.filters.find((f) => f.type == "barter")["input"],
        committee: d.filters.find((f) => f.type == "committee")["input"],
        district: d.filters.find((f) => f.type == "district")["input"],
        number: `${d.num}`,
        operation: d.filters.find((f) => f.type == "operation")["input"],
        payment: d.filters.find((f) => f.type == "paymentMethod")["input"],
        position: d.filters.find((f) => f.type == "location")["input"],
        price: d.filters.find((f) => f.type == "price")["input"],
        unitPrice: d.filters.find((f) => f.type == "unitPrice")["input"],
      };
      garageJson.push(json);
    }
  });
  return {
    apartmentJson,
    officeJson,
    garageJson,
    serviceJson,
    landJson,
    factoryJson,
  };
};

export const getSuggestionValue = (suggestion) => {
  switch (suggestion) {
    case "room":
      return <option value="room">Өрөөгөөр</option>;
    case "location":
      return <option value="location">Байршлаар</option>;
    case "landUsage":
      return <option value="landUsage">Зориулалтаар</option>;
    default:
      return;
  }
};

export const getSellType = (type) => {
  switch (type) {
    case "Зарах":
      return "sell";
    case "Түрээслүүлэх":
      return "rent";
    case "Зарах, түрээслүүлэх":
      return "sellRent";
    case "Зарсан":
      return "sold";
    case "Түрээслэсэн":
      return "rented";
    case "sell":
      return "Зарах";
    case "rent":
      return "Түрээслүүлэх";
    case "sellRent":
      return "Зарах, түрээслүүлэх";
    case "sold":
      return "Зарсан";
    case "rented":
      return "Түрээслүүлсэн";

    default:
      return;
  }
};

export const getEstimateEnums = (est) => {
  switch (est) {
    case "estimated":
      return "Үнэлсэн";
    case "finished":
      return "Дууссан";
    case "pending":
      return "Хүлээгдэж байгаа";
    case "returned":
      return "Буцаагдсан";
    default:
  }
};
export const stopPropagation = (e) => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};

export const getUser = async () => {
  let token = getCookie("token");
  let dispatch = useDispatch();
  await axios
    .get(`${urls["test"]}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((d) => dispatch(setUser(d.data)));
};

export const updateMessageEstimate = async (id, status, body = {}) => {
  let token = getCookie("token");
  let router = useRouter();
  let toast = useToast();
  try {
    await axios
      .put(`${urls["test"]}/estimate/message/${id}/${status}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((d) => {
        if (d.data.acknowledged) {
          router.reload();
          toast({
            title: "Амжилттай .",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      });
  } catch (error) {
    console.error(error);
  }
};

export const setAdType = async (id, type, message = "") => {
  let token = getCookie("token");

  try {
    await axios.get(
      `${urls["test"]}/ad/adType/${id}/${type}/{message}?message=${message}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};
export const updateBookmarks = async (bookmarks) => {
  let token = getCookie("token");
  try {
    await axios.post(
      `${urls["test"]}/bookmark/ad`,
      {
        ads: bookmarks,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};
