import {
     Button,
     Divider,
     Flex,
     Grid,
     GridItem,
     Heading,
     NumberInput,
     NumberInputField,
     Stack,
     Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";

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

     // const [emi, setEmi] = useState(0);
     const [totalinterest, setTotalinterest] = useState(0);

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
                    (Math.pow(1 + actualRate, n) /
                         (Math.pow(1 + actualRate, n) - 1));

               setPrincipal(price - pay);
               // setEmi(Math.round(calcemi).toFixed(2));
               setAmount((calcemi * n).toFixed(2));
               setTotalinterest((calcemi * n - p).toFixed(2));
          } else {
          }
     };

     // const [value, setValue] = React.useState(0);
     // const handleChange = (value) => setValue(value);

     return (
          <Stack
               bgColor={"white"}
               p={10}
               direction={"column"}
               mt={10}
               gap={3}
               boxShadow="base"
               rounded={10}
          >
               <Flex justifyContent={"space-between"}>
                    <Heading
                         variant={"mediumHeading"}
                         textTransform="uppercase"
                    >
                         Зээлийн тооцоолуур
                    </Heading>
                    <Heading variant={"smallHeading"}>
                         Тооцоог дэлгэрэнгүй харах
                    </Heading>
               </Flex>
               <Divider />
               <Grid
                    templateColumns={{
                         base: "repeat(1,1fr)",
                         lg: "repeat(2,1fr)",
                    }}
                    gap={{ base: 3, lg: 10 }}
               >
                    <GridItem>
                         <Flex
                              justifyContent={"space-between"}
                              alignItems="center"
                         >
                              <Heading variant={"smallHeading"}>
                                   Орон сууцны үнэ
                              </Heading>
                              <NumberInput precision={2}>
                                   <NumberInputField
                                        width="150px"
                                        onChange={handlePriceChange}
                                        value={price}
                                        required
                                   />{" "}
                              </NumberInput>
                         </Flex>
                         <Flex
                              justifyContent={"space-between"}
                              alignItems="center"
                              my={"10px"}
                         >
                              <Heading variant={"smallHeading"}>
                                   Зээлийн хэмжээ
                              </Heading>
                              <NumberInput precision={2}>
                                   <NumberInputField
                                        width="150px"
                                        onChange={handlePrincipalchange}
                                        value={principal}
                                        // onChange={handleInterestChange}
                                        // value={interest}
                                        required
                                   />
                              </NumberInput>
                         </Flex>
                         <Flex
                              justifyContent={"space-between"}
                              alignItems="center"
                         >
                              <Heading variant={"smallHeading"}>
                                   Зээлийн хүү(жилээр)
                              </Heading>
                              <NumberInput>
                                   <NumberInputField
                                        width="150px"
                                        onChange={handleInterestchange}
                                        value={interest}
                                   />
                              </NumberInput>
                         </Flex>
                    </GridItem>
                    <GridItem>
                         <Flex
                              justifyContent={"space-between"}
                              alignItems="center"
                         >
                              <Heading variant={"smallHeading"}>
                                   Урьдчилгаа төлбөр
                              </Heading>
                              <NumberInput precision={2}>
                                   <NumberInputField
                                        width="150px"
                                        onChange={handlePayChange}
                                        value={pay}
                                   />
                              </NumberInput>
                         </Flex>
                         <Flex
                              justifyContent={"space-between"}
                              alignItems="center"
                              my={"10px"}
                         >
                              <Heading variant={"smallHeading"}>
                                   Зээлийн хугацаа
                              </Heading>
                              <NumberInput>
                                   <NumberInputField
                                        width="150px"
                                        onChange={handleTimechange}
                                        value={time}
                                   />
                              </NumberInput>
                         </Flex>
                         <Flex
                              justifyContent={"space-between"}
                              alignItems="center"
                              my={"10px"}
                         >
                              <Heading variant={"smallHeading"}>
                                   Зээлийн сарын төлбөр
                              </Heading>
                              <Heading
                                   variant={"mediumHeading"}
                                   color="mainBlossom"
                              >
                                   {totalinterest}₮
                              </Heading>
                         </Flex>
                         <Flex
                              justifyContent={"space-between"}
                              alignItems="center"
                              mt={"30px"}
                         >
                              <Button onClick={calculateLoan}>Тооцоолох</Button>
                              <Heading variant={"smallHeading"}>
                                   Нийт төлөгдөх хэмжээ
                              </Heading>
                              <Heading
                                   variant={"mediumHeading"}
                                   color="mainBlossom"
                              >
                                   {amount}₮
                              </Heading>
                         </Flex>
                    </GridItem>
               </Grid>
          </Stack>
     );
}

export default ECalculator;
