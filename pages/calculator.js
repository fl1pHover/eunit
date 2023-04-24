import { FormattedNumberInput } from "@/lib/Input";
import mergeNames from "@/util/mergeNames";
import {
  Button,
  Divider,
  Flex,
  Heading,
  NumberInput,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { STYLES } from "../styles";
const EstInput = (onChange, value) => {
  return (
    <Textarea
      width="150px"
      boxShadow={"inner"}
      onChange={onChange}
      defaultValue={value}
    />
  );
};

const CalcInput = ({
  placeholder,
  onChange,
  value,
  heading,
  className,
  unit,
  //   pre,
}) => {
  return (
    <>
      <div
        className={`${STYLES.flexBetween} flex-col items-baseline xs:items-center xs:flex-row gap-2 ${className}`}
      >
        <Heading variant={"smallHeading"}>{heading}</Heading>
        <Flex className="items-center gap-3">
          <NumberInput
            precision={2}

            // precision={pre}
          >
            <FormattedNumberInput // placeholder={placeholder}
              onChange={onChange}
              value={value == 0 ? "" : value}
              placeholder={placeholder}
              className="border-2 border-blue-400 rounded-full w-full sm:w-[300px] text-mainBlossom font-semibold"
              required
            />
          </NumberInput>
          <div className="w-8 text-right">
            <Heading variant={"smallHeading"}>{unit}</Heading>
          </div>
        </Flex>
      </div>
    </>
  );
};

function ECalculator({ data }) {

  const [price, setPrice] = useState(data);

  // Zeeliin hemjee
  const [principal, setPrincipal] = useState(0);

  // Niit tulugduh hemjeee
  const [amount, setAmount] = useState(0);

  // Huu
  const [interest, setInterest] = useState(0);

  // Zeeliiin hugatsaa
  const [time, setTime] = useState(0);

  // Uridchilgaa
  const [pay, setPay] = useState(0);

  const [emi, setEmi] = useState(0);
  // const [totalinterest, setTotalinterest] = useState(0);

  const handlePriceChange = (event) => {
    setPrice(event);
  };

  const handlePrincipalchange = (event) => {
    setPrincipal(event);
  };

  const handlePayChange = (event) => {
    setPay(event);
    if (price) {
      if (price - event > 0) {
        setPrincipal(price - event);
      }
    }
  };

  const handleInterestchange = (event) => {
    setInterest(event);
  };
  const handleTimechange = (event) => {
    setTime(event);
  };

  const calculateLoan = () => {
    if (principal > 0 && interest > 0 && time > 0) {
      let p = parseFloat(principal);
      let r = parseFloat(interest);
      let n = parseFloat(time);
      let actualRate = parseFloat(r / 12 / 100);

      let calcemi =
        p *
        actualRate *
        (Math.pow(1 + actualRate, n) / (Math.pow(1 + actualRate, n) - 1));

      // setPrincipal(price - pay);
      setEmi(
        Math.round(calcemi).toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })
      );
      setAmount(
        (calcemi * n).toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })
      );
      // setTotalinterest((calcemi * n - p).toFixed(2));
    } else {
    }
  };

  const [expand, setExpand] = useState(false);
  // const handleChange = (value) => setValue(value);

  return (
    <div className="relative flex flex-col gap-3 px-5 py-10 mt-10 bg-white shadow-md sm:p-10 rounded-xl">
      <div className={mergeNames(STYLES.flexBetween)}>
        <h1 className="text-sm font-bold uppercase md:text-lg">
          Зээлийн тооцоолуур
        </h1>
        <button
          onClick={() => setExpand(!expand)}
          className="absolute bottom-0 left-0 w-full"
        >
          <MdExpandMore
            className={mergeNames(
              expand ? "rotate-180" : "rotate-0",
              "text-[40px] text-mainBlossom transition-all ease-in-out mx-auto"
            )}
          />
        </button>
        {/* <Flex gap={4}>
          <Heading
            variant={'smallHeading'}
            className="text-blue-700 underline cursor-pointer"
          >
            Задаргаа
          </Heading>
        </Flex> */}
      </div>
      <Divider />
      <div
        className={mergeNames(
          "grid-cols-1 gap-3 lg:grid-cols-2 overflow-hidden lg:gap-10 transition-all duration-500 ease-in-out",
          expand ? "grid h-auto" : "grid h-0 "
        )}
      >
        <div>
          <CalcInput
            heading="Орон сууцны үнэ"
            placeholder={price ?? "0.00₮"}
            onChange={handlePriceChange}
            value={price}
            className=""
            unit="₮"
          />

          <CalcInput
            heading="Зээлийн хэмжээ"
            placeholder="0.00₮"
            onChange={handlePrincipalchange}
            value={principal}
            className="my-5"
            unit="₮"
          />

          <CalcInput
            heading="Зээлийн хүү(жилээр)"
            placeholder="0 жил"
            onChange={handleInterestchange}
            value={interest}
            unit="%"
          />
        </div>
        <div>
          <CalcInput
            heading="Урьдчилгаа төлбөр"
            placeholder="0.00₮"
            onChange={handlePayChange}
            value={pay}
            unit="₮"
          />
          <CalcInput
            heading="Зээлийн хугацаа"
            placeholder="0 сар"
            onChange={handleTimechange}
            value={time}
            className="my-5"
            unit="Сар"
          />

          <div
            className={`${STYLES.flexBetween} flex-col items-baseline xs:items-center xs:flex-row my-5`}
          >
            <Heading variant={"smallHeading"}>Зээлийн сарын төлбөр</Heading>
            <Heading variant={"mediumHeading"} color="mainBlossom">
              {emi}₮{/* {totalinterest}₮ */}
            </Heading>
          </div>
          <div
            className={`${STYLES.flexBetween} flex-col gap-3 items-baseline xs:items-center xs:flex-row mt-6`}
          >
            <Button
              onClick={calculateLoan}
              className="text-white bg-blue-600 hover:bg-blue-800"
            >
              Тооцоолох
            </Button>
            <Heading variant={"smallHeading"}>Нийт төлөгдөх хэмжээ</Heading>
            <Heading variant={"mediumHeading"} color="mainBlossom">
              {amount}₮
            </Heading>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ECalculator;
