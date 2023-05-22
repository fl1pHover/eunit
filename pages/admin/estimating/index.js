import urls from "@/constants/api";
import MainContainer from "@/layout/mainContainer";
import { ContainerX } from "@/lib/Container";
import mergeNames from "@/util/mergeNames";
import { Radio, RadioGroup, useToast } from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Button } from "flowbite-react";

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
        <div className="flex bg-white p-5 my-10 rounded-[20px] sm:text-[14px] md:text-[16px] text-[12px]">
          <div className="flex overflow-scroll">
            <div className={mergeNames(colSize)}>
              <h1 className="p-2">Дугаар</h1>
              {estimates.length > 0 &&
                estimates[0].items.map((est, i) => {
                  console.log(est);
                  return (
                    <Fragment key={i}>
                      <h1
                        className={mergeNames(
                          i % 2 == 0 ? "bg-gray-200" : "",
                          "p-2 truncate"
                        )}
                      >
                        {est.name}
                      </h1>
                    </Fragment>
                  );
                })}
            </div>
            {estimates.length > 0 &&
              estimates.map((est, i) => {
                return (
                  <div key={i} className={mergeNames(colSize, "text-center")}>
                    <h1 className="p-2">{i + 1}</h1>
                    {est?.items?.map((item, i) => {
                      return (
                        <>
                          <h2
                            key={i}
                            className={mergeNames(
                              i % 2 == 0 ? "bg-gray-200" : "",
                              "p-2 truncate"
                            )}
                          >
                            &nbsp;{item.value}
                          </h2>
                        </>
                      );
                    })}

                    {/* <p>{JSON.stringify(est)}</p> */}
                    <Button
                      onClick={() => updateEstimate("estimated", est._id)}
                      className="px-5 mx-auto my-4"
                    >
                      TEST
                    </Button>
                  </div>
                );
              })}

            <div className="flex flex-col"></div>
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

export default Estimating;

const colSize = "flex flex-col min-w-[250px]   border-r border-gray-400";
