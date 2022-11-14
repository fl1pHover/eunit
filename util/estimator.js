// import {
//      Button,
//      Divider,
//      Flex,
//      Grid,
//      GridItem,
//      Heading,
//      NumberInput,
//      NumberInputField,
//      Stack,
// } from "@chakra-ui/react";
// import React, { useState } from "react";

// const EstInput = (onChange, value) => {
//      return (
//           <NumberInput
//                width="150px"
//                boxShadow={"inner"}
//                onChange={onChange}
//                defaultValue={value}
//           >
//                <NumberInputField />
//           </NumberInput>
//      );
// };

// // function PMT(p, it, ir, pp, t) {
// //      var presentValueInterstFector = Math.pow(1 + ir, pp);
// //      var pmt = ir * it * (presentValueInterstFector + )
// // }
// const PMT = (rate, nper, pv, fv, type) => {
//      /*
//       * rate   - interest rate per month
//       * nper   - number of periods (months)
//       * pv   - present value
//       * fv   - future value
//       * type - when the payments are due:
//       *        0: end of the period, e.g. end of month (default)
//       *        1: beginning of period
//       */
//      let pmt, pvif;

//      fv || (fv = 0);
//      type || (type = 0);
//      if (rate === 0) return -(pv + fv) / nper;

//      pvif = Math.pow(1 + rate, nper);
//      pmt = (-rate * (pv * pvif + fv)) / (pvif - 1);

//      if (type === 1) pmt /= 1 + rate;
//      return pmt;
// };

// function Estimator() {
//      const [price, setPrice] = useState(0);
//      const [interest, setInterest] = useState(0);
//      const [rate, setRate] = useState(0);
//      const [prepayment, setPrepayment] = useState(0);
//      const [time, setTime] = useState(0);
//      const [form, setForm] = useState({
//           price: 0,
//           interest: 0,
//           rate: 0,
//           prepayment: 0,
//           time: 0,
//      });

//      // const handlePriceChange = (event) => {
//      //      setPrice(event.target.value);
//      // };
//      // const handleInterestChange = (event) => {
//      //      setInterest(event.target.value);
//      // };
//      // const handleRateChange = (event) => {
//      //      setInterest(event.target.value);
//      // };
//      // const handlePrepaymentChange = (event) => {
//      //      setInterest(event.target.value);
//      // };
//      // const handleTimeChange = (event) => {
//      //      setInterest(event.target.value);
//      // };

//      // const [value, setValue] = React.useState(0);
//      // const handleChange = (value) => setValue(value);

