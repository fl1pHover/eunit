import {
  Button,
  Divider,
  Flex,
  Heading,
  NumberInput,
  NumberInputField,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { STYLES } from '../styles';

const EstInput = (onChange, value) => {
  return (
    <Textarea
      width="150px"
      boxShadow={'inner'}
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
        <Heading variant={'smallHeading'}>{heading}</Heading>
        <Flex className="items-center gap-3">
          <NumberInput
            precision={2}
            // precision={pre}
          >
            <NumberInputField
              placeholder={placeholder}
              width="200px"
              onChange={onChange}
              value={value}
              required
            />
          </NumberInput>
          <div className="w-8 text-right">
            <Heading variant={'smallHeading'}>{unit}</Heading>
          </div>
        </Flex>
      </div>
    </>
  );
};

function ECalculator() {
  const [price, setPrice] = useState();

  // Zeeliin hemjee
  const [principal, setPrincipal] = useState(0);

  // Niit tulugduh hemjeee
  const [amount, setAmount] = useState(0);

  // Huu
  const [interest, setInterest] = useState(0);

  // Zeeliiin hugatsaa
  const [time, setTime] = useState(0);

  // Uridchilgaa
  const [pay, setPay] = useState(9);

  const [emi, setEmi] = useState(0);
  // const [totalinterest, setTotalinterest] = useState(0);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handlePrincipalchange = (event) => {
    setPrincipal(event.target.value);
  };

  const handlePayChange = (event) => {
    setPay(event.target.value);
  };

  const handleInterestchange = (event) => {
    setInterest(event.target.value);
  };
  const handleTimechange = (event) => {
    setTime(event.target.value);
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
        Math.round(calcemi).toLocaleString('en-US', {
          maximumFractionDigits: 2,
        })
      );
      setAmount(
        (calcemi * n).toLocaleString('en-US', {
          maximumFractionDigits: 2,
        })
      );
      // setTotalinterest((calcemi * n - p).toFixed(2));
    } else {
    }
  };

  // const [value, setValue] = React.useState(0);
  // const handleChange = (value) => setValue(value);

  return (
    <div className="flex flex-col gap-3 p-10 mt-10 bg-white shadow-md rounded-10">
      <div className="flex justify-between">
        <Heading variant={'mediumHeading'} textTransform="uppercase">
          Зээлийн тооцоолуур
        </Heading>
        <Heading variant={'smallHeading'}>Тооцоог дэлгэрэнгүй харах</Heading>
      </div>
      <Divider />
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-10">
        <div>
          <CalcInput
            heading="Орон сууцны үнэ"
            placeholder="0.00₮"
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
            <Heading variant={'smallHeading'}>Зээлийн сарын төлбөр</Heading>
            <Heading variant={'mediumHeading'} color="mainBlossom">
              {emi}₮{/* {totalinterest}₮ */}
            </Heading>
          </div>
          <div
            className={`${STYLES.flexBetween} flex-col gap-3 items-baseline xs:items-center xs:flex-row mt-6`}
          >
            <Button onClick={calculateLoan}>Тооцоолох</Button>
            <Heading variant={'smallHeading'}>Нийт төлөгдөх хэмжээ</Heading>
            <Heading variant={'mediumHeading'} color="mainBlossom">
              {amount}₮
            </Heading>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ECalculator;
