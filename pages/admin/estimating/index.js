import urls from "@/constants/api";
import MainContainer from "@/layout/mainContainer";
import { ContainerX } from "@/lib/Container";
import { Radio, RadioGroup, useToast } from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";

import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Estimating = () => {
  const token = getCookie("token");
  const [estimates, setEstimates] = useState([]);
  //   types
  //   export enum EstimateStatus {
  //     pending = 'pending',
  //     estimated = 'estimated',
  //     deleted = 'deleted',
  //     returned = 'returned',
  //   }
  const toast = useToast();
  const updateEstimate = async (status, id) => {
    await axios
      .get(`${urls["test"]}/estimate/update/${status}/${id}`)
      .then((d) => {
        console.log(d.data);
        toast({
          title: "Амжилттай  солилоо.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      });
  };
  const getEstimate = async (check) => {
    await axios
      .get(`${urls["test"]}/estimate/${check}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((d) => setEstimates(d.data));
  };
  useEffect(() => {
    if (token) getEstimate("pending");
  }, [token]);
  return (
    <div className="">
      <MainContainer>
        <div className="flex bg-white my-10 rounded-[20px] sm:text-[14px] md:text-[16px] text-[12px]">
          <div className="flex flex-col">Үнэлгээ</div>
        </div>
        <RadioGroup className="flex flex-col justify-end" defaultValue="2">
          <Radio
            colorScheme="green"
            className="font-bold text-green-400 whitespace-nowrap"
            onChange={(e) => {
              if (e.target.checked) {
                getEstimate("estimated", 0);

                // setNum(0);
              }
            }}
            value="1"
          >
            Үнэлсэн үнэлгээ
          </Radio>
          <Radio
            colorScheme="yellow"
            className="font-bold text-yellow-400 whitespace-nowrap"
            onChange={(e) => {
              if (e.target.checked) {
                getEstimate("pending", 0);
                // setNum(0);
                // setCheck("checking");
              }
            }}
            value="2"
          >
            Хүлээгдэж буй үнэлгээ
          </Radio>
        </RadioGroup>
        {estimates.length > 0 &&
          estimates.map((est, i) => {
            return (
              <Fragment>
                <p>{JSON.stringify(est)}</p>
                <button onClick={() => updateEstimate("estimated", est._id)}>
                  test
                </button>
              </Fragment>
            );
          })}
      </MainContainer>
    </div>
  );
};

export default Estimating;
