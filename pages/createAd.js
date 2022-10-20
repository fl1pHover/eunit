import { Grid, GridItem, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

const categories = [
  {
    category: "Үл хөдлөх хөрөнгө",
    categories: [
      {
        category: "Газар",
        filters: [
          "Зарын гарчиг... 100 тэмдэгтэд багтаан бичнэ үү. ",
          "Газрын зориулалт",
          "Эзэмшлийн хэлбэр",
          "Утас",
          "Үнэ",
          "Талбай",
          "Нэгж талбайн үнэ",
          "Дүүрэг",
          "Хороо",
          "Байршил",
          "Гэрчилгээ олгосон он",
          "Хүчинтэй хугацаа (жил)",
          "Бартер",
          "Төлбөрийн нөхцөл",
          "Газрын зурагт байршил сонго",
          "Хөрөнгийн зураг",
          "Кадастрын зураг",
          "Зарын дэлгэрэнгүй... 10000 тэмдэгтэд багтаан бичнэ үү.",
        ],
      },
      {
        category: "Оффис",

        filters: [
          "Зарын гарчиг... 100 тэмдэгтэд багтаан бичнэ үү. ",
          "Утас",
          "Үнэ",
          "Талбай",
          "Нэгж талбайн үнэ",
          "Дүүрэг",
          "Хороо",
          "Байршил",
          "Оффисын нэр",
          "Ашиглалтад орсон он",
          "Барилгын давхар",
          "Хэдэн давхарт",
          "Бартер",
          "Төлбөрийн нөхцөл",
          "Газрын зурагт байршил сонго",
          "Хөрөнгийн зураг",
          "План зураг",
          "Зарын дэлгэрэнгүй... 10000 тэмдэгтэд багтаан бичнэ үү.",
        ],
      },
    ],
  },
  {
    category: "Үл хөдлөх хөрөнгө",
    categories: [{ category: "Газар" }, { category: "Оффис" }],
  },
];
const types = ["Зарах"];

export default function CreateAd() {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  return (
    <VStack>
      <HStack>
        <Text>Зарах хөрөнгийн төрөл</Text>
        <Select
          placeholder="Сонгох"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          {categories.map((c, i) => {
            return (
              <option value={`${i}`} key={i}>
                {c.category}
              </option>
            );
          })}
        </Select>
      </HStack>
      <HStack>
        <Text>Борлуулах төрөл</Text>
        <Select
          placeholder="Сонгох"
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          {types.map((t, i) => {
            return (
              <option value={t} key={i}>
                {t}
              </option>
            );
          })}
        </Select>
      </HStack>
      {category != "" && (
        <HStack>
          <Text>Хөрөнгийн дэд төрөл</Text>
          <Select
            placeholder="Сонгох"
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
          >
            {categories[category] !== undefined &&
              categories[category].categories.map((c, i) => {
                return (
                  <option key={i} value={`${i}`}>
                    {c.category}
                  </option>
                );
              })}
          </Select>
        </HStack>
      )}
          <VStack>
      {category != "" && subCategory != "" && categories[category].categories[subCategory].filters.map((f, i) => {
        console.log(categories[category].categories[subCategory].filters.length )
        return (
            <>
            {(i == 0) && <Input placeholder={f}/>}
            {(i == categories[category].categories[subCategory].filters.length - 1) && <Input placeholder={f}/>}
            {i == categories[category].categories[subCategory].filters.length - 2  && <Input type={'file'}/> }
            { i == categories[category].categories[subCategory].filters.length - 3 && <Input type={'file'}/>}
            { i == categories[category].categories[subCategory].filters.length - 3 && <Input type={'file'}/>}
            {(i!=0 && i!=categories[category].categories[subCategory].filters.length - 1 && i!=categories[category].categories[subCategory].filters.length - 2 && i!= categories[category].categories[subCategory].filters.length - 3 && categories[category].categories[subCategory].filters.length - 4 && <Input/>)}
            </>
        )
    })}
    </VStack>
    </VStack>
  );
}