//      return (
//           <Stack
//                bgColor={"white"}
//                p={10}
//                direction={"column"}
//                mt={10}
//                gap={3}
//                boxShadow="base"
//                rounded={10}
//           >
//                <Flex justifyContent={"space-between"}>
//                     <Heading
//                          variant={"mediumHeading"}
//                          textTransform="uppercase"
//                     >
//                          Зээлийн тооцоолуур
//                     </Heading>
//                     <Heading variant={"smallHeading"}>
//                          Тооцоог дэлгэрэнгүй харах
//                     </Heading>
//                </Flex>
//                <Divider />
//                <Grid
//                     templateColumns={{
//                          base: "repeat(1,1fr)",
//                          lg: "repeat(2,1fr)",
//                     }}
//                     gap={{ base: 3, lg: 10 }}
//                >
//                     <GridItem>
//                          <Flex
//                               justifyContent={"space-between"}
//                               alignItems="center"
//                          >
//                               <Heading variant={"smallHeading"}>
//                                    Орон сууцны үнэ
//                               </Heading>
//                               <EstInput
//                                    type={"number"}
//                                    onChange={
//                                         ((e) =>
//                                              setForm((form) => ({
//                                                   ...form,
//                                                   type: e.target.value,
//                                              })),
//                                         PMT(
//                                              form.rate,
//                                              form.time,
//                                              form.price,
//                                              0,
//                                              0
//                                         ))
//                                    }
//                                    value={form.price}
//                                    required
//                               />
//                          </Flex>
//                          <Flex
//                               justifyContent={"space-between"}
//                               alignItems="center"
//                               my={"10px"}
//                          >
//                               <Heading variant={"smallHeading"}>
//                                    Зээлийн хэмжээ
//                               </Heading>
//                               <EstInput
//                                    onChange={
//                                         ((e) =>
//                                              setForm((form) => ({
//                                                   ...form,
//                                                   type: e.target.value,
//                                              })),
//                                         PMT(form.rate, form))
//                                    }
//                                    value={form.interest}
//                                    required
//                               />
//                          </Flex>
//                          <Flex
//                               justifyContent={"space-between"}
//                               alignItems="center"
//                          >
//                               <Heading variant={"smallHeading"}>
//                                    Зээлийн хүү(жилээр)
//                               </Heading>
//                               <EstInput
//                                    type={"number"}
//                                    onChange={
//                                         ((e) =>
//                                              setForm((form) => ({
//                                                   ...form,
//                                                   type: e.target.value,
//                                              })),
//                                         PMT(
//                                              form.rate,
//                                              form.time,
//                                              form.price,
//                                              0,
//                                              0
//                                         ))
//                                    }
//                                    value={form.rate}
//                               />
//                          </Flex>
//                     </GridItem>
//                     <GridItem>
//                          <Flex
//                               justifyContent={"space-between"}
//                               alignItems="center"
//                          >
//                               <Heading variant={"smallHeading"}>
//                                    Урьдчилгаа төлбөр
//                               </Heading>
//                               <EstInput
//                                    type={"number"}
//                                    onChange={
//                                         ((e) =>
//                                              setForm((form) => ({
//                                                   ...form,
//                                                   type: e.target.value,
//                                              })),
//                                         PMT(
//                                              form.rate,
//                                              form.time,
//                                              form.price,
//                                              0,
//                                              0
//                                         ))
//                                    }
//                                    value={form.price}
//                               />
//                          </Flex>
//                          <Flex
//                               justifyContent={"space-between"}
//                               alignItems="center"
//                               my={"10px"}
//                          >
//                               <Heading variant={"smallHeading"}>
//                                    Зээлийн хугацаа
//                               </Heading>
//                               <EstInput
//                                    type={"number"}
//                                    onChange={
//                                         ((e) =>
//                                              setForm((form) => ({
//                                                   ...form,
//                                                   type: e.target.value,
//                                              })),
//                                         PMT(
//                                              form.rate,
//                                              form.time,
//                                              form.price,
//                                              0,
//                                              0
//                                         ))
//                                    }
//                                    value={form.price}
//                               />
//                          </Flex>
//                          <Flex
//                               justifyContent={"space-between"}
//                               alignItems="center"
//                               my={"10px"}
//                          >
//                               <Heading variant={"smallHeading"}>
//                                    Зээлийн сарын төлбөр
//                               </Heading>
//                               <EstInput type={"number"} />
//                          </Flex>
//                          <Flex
//                               justifyContent={"space-between"}
//                               alignItems="center"
//                               mt={"30px"}
//                          >
//                               <Button>bodoh</Button>
//                               <Heading variant={"smallHeading"}>
//                                    Нийт төлөгдөх хэмжээ
//                               </Heading>
//                               <Heading
//                                    variant={"mediumHeading"}
//                                    color="mainBlossom"
//                               >
//                                    $500,000
//                               </Heading>
//                          </Flex>
//                     </GridItem>
//                </Grid>
//                {/* <Center>
//                     <Stack direction={"row"}>
//                          <Box>
//                               <Heading
//                                    variant={"mediumHeading"}
//                                    color="mainBlossom"
//                               >
//                                    $500,000
//                               </Heading>
//                               <Heading variant={"smallHeading"}>
//                                    Нийт төлөгдөх хэмжээ
//                               </Heading>
//                          </Box>
//                     </Stack>
//                </Center> */}
//           </Stack>
//      );
// }

// export default Estimator;
